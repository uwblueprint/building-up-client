import React from 'react';
import { useShopify } from 'hooks/useShopify';
import { CartItem } from 'components/storefront';
import {
  Box,
  HStack,
  VStack,
  Heading,
  Divider,
  Flex,
  FormControl,
  Text,
  Button,
  Input,
  Link,
  Skeleton,
} from '@chakra-ui/react';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

const CartItems = ({ checkoutData }) => {
  const { id: checkoutId, lineItems } = checkoutData;
  const cartItemsCount = lineItems.reduce((acc, cur) => acc + cur.quantity, 0);

  // TO DO: May remove coupon & just let Shopify handle
  const applyCoupon = () => {
    alert('To be implemented');
  };

  return (
    <VStack flex={1} alignItems="flex-start" spacing={8} py={16} pr={12}>
      <Flex w="100%" justifyContent="space-between">
        <Heading as="h4" size="subtitle">
          <Link as={PreserveQueryParamsLink} to={`/store`}>
            CONTINUE SHOPPING
          </Link>
        </Heading>
        <Heading as="h4" color="brand.gray" size="subtitle" textTransform="uppercase">
          {`${cartItemsCount} ITEMS`}
        </Heading>
      </Flex>
      <VStack w="100%" spacing={8}>
        <Divider borderColor="brand.gray" />
        {/* TO DO: Handle empty cart state */}
        {lineItems &&
          lineItems.map(({ id, title, quantity, variant: { sku, image, price } }) => (
            <Box w="100%" key={id}>
              <CartItem
                title={title}
                quantity={quantity}
                sku={sku}
                image={image.src}
                price={price}
                lineItemId={id}
                checkoutId={checkoutId}
              />
              <Divider borderColor="brand.gray" pb={8} />
            </Box>
          ))}
      </VStack>
      <Flex justifyContent="space-between">
        <FormControl w="50%">
          <Input
            type="text"
            name="coupon"
            placeholder="COUPON CODE"
            // onChange={e => handleInputChange(e, i)}
          />
        </FormControl>
        <Button size="sm" onClick={applyCoupon}>
          APPLY COUPON
        </Button>
      </Flex>
    </VStack>
  );
};

// TO DO: Update these skeletons & loading state
const CartItemsSkeleton = () => {
  return (
    <>
      <Skeleton h={20} w={20} />
      <Skeleton h={20} w={20} />
      <Skeleton h={20} w={20} />
    </>
  );
};

const OrderSummarySkeleton = () => {
  return (
    <>
      <Skeleton h={20} w={20} />
      <Skeleton h={20} w={20} />
      <Skeleton h={20} w={20} />
    </>
  );
};

const OrderSummary = ({ checkoutData }) => {
  const { totalPrice, subtotalPrice, totalTax, webUrl } = checkoutData;

  return (
    <Flex direction="column" alignItems="flex-start" pt="116px">
      <VStack alignItems="flex-start" bg="brand.lightgray" spacing={10} p={8} w="409px" mb={6}>
        {/* TO DO: refactor to store titles & prices in array & map through to render */}
        <Heading as="h4" size="subtitle">
          ORDER SUMMARY
        </Heading>
        <VStack w="100%" alignItems="flex-start" spacing={8}>
          <Flex w="100%" justifyContent="space-between">
            <Text>SUBTOTAL</Text>
            <Text fontWeight="semibold">{`$${subtotalPrice}`}</Text>
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <Text>SHIPPING ESTIMATE</Text>
            <Text fontWeight="semibold">$0.00</Text>
            {/* not sure where to get shipping estimate from */}
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <Text>TAXES ESTIMATE</Text>
            <Text fontWeight="semibold">{`$${totalTax}`}</Text>
          </Flex>
        </VStack>
        <Divider borderColor="brand.gray" />
        <Flex w="100%" justifyContent="space-between">
          <Heading as="h4" size="subtitle">
            ESTIMATED TOTAL
          </Heading>
          <Heading as="h4" size="subtitle">
            {`$${totalPrice}`}
          </Heading>
        </Flex>
      </VStack>
      <Link href={webUrl}>
        <Button size="md">PROCEED TO CHECKOUT</Button>
      </Link>
    </Flex>
  );
};

// Cart page that shows the user the items in their cart, allows them to change quantity, and proceed to checkout
const Cart = () => {
  const {
    checkout: { loading, data },
  } = useShopify();

  return (
    <>
      <HStack w="100%" h="100%" justifyContent="space-between" alignItems="flex-start" px="105px">
        {loading ? (
          <>
            <CartItemsSkeleton />
            <OrderSummarySkeleton />
          </>
        ) : (
          <>
            <CartItems checkoutData={data} />
            <OrderSummary checkoutData={data} />
          </>
        )}
      </HStack>
    </>
  );
};

export default Cart;
