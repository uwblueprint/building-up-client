import * as React from 'react';
import { Heading, Flex, Image, Text, Button } from '@chakra-ui/react';
import AdditionalContent from './AdditionalContent';

const ProductDetails = ({ product }) => {
  const { images, title, description, variants } = product;
  const productSku = variants && variants[0].sku;
  const productImage = images && images[0].src;
  const productPrice = variants && variants[0].price;

  const handleAddToShoppingBag = () => {
    alert('To be implemented');
  };

  return (
    <Flex py={20} px={32}>
      <Flex direction="column" w="100%" h="100%">
        <Image boxSize="100%" border="1px solid black" src={productImage} alt={title} />
      </Flex>
      <Flex direction="column" w="100%" pl={10}>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
          {`Item #${productSku}`}
        </Heading>
        <Heading as="h3" size="h3" textTransform="uppercase" my={5}>
          {title}
        </Heading>
        <Heading as="h3" size="h3" color="brand.red">
          {`$${productPrice}`}
        </Heading>
        <Text my={3}>{description}</Text>
        <Button textTransform="uppercase" mb={10} onClick={handleAddToShoppingBag}>
          {'Add to shopping bag'}
        </Button>
        <AdditionalContent />
      </Flex>
    </Flex>
  );
};

export default ProductDetails;
