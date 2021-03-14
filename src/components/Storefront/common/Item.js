import { Image } from '@chakra-ui/image';
import { VStack, Center, Heading } from '@chakra-ui/layout';
import { NoMeetingRoom } from '@material-ui/icons';
import * as React from 'react';

const Item = ({ name, image, price }) => (
  <VStack>
    <Image border="1px solid black" w={80} h={80} src={image} alt={name} />
    <Heading as="h4" size="subtitle">
      {name.toUpperCase()}
    </Heading>
    <Heading as="h4" size="subtitle">
      {`$${price}`}
    </Heading>
  </VStack>
);

export default Item;
