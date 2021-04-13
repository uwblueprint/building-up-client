import { Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import NoTeamAssociationModal from '../NoTeamAssociationModal/NoTeamAssociationModal';

const TeamBanner = props => {
  const { loading, error, data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      onClick={!loading && (error || !data) ? onOpen : null}
      cursor={!loading && (error || !data) ? 'pointer' : null}
      w="100%"
      h="34px"
      justify="center"
      align="center"
      bg={loading || data ? 'brand.lightgray' : 'brand.red'}
    >
      <Text
        color={loading || data ? 'black' : 'white'}
        textTransform="uppercase"
        fontWeight="bold"
        fontFamily="heading"
        fontSize="sm"
      >
        {loading ? (
          <Spinner size="sm" />
        ) : data ? (
          `Team ${data.getTeam.name}`
        ) : (
          'Please note that your purchase will not be attributed to a team'
        )}
      </Text>
      {!loading && (error || !data) && (
        <Flex>
          <InfoOutlineIcon color="white" marginLeft="8px" />
        </Flex>
      )}
      <NoTeamAssociationModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default TeamBanner;
