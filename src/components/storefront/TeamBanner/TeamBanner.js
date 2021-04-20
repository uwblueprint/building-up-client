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
      px={3}
      justify="center"
      align="center"
      bg={loading || data ? 'brand.lightgray' : 'brand.red'}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <>
          <Text
            color={loading || data ? 'black' : 'white'}
            textTransform="uppercase"
            fontWeight="bold"
            fontFamily="heading"
            fontSize="sm"
            isTruncated
          >
            {data ? `Team ${data.getTeam.name}` : 'Please note that your purchase will not be attributed to a team'}
          </Text>
          {(error || !data) && <InfoOutlineIcon color="white" marginLeft="8px" />}
        </>
      )}
      <NoTeamAssociationModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default TeamBanner;
