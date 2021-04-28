import React from 'react';
import { Box, CloseButton, Heading, Text, VStack } from '@chakra-ui/react';

const RedirectContextContent = ({ subtitle, title, description, onCancel }) => {
  return (
    <Box position="relative" minW="35%" borderRadius="lg" borderWidth="1px" borderColor="white" bg="white" mb={5} p={4}>
      {onCancel && <CloseButton position="absolute" right="8px" onClick={onCancel} />}
      <VStack align="flex-start">
        {subtitle && (
          <Heading as="h4" size="subtitle" opacity="0.5">
            {subtitle}
          </Heading>
        )}
        {title && (
          <Heading as="h3" size="h3">
            {title}
          </Heading>
        )}
        {description && <Text>{description}</Text>}
      </VStack>
    </Box>
  );
};

const InviteContext = ({ data, error, onCancel }) => {
  return error ? (
    <RedirectContextContent
      subtitle="You're invited to:"
      title="Oops!"
      description="The invite link you followed is invalid."
      onCancel={onCancel}
    />
  ) : (
    <RedirectContextContent
      subtitle="You're invited to:"
      title={`Team ${data.getTeam.name}${data.getTeam.organization ? `- ${data.getTeam.organization}` : ''}`}
      description="Sign in or create an account to accept this invitation"
      onCancel={onCancel}
    />
  );
};

const EmailVerificationContext = () => (
  <RedirectContextContent subtitle="Email Verification" description="Please verify your email by logging in." />
);

/**
 * Displays special context at the top of the login/register page if needed,
 * for example if the user followed an invite link
 */

const RedirectContext = ({ fromPath, inviteTeamId, teamInfoData, teamInfoError, onCancel }) => {
  return fromPath ? (
    fromPath.startsWith('/verify') ? (
      <EmailVerificationContext />
    ) : inviteTeamId ? (
      <InviteContext data={teamInfoData} error={teamInfoError} onCancel={onCancel} />
    ) : null
  ) : null;
};

export default RedirectContext;
