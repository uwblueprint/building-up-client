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
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent pl="26px" fontFamily="heading">
        <ModalHeader mt="26px" textStyle="h3" fontSize="2xl">
          The link that you followed has not led you to the correct team storefront.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            If you’d like to purchase through the correct team storefront, please ask your point of contact for another
            link to their storefront.
          </Text>
          <Button size="sm" mt={7} mb={10} onClick={onClose}>
            Continue Shopping
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NoTeamAssociationModal;
