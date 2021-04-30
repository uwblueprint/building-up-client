import React, { useState } from 'react';
import { useShopify } from 'hooks/useShopify';
import { CartItem } from 'components/storefront';
import {
  Box,
  Stack,
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
  chakra,
} from '@chakra-ui/react';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';
import { PageContainer } from 'components/storefront/PageContainer/PageContainer';
import CartSkeleton from 'components/storefront/Cart/Layout/CartSkeleton';

const CartItems = ({ checkoutData, discount, setDiscount }) => {
  const { id: checkoutId, lineItems } = checkoutData;
  const { addDiscount } = useShopify();
  const cartItemsCount = lineItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const [discountCode, setDiscountCode] = useState('');

  const onChangeCoupon = e => {
    // Assuming that all discounts are strictly uppercase
    setDiscountCode(e.target.value.toUpperCase());
  };

  const applyCoupon = async () => {
    const discountApplied = await addDiscount(checkoutId, discountCode);
    // probably should say if it is successful or not successful
    // determine if we can stack discounts or not
    // if successful setDiscount()
    console.log(discountApplied);
  };

  return (
    <VStack flex={1} alignItems="flex-start" spacing={8} w="100%">
      <Flex w="100%" justifyContent="space-between">
        <Heading size="subtitle">
          <Link as={PreserveQueryParamsLink} to={`/store`}>
            CONTINUE SHOPPING
          </Link>
        </Heading>
        <Heading color="brand.gray" size="subtitle" textTransform="uppercase">
          {`${cartItemsCount} ITEMS`}
        </Heading>
      </Flex>
      <VStack w="100%" spacing={8}>
        <Divider borderColor="brand.gray" />
        {lineItems.length > 0 ? (
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
          ))
        ) : (
          <VStack spacing={8}>
            <Heading size="h3" color="black" py={0}>
              YOUR BAG IS EMPTY
            </Heading>
            <Text>Looks like your bag is empty! Why not add something?</Text>
            <Link as={PreserveQueryParamsLink} to={`/store`}>
              <Button size="md">CONTINUE SHOPPING</Button>
            </Link>
          </VStack>
        )}
      </VStack>
      {lineItems.length > 0 && (
        <Flex justifyContent="space-between">
          <FormControl w="50%">
            <Input type="text" name="coupon" placeholder="COUPON CODE" onChange={onChangeCoupon} />
          </FormControl>
          <Button size="sm" onClick={applyCoupon} textTransform="uppercase">
            Apply Coupon
          </Button>
        </Flex>
      )}
    </VStack>
  );
};

const OrderSummary = ({ checkoutData, discount }) => {
  const { totalPrice, subtotalPrice, webUrl } = checkoutData;

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      pt={{ base: 0, md: '52px' }}
      maxW={{ base: '100%', md: '30%' }}
      minW="250px"
      w={{ base: '100%', md: 'auto' }}
    >
      <VStack alignItems="flex-start" bg="brand.lightgray" spacing={[4, 6, 8, 10]} p={8} w="100%" mb={6}>
        <Heading as="h4" size="subtitle" textTransform="uppercase">
          Order Summary
        </Heading>
        <VStack w="100%" alignItems="flex-start" spacing={8}>
          <Flex w="100%" justifyContent="space-between">
            <chakra.h4 textStyle="lightCaption">Subtotal</chakra.h4>
            <chakra.h4 textStyle="lightCaption" fontWeight="semibold">{`$${subtotalPrice}`}</chakra.h4>
          </Flex>
          {discount && (
            <Flex w="100%" justifyContent="space-between">
              <chakra.h4 textStyle="lightCaption">Coupon Discount</chakra.h4>
              <chakra.h4 textStyle="lightCaption" fontWeight="semibold">
                -${discount}
                {/* need to fix this up */}
              </chakra.h4>
            </Flex>
          )}
          <chakra.h4 textStyles="lightCaption" fontStyle="italic">
            Shipping & taxes calculated at checkout.
          </chakra.h4>
        </VStack>
        <Divider borderColor="brand.gray" />
        <HStack w="100%" justifyContent="space-between" spacing={4}>
          <Heading as="h4" size="subtitle" textTransform="uppercase">
            Estimated Total
          </Heading>
          <Heading as="h4" size="subtitle">{`$${totalPrice}`}</Heading>
        </HStack>
      </VStack>
      <Link href={webUrl} w="100%">
        <Button size="md" textTransform="uppercase" minW="100%">
          Proceed to Checkout
        </Button>
      </Link>
    </Flex>
  );
};

// Cart page that shows the user the items in their cart, allows them to change quantity, and proceed to checkout
const Cart = () => {
  const {
    checkout: { loading: checkoutLoading, data: checkoutData },
    products: { loading: productsLoading },
  } = useShopify();
  const [discount, setDiscount] = useState(0);

  return (
    <PageContainer>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        w="100%"
        h="100%"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={12}
      >
        {checkoutLoading || productsLoading ? (
          <CartSkeleton />
        ) : (
          <>
            <CartItems checkoutData={checkoutData} setDiscount={setDiscount} />
            {checkoutData.lineItems.length > 0 && <OrderSummary checkoutData={checkoutData} discount={discount} />}
          </>
        )}
      </Stack>
    </PageContainer>
  );
};

export default Cart;
