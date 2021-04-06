import * as React from 'react';
import { Heading, Flex, Image, useNumberInput, IconButton, VStack, Spacer } from '@chakra-ui/react';
import QuantityPicker from '../ProductDetails/QuantityPicker';
import { CloseIcon } from '@chakra-ui/icons';

const CartItem = ({ product }) => {
  const { images, title, variants } = product;
  const productSku = variants[0].sku;
  const productImage = images[0].src;
  const productPrice = variants[0].price;
  const productQuantity = 1; // Fetch quantity from checkout line items. This should also be a state (to update price & total)

  const quantityPickerProps = useNumberInput({
    step: 1,
    defaultValue: productQuantity,
    min: 1,
    max: 999,
  });

  const removeFromCart = () => {
    alert('To be implemented');
  };

  return (
    <Flex>
      <Flex direction="column">
        <Image boxSize="200" objectFit="cover" border="1px solid black" src={productImage} alt={title} />
      </Flex>
      <VStack alignItems="flex-start" w="250px" pl={6}>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
          {`Item #${productSku}`}
        </Heading>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
          {title}
        </Heading>
        <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
          {`${productQuantity} X $${productPrice}`}
        </Heading>
        {/* Does not show colour + variant at the moment */}
      </VStack>
      <Spacer />
      <QuantityPicker {...quantityPickerProps} />
      <Spacer />
      <IconButton
        size="xs"
        color="brand.gray"
        variant="unstyled"
        aria-label="Remove from cart"
        icon={<CloseIcon />}
        onClick={removeFromCart}
      />
    </Flex>
  );
};

export default CartItem;
