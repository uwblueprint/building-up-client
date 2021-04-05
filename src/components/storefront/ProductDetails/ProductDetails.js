import * as React from 'react';
import { Heading, Flex, Image, Text, Button, useNumberInput } from '@chakra-ui/react';
import AdditionalContent from './AdditionalContent';
import QuantityPicker from './QuantityPicker';

const ProductDetails = ({ product }) => {
  const { images, title, description, variants } = product;
  const productSku = variants[0].sku;
  const productPrice = variants[0].price;

  const handleAddToShoppingBag = () => {
    alert('To be implemented');
  };

  const quantityPickerProps = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 999,
  });

  return (
    <Flex py={20} px={32}>
      <Flex direction="column" w="100%" h="100%">
        {images.map(({ id, src }) => (
          <Image key={id} boxSize="100%" border="1px solid black" src={src} alt={title} mb={6} />
        ))}
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
        <Text my={5}>{description}</Text>
        <QuantityPicker {...quantityPickerProps} />
        <Button textTransform="uppercase" mt={5} mb={10} onClick={handleAddToShoppingBag}>
          {'Add to shopping bag'}
        </Button>
        <AdditionalContent />
      </Flex>
    </Flex>
  );
};

export default ProductDetails;
