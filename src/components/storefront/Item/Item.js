import * as React from 'react';
import { VStack, Heading, Image } from '@chakra-ui/react';

const Item = ({ name, image, price }) => (
  <VStack>
    <Image border="1px solid black" w={80} h={80} src={image} alt={name} />
    <Heading as="h4" size="subtitle" textTransform="uppercase">
      {name}
    </Heading>
    <Heading as="h4" size="subtitle">
      {`$${price}`}
    </Heading>
  </VStack>
);

export default Item;
