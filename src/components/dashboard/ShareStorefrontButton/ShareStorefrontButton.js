import React, { useEffect } from 'react';
import { Button, useClipboard, useToast } from '@chakra-ui/react';
import Toast from '../Toast/Toast';

const ShareStorefrontButton = () => {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(`${window.location.origin}/store`);

  useEffect(() => {
    if (hasCopied) {
      toast({
        position: 'top-right',
        render: props => <Toast {...props} description="Link copied to clipboard!" isClosable />,
      });
    }
  }, [toast, hasCopied]);

  return (
    <Button color="black" w="100%" onClick={onCopy}>
      Share Storefront
    </Button>
  );
};

export default ShareStorefrontButton;
