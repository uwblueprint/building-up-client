/* 
https://chakra-ui.com/docs/feedback/toast
https://github.com/chakra-ui/chakra-ui/blob/main/packages/toast/src/use-toast.tsx
*/
import React from 'react';
import { Alert, AlertTitle, AlertDescription, CloseButton, Flex } from '@chakra-ui/react';

const Toast = props => {
  const { variant, id, isClosable, onClose, description, title } = props;

  return (
    <Alert variant={variant} id={id} borderRadius="md" boxShadow="lg" paddingRight={8} textAlign="left" width="auto">
      <Flex direction="column">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription display="block">{description}</AlertDescription>}
      </Flex>
      {isClosable && <CloseButton onClick={onClose} position="absolute" right={2} />}
    </Alert>
  );
};

export default Toast;
