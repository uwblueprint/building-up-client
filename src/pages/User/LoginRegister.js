import React, { useState } from 'react';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import LoginInput from '../../components/LoginRegister/LoginInput';
import RegisterInput from '../../components/LoginRegister/RegisterInput';
import logo from '../../images/logo-black.png';

const TabButton = props => {
  return (
    <Button
      variant="unstyled"
      _focus={{
        outline: 'none',
      }}
      _hover={{
        color: 'brand.50',
      }}
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

function LoginRegister() {
  const [loginRegister, setLoginRegister] = useState('LOGIN');

  return (
    <Flex minHeight="100vh" h="100%" w="100vw" justify="center" bg="background.login">
      <Box minW="35%" marginBottom="50px">
        <Flex justify="center" marginTop="36px" marginBottom="36px">
          <Image src={logo} w="350px" />
        </Flex>
        <Box minW="35%" borderRadius="lg" borderWidth="1px" bg="white">
          <Flex direction="row" justify="space-between" margin="20px 100px 24px 100px">
            <Box>
              <TabButton opacity={loginRegister === 'LOGIN' ? '1' : '0.5'} onClick={() => setLoginRegister('LOGIN')}>
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
          <Box margin="0px 48px 40px 48px">{loginRegister === 'LOGIN' ? <LoginInput /> : <RegisterInput />}</Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginRegister;
