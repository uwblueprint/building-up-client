import * as React from 'react';
import { Heading, Flex, Image, Text, Button, Stack, VStack, useNumberInput } from '@chakra-ui/react';
import AdditionalContent from './AdditionalContent';
import QuantityPicker from './QuantityPicker';
import { useShopify } from 'hooks/useShopify';
import { useHistory, useLocation } from 'react-router';

const ProductDetails = ({ product, checkout }) => {
  const { id: checkoutId } = checkout;
  const { images, title, description, variants, availableForSale } = product;
  const { id: variantId, sku: variantSku, price: variantPrice } = variants[0];
  const { addLineItems } = useShopify();
  const history = useHistory();
  const { search } = useLocation();

  const handleAddToShoppingBag = async () => {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: quantityPickerProps.valueAsNumber,
      },
    ];
    // TO DO: Consider adding error handling
    await addLineItems(checkoutId, lineItemsToAdd);
    history.push(`/store/cart${search}`);
  };

  const quantityPickerProps = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 999,
  });

  return (
    <Stack direction={{ base: 'column', sm: 'row' }} spacing={8}>
      <VStack spacing={6} flex={1} h="100%">
        {images.map(({ id, src }) => (
          <Image key={id} boxSize="100%" border="1px solid black" src={src} alt={title} />
        ))}
      </VStack>
      <Flex direction="column" flex={1}>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
          {`Item #${variantSku}`}
        </Heading>
        <Heading as="h3" size="h3" textTransform="uppercase" my={5}>
          {title}
        </Heading>
        <Heading as="h3" size="h3" color="brand.red">
          {`$${variantPrice}`}
        </Heading>
        <Text my={5}>{description}</Text>
        {availableForSale ? (
          <QuantityPicker size="quantity" {...quantityPickerProps} />
        ) : (
          <Heading as="h3" size="h3" textTransform="uppercase">
            Out of Stock
          </Heading>
        )}
        <Button
          textTransform="uppercase"
          mt={5}
          mb={10}
          minW="auto"
          onClick={handleAddToShoppingBag}
          disabled={!availableForSale}
        >
          Add to shopping bag
        </Button>
        <AdditionalContent />
      </Flex>
    </Stack>
  );
};

export default ProductDetails;
