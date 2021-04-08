import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import StorefrontModal from '../Modal/Modal';

const TeamBanner = props => {
  const { isLoading, isValidTeam, bannerText } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w="100%" h="34" justify="center" bg={isLoading || isValidTeam ? '#E8E8E8' : '#C70E0E'}>
      <Text
        color={isLoading || isValidTeam ? 'black' : '#FAFAFA'}
        textTransform="uppercase"
        alignSelf="center"
        fontWeight="bold"
      >
        {!isLoading && isValidTeam && 'Team '}
        {bannerText}
      </Text>
      {!isLoading && !isValidTeam && (
        <Flex>
          <InfoOutlineIcon onClick={onOpen} cursor="pointer" color="#FAFAFA" marginLeft="8px" alignSelf="center" />
        </Flex>
      )}
      <StorefrontModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default TeamBanner;
