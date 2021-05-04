/* 
https://chakra-ui.com/docs/feedback/toast
https://github.com/chakra-ui/chakra-ui/blob/main/packages/toast/src/use-toast.tsx
*/
import React from 'react';
import { Alert, AlertTitle, AlertDescription, CloseButton, Flex } from '@chakra-ui/react';

const Toast = props => {
  const { variant, id, isClosable, onClose, description, title } = props;

  return (
    <Alert variant={variant} id={id} borderRadius="md" boxShadow="lg" textAlign="left" width="auto">
      <Flex direction="column" flex={1}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription display="block">{description}</AlertDescription>}
      </Flex>
      {isClosable && <CloseButton onClick={onClose} pl={2} alignSelf="flex-end" />}
    </Alert>
  );
};

export default Toast;
