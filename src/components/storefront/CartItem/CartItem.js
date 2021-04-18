import React, { useEffect, useRef } from 'react';

import { Heading, Flex, Image, useNumberInput, IconButton, VStack } from '@chakra-ui/react';
import QuantityPicker from '../ProductDetails/QuantityPicker';
import { CloseIcon } from '@chakra-ui/icons';
import { useShopify } from 'hooks/useShopify';

const CartItem = ({ title, sku, image, price, quantity, lineItemId, checkoutId }) => {
  const { removeLineItem, updateQuantity } = useShopify();
  const removeFromCart = () => {
    removeLineItem(checkoutId, lineItemId);
  };

  const quantityPickerProps = useNumberInput({
    step: 1,
    defaultValue: quantity,
    min: 1,
    max: 999,
  });

  const prevQuantity = useRef(quantity);

  useEffect(() => {
    const { valueAsNumber } = quantityPickerProps;
    if (prevQuantity.current !== valueAsNumber) {
      updateQuantity(lineItemId, valueAsNumber, checkoutId);
      prevQuantity.current = valueAsNumber;
    }
  }, [quantityPickerProps.valueAsNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Flex direction="column">
          <Image boxSize="200" objectFit="cover" border="1px solid black" src={image} alt={title} />
        </Flex>
        <VStack alignItems="flex-start" w={64} pl={6}>
          <Heading size="subtitle" textTransform="uppercase" color="brand.gray">
            {`Item #${sku}`}
          </Heading>
          <Heading size="subtitle" textTransform="uppercase" color="brand.darkgray">
            {title}
          </Heading>
          <Heading size="subtitle" textTransform="uppercase" color="brand.darkgray">
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
