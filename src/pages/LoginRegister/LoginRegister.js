import * as React from 'react';
import { Box, Flex, Button, Image, Spinner, Center, useToast } from '@chakra-ui/react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useInviteLazy } from 'hooks/use-invite';

import LoginInput from 'components/dashboard/LoginRegister/LoginInput';
import RegisterInput from 'components/dashboard/LoginRegister/RegisterInput';
import ResetPassword from 'components/dashboard/LoginRegister/ResetPassword';
import RedirectContext from 'components/dashboard/LoginRegister/RedirectContext';
import Toast from 'components/dashboard/Toast/Toast';
import logo from 'assets/images/logo-black.png';

const TabButton = props => {
  return (
    <Button
      variant="unstyled"
      _focus={{ outline: 'none' }}
      _hover={{ color: 'brand.50' }}
      onClick={props.onClick}
      opacity={props.opacity}
    >
      {props.children}
    </Button>
  );
};

const TabUnderline = () => {
  return <Box bg="brand.50" h="5px" borderRadius="sm" />;
};

const JoinTeamByInviteAfterLogin = ({ user, inviteTeamId, joinTeamMutation }) => {
  const [joinTeam, { data: joinTeamData, error: joinTeamError }] = joinTeamMutation;

  React.useEffect(() => {
    joinTeam({ variables: { id: user.userId, teamId: inviteTeamId } });
  }, [inviteTeamId, joinTeam, user.userId]);

  return joinTeamData || joinTeamError ? (
    <Redirect to={'/'} />
  ) : (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );
};

function LoginRegisterContent({ inviteTeamId, fromPath, teamInfoRes, onCancel }) {
  const [loginRegister, setLoginRegister] = React.useState('LOGIN');

  const { loading: teamInfoLoading, data: teamInfoData, error: teamInfoError, called: teamInfoCalled } = teamInfoRes;

  return (
    <Flex minHeight="100vh" h="100%" w="100vw" justify="center" bg="background.primary">
      <Flex direction="column" minW="35%" marginBottom="50px">
        <Flex justify="center" marginTop="36px" marginBottom="36px">
          <Image src={logo} w="350px" />
        </Flex>
        {(inviteTeamId && !teamInfoCalled) || teamInfoLoading ? (
          <Center h="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <RedirectContext
              fromPath={fromPath}
              inviteTeamId={inviteTeamId}
              teamInfoData={teamInfoData}
              teamInfoError={teamInfoError}
              onCancel={onCancel}
            />
            {loginRegister === 'RESET' ? (
              <Box minW="35%" borderRadius="lg" borderWidth="1px" borderColor="white" bg="white">
                <ResetPassword setLoginRegister={setLoginRegister} />
              </Box>
            ) : (
              <Box minW="35%" borderRadius="lg" borderWidth="1px" borderColor="white" bg="white">
                <Flex direction="row" justify="space-between" margin="20px 100px 24px 100px">
                  <Box>
                    <TabButton
                      opacity={loginRegister === 'LOGIN' ? '1' : '0.5'}
                      onClick={() => setLoginRegister('LOGIN')}
                    >
                      Sign In
                    </TabButton>
                    {loginRegister === 'LOGIN' && <TabUnderline />}
                  </Box>
                  <Box>
                    <TabButton
                      opacity={loginRegister === 'REGISTER' ? '1' : '0.5'}
                      onClick={() => setLoginRegister('REGISTER')}
                    >
                      Join
                    </TabButton>
                    {loginRegister === 'REGISTER' && <TabUnderline />}
                  </Box>
                </Flex>
                <Box margin="0px 48px 40px 48px">
                  {loginRegister === 'LOGIN' ? <LoginInput setLoginRegister={setLoginRegister} /> : <RegisterInput />}
                </Box>
              </Box>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
}

/**
 * After successfully signing in, redirects to the path the user was previously on
 *
 * Displays to the user if they followed an invite link /verify email link
 * If the user followed an invite link, they will get join the team after
 * signing in or signing up, even if their account isn't verified yet
 */
const LoginRegister = () => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();

  const fromPath = location.state?.from?.pathname;

  // Check if the user came from an invite link
  const inviteTeamId = React.useMemo(
    () => (fromPath && fromPath.startsWith('/invite') ? fromPath.split('/')[2] : undefined),
    [fromPath],
  );

  // useInvite hook
  const { joinTeamMutation, getTeamInfoQuery } = useInviteLazy();
  const [getTeamInfo, teamInfoRes] = getTeamInfoQuery;
  const [, { data: joinTeamData, error: joinTeamError }] = joinTeamMutation;

  // Fetch the team info from the invite code
  React.useEffect(() => {
    if (inviteTeamId) {
      getTeamInfo({ variables: { id: inviteTeamId } });
    }
  }, [inviteTeamId, getTeamInfo]);

  // Toast result of trying to join the team
  React.useEffect(() => {
    if (joinTeamData && teamInfoRes.data) {
      const { name, organization } = teamInfoRes.data.getTeam;

      toast({
        position: 'top',
        render: props => (
          <Toast
            {...props}
            description={`Successfully joined team: ${name}${organization ? ' - ' : ''}${organization}`}
            isClosable
          />
        ),
      });
    }

    if (joinTeamError) {
      toast({ position: 'top', title: 'Error joining team', status: 'error', isClosable: true });
    }
  }, [joinTeamData, joinTeamError, teamInfoRes.data, toast]);

  // If user no longer wants to take the action of the context, reset `location.state.from`
  const onCancelContext = () => history.replace({ ...location, state: { ...location.state, from: null } });

  return user ? (
    inviteTeamId && teamInfoRes.data ? (
      // If the user followed an invite link, automatically join the team first
      <JoinTeamByInviteAfterLogin user={user} inviteTeamId={inviteTeamId} joinTeamMutation={joinTeamMutation} />
    ) : (
      // If we go to this page while the user is already signed in (exists in Redux store), redirect to where the user navigated from
      <Redirect to={location.state?.from?.pathname ?? '/'} />
    )
  ) : (
    // User is not signed in, show the login/register page
    <LoginRegisterContent
      fromPath={fromPath}
      inviteTeamId={inviteTeamId}
      teamInfoRes={teamInfoRes}
      onCancel={onCancelContext}
    />
  );
};

export default LoginRegister;
