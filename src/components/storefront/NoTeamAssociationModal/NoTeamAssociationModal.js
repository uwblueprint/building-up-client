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

const NoTeamAssociationModal = props => {
  const { isOpen, onClose } = props;

  return (
    <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent pl="26px">
        <ModalHeader mt="26px">The link that you followed has not led you to the correct team storefront.</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            If you’d like to purchase through the correct team storefront, please ask your point of contact for another
            link to their storefront.
          </Text>
          <Button size="sm" h="43px" mt="22px" mb="42px" onClick={onClose}>
            Continue Shopping
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NoTeamAssociationModal;
