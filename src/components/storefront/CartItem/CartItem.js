import * as React from 'react';
import { Heading, Flex, Image, Text } from '@chakra-ui/react';

const CartItem = ({ product }) => {
  const { images, title, variants } = product;
  const productSku = variants[0].sku;
  const productImage = images[0].src;
  const productPrice = variants[0].price;

  return (
    <Flex>
      <Flex direction="column" w="100%">
        {/* you probably want to set a max width on the images as well */}
        <Image boxSize="100" border="1px solid black" src={productImage} alt={title} />
      </Flex>
      <Flex direction="column" w="100%">
        {/* you should probably also add a bigger vertical space between these headings */}
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
          {`Item #${productSku}`}
        </Heading>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
          {title}
        </Heading>
        {/* Fetch quantity from state */}
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
          {`Quantity X $${productPrice}`}
        </Heading>
        {/* Add colour + size for each product, might have to use text because lightCaption is defined as h1 rn */}
      </Flex>
    </Flex>
  );
};

export default CartItem;
