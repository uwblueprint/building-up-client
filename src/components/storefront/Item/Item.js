import * as React from 'react';
import { VStack, Heading, Image, Link } from '@chakra-ui/react';
import { useRouteMatch } from 'react-router-dom';

import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

const Item = ({ id, name, image, price }) => {
  const { path } = useRouteMatch();
  console.log('id', id);

  return (
    <VStack>
      <Link as={PreserveQueryParamsLink} to={`${path}/products/${id}`}>
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
