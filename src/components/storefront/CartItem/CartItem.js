import * as React from 'react';
import { Heading, Flex, Image, useNumberInput, IconButton, VStack } from '@chakra-ui/react';
import QuantityPicker from '../ProductDetails/QuantityPicker';
import { CloseIcon } from '@chakra-ui/icons';
import { useShopify } from 'hooks/useShopify';

const CartItem = ({ title, sku, image, price, quantity, lineItemId, checkoutId }) => {
  const { removeLineItem } = useShopify();
  const removeFromCart = () => {
    removeLineItem(checkoutId, lineItemId);
  };

  const quantityPickerProps = useNumberInput({
    step: 1,
    defaultValue: quantity,
    min: 1,
    max: 999,
  });

  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Flex direction="column">
          <Image boxSize="200" objectFit="cover" border="1px solid black" src={image} alt={title} />
        </Flex>
        <VStack alignItems="flex-start" w={64} pl={6}>
          <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
            {`Item #${sku}`}
          </Heading>
          <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
            {title}
          </Heading>
          <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
            {`${quantity} X $${price}`}
          </Heading>
          {/* Does not show colour + variant at the moment */}
        </VStack>
      </Flex>
      <QuantityPicker {...quantityPickerProps} />
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
