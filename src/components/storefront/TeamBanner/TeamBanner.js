import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import NoTeamAssociationModal from '../Modal/Modal';

const TeamBanner = props => {
  const { loading, error, data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      onClick={!loading && (error || !data) ? onOpen : null}
      cursor={!loading && (error || !data) ? 'pointer' : null}
      w="100%"
      h="34"
      justify="center"
      bg={loading || data ? 'brand.lightgray' : 'brand.red'}
    >
      <Text color={loading || data ? 'black' : 'white'} textTransform="uppercase" alignSelf="center" fontWeight="bold">
        {!loading && data && 'Team ' + data.getTeam.name}
        {!loading && (error || !data) && 'Please note that your purchase will not be attributed to a team'}
        {loading && 'Loading...'}
      </Text>
      {!loading && (error || !data) && (
        <Flex>
          <InfoOutlineIcon color="white" marginLeft="8px" alignSelf="center" />
        </Flex>
      )}
      <NoTeamAssociationModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default TeamBanner;
