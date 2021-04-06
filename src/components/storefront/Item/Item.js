import * as React from 'react';
import { VStack, Heading, Image, Link } from '@chakra-ui/react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

const Item = ({ id, name, image, price }) => {
  const { path } = useRouteMatch();

  return (
    <VStack>
      <Link as={RouterLink} to={`${path}/products/${id}`}>
        <Image border="1px solid black" w={80} h={80} src={image} alt={name} />
      </Link>
      <Heading as="h4" size="subtitle" textTransform="uppercase">
        {name}
      </Heading>
      <Heading as="h4" size="subtitle">
        {`$${price}`}
      </Heading>
    </VStack>
  );
};

export default Item;
