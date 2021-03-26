import * as React from 'react';
import { VStack, Heading, Image } from '@chakra-ui/react';
import { useRouteMatch, useHistory } from 'react-router-dom';

const Item = ({ id, name, image, price }) => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const handleClick = () => {
    history.push(`${path}/products/${id}`);
  };

  return (
    <VStack>
      <Image border="1px solid black" w={80} h={80} src={image} alt={name} onClick={handleClick} />
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
