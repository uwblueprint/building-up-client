import * as React from 'react';
import { AspectRatio, VStack, Heading, Image, Link } from '@chakra-ui/react';
import { useRouteMatch } from 'react-router-dom';

import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

const Item = ({ id, name, image, price }) => {
  const { path } = useRouteMatch();

  return (
    <VStack textAlign="center">
      <Link w="100%" as={PreserveQueryParamsLink} to={`${path}/products/${id}`} bg="white">
        <AspectRatio maxW="400px" ratio={1}>
          <Image border="1px solid black" w={80} h={80} src={image} alt={name} objectFit="cover" />
        </AspectRatio>
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
