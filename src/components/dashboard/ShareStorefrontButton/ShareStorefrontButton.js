import React, { useEffect } from 'react';
import { Button, useClipboard, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Toast from '../Toast/Toast';

const ShareStorefrontButton = () => {
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  const { hasCopied, onCopy } = useClipboard(`${window.location.origin}/store?team=${user.teamId}`);
  useEffect(() => {
    if (hasCopied) {
      toast({
        position: 'top',
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
