import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

const StorefrontModal = props => {
  const { isOpen, onClose } = props;

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent borderRadius="0">
        <ModalHeader mt="26" ml="26">
          The link that you followed has not led you to the correct team storefront.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody ml="26">
          <Text>
            If you’d like to purchase through the correct team storefront, please ask your point of contact for another
            link to their storefront.
          </Text>
          <Button size="sm" h="43" mt="22" mb="42" borderRadius="md" onClick={onClose}>
            Continue Shopping
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StorefrontModal;
