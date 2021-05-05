import React, { useEffect, useRef } from 'react';
import {
  Heading,
  Flex,
  Image,
  useNumberInput,
  IconButton,
  VStack,
  Link,
  chakra,
  HStack,
  Stack,
} from '@chakra-ui/react';
import QuantityPicker from '../ProductDetails/QuantityPicker';
import { CloseIcon } from '@chakra-ui/icons';
import { useShopify } from 'hooks/useShopify';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

const CartItem = ({ title, sku, image, price, quantity, lineItemId, checkoutId, discountAllocations }) => {
  const {
    removeLineItem,
    updateQuantity,
    products: { data },
  } = useShopify();
  // Retrieves the slug from "All Items" in products since id in checkout is different than id in "All Items"
  const slug = data.find(product => product.title === title).id;
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
    <HStack justifyContent="space-between" align="flex-start" spacing={[2, 6]}>
      <Flex>
        <Link as={PreserveQueryParamsLink} to={`products/${slug}`} flexShrink={0}>
          <Image
            boxSize={{ base: '75px', sm: '125px', md: '150px', xl: '200px' }}
            objectFit="cover"
            border="1px solid black"
            src={image}
            alt={title}
          />
        </Link>
        <VStack alignItems="flex-start" minW="100px" pl={6}>
          <chakra.h4 textStyle="lightCaption" color="brand.gray">
            {`ITEM #${sku}`}
          </chakra.h4>
          <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
            {title}
          </Heading>
          <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.darkgray">
            {`${quantity} X $${price}`}
          </Heading>
          {discountAllocations.length > 0 && (
            <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.red">
              {`— $${parseFloat(discountAllocations[0].allocatedAmount.amount).toFixed(2)} (${
                discountAllocations[0].discountApplication.code
              })`}
            </Heading>
          )}
        </VStack>
      </Flex>
      <Stack
        justifyContent="space-between"
        align={{ base: 'flex-end', lg: 'flex-start' }}
        direction={{ base: 'column-reverse', lg: 'row' }}
        spacing={[2, 6]}
        h="100%"
      >
        <QuantityPicker size="checkout" {...quantityPickerProps} />
        <IconButton
          size="xs"
          color="brand.gray"
          variant="ghost"
          aria-label="Remove from cart"
          icon={<CloseIcon />}
          onClick={removeFromCart}
        />
      </Stack>
    </HStack>
  );
};

export default CartItem;
