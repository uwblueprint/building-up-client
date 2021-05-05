import React, { useState } from 'react';
import { useShopify } from 'hooks/useShopify';
import { CartItem } from 'components/storefront';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';
import { PageContainer } from 'components/storefront/PageContainer/PageContainer';
import CartSkeleton from 'components/storefront/Cart/Layout/CartSkeleton';
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
  Tag,
  TagLabel,
  TagLeftIcon,
  TagCloseButton,
  chakra,
} from '@chakra-ui/react';
import { ImPriceTags } from 'react-icons/im';

const calculateDiscount = (discountApplications, lineItems) => {
  let discountVal = 0;
  let shippingCost = 'TBD';
  let discountType = '';
  if (discountApplications.length > 0) {
    const appliedDiscount = discountApplications[0];
    discountType = appliedDiscount.targetType;
    if (discountType === 'SHIPPING_LINE') {
      shippingCost = 'FREE';
    } else if (discountType === 'LINE_ITEM') {
      discountVal = lineItems
        .reduce((acc, lineItem) => {
          return lineItem.discountAllocations
            ? acc +
                lineItem.discountAllocations.reduce((acc2, discAlloc) => {
                  return acc2 + parseFloat(discAlloc.allocatedAmount.amount);
                }, 0)
            : acc;
        }, 0)
        .toFixed(2);
    }
  }
  return { discountVal, shippingCost, discountType };
};

const DiscountMsg = ({ discountApplications, discountSuccess, removeCoupon }) => {
  const msg =
    discountSuccess === 'SUCCESS' ? (
      <chakra.h4 whiteSpace="nowrap" textStyle="lightCaption">
        Success! Your code <b>{discountApplications[0].code}</b> has been applied.
      </chakra.h4>
    ) : discountSuccess === 'INVALID' ? (
      <chakra.h4 color="brand.red" textStyle="lightCaption">
        Sorry, that coupon code is not applicable.
      </chakra.h4>
    ) : null;

  return (
    <Box pt="5">
      {msg}
      {discountApplications && discountApplications[0] && (
        <Tag size="lg" mt="2">
          <TagLeftIcon boxSize="12px" as={ImPriceTags} />
          <TagLabel>{discountApplications[0].code}</TagLabel>
          <TagCloseButton onClick={removeCoupon} />
        </Tag>
      )}
    </Box>
  );
};

const CartItems = ({ checkoutData }) => {
  const { id: checkoutId, lineItems, discountApplications } = checkoutData;
  const { addDiscount, removeDiscount } = useShopify();
  const cartItemsCount = lineItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const [discountCode, setDiscountCode] = useState('');
  // discountSuccess is enum "INITIAL" | "INVALID" | "SUCCESS"
  const [discountSuccess, setDiscountSuccess] = useState('INITIAL');

  const onChangeCoupon = e => {
    // Assuming that all discounts are strictly uppercase
    setDiscountCode(e.target.value.toUpperCase());
  };

  const applyCoupon = async e => {
    e.preventDefault();
    const res = await addDiscount(checkoutId, discountCode);

    // TO DO: Proper error handling (catch error in reducer?)
    if (res.discountApplications.length > 0) {
      // Handling case where there is an existing coupon + user enters invalid coupon
      if (discountCode !== res.discountApplications[0].code) {
        setDiscountSuccess('INVALID');
      } else {
        setDiscountSuccess('SUCCESS');
      }
    } else {
      setDiscountSuccess('INVALID');
    }
  };

  const removeCoupon = async () => {
    await removeDiscount(checkoutId);
    setDiscountSuccess('INITIAL');
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
          lineItems.map(({ id, title, quantity, variant: { sku, image, price }, discountAllocations }) => (
            <Box w="100%" key={id}>
              <CartItem
                title={title}
                quantity={quantity}
                sku={sku}
                image={image.src}
                price={price}
                lineItemId={id}
                checkoutId={checkoutId}
                discountAllocations={discountAllocations}
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
        <Box>
          <HStack justifyContent="space-between" as="form" onSubmit={applyCoupon}>
            <FormControl w="50%">
              <Input type="text" name="coupon" placeholder="COUPON CODE" onChange={onChangeCoupon} />
            </FormControl>
            <Button size="sm" type="submit" textTransform="uppercase">
              Apply Coupon
            </Button>
          </HStack>
          <DiscountMsg
            discountApplications={discountApplications}
            discountSuccess={discountSuccess}
            removeCoupon={removeCoupon}
          />
        </Box>
      )}
    </VStack>
  );
};

const OrderSummary = ({ checkoutData }) => {
  const {
    totalPrice,
    lineItems,
    lineItemsSubtotalPrice: { amount: subtotalAmount },
    webUrl,
    discountApplications,
  } = checkoutData;
  const parsedSubtotal = parseFloat(subtotalAmount).toFixed(2);
  const { discountVal, shippingCost, discountType } = calculateDiscount(discountApplications, lineItems);

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      pt={{ base: 0, md: '52px' }}
      maxW={{ base: '100%', md: '30%' }}
      minW={{ base: '250px', lg: '350px' }}
      w={{ base: '100%', md: 'auto' }}
    >
      <VStack alignItems="flex-start" bg="brand.lightgray" spacing={[4, 6, 8, 10]} p={8} w="100%" mb={6}>
        <Heading as="h4" size="subtitle" textTransform="uppercase">
          Order Summary
        </Heading>
        <VStack w="100%" alignItems="flex-start" spacing={8}>
          <Flex w="100%" justifyContent="space-between">
            <chakra.h4 textStyle="lightCaption">Subtotal</chakra.h4>
            <chakra.h4 textStyle="lightCaption" fontWeight="semibold">{`$${parsedSubtotal}`}</chakra.h4>
          </Flex>
          {discountType === 'LINE_ITEM' && (
            <Flex w="100%" justifyContent="space-between">
              <chakra.h4 textStyle="lightCaption">Discount Applied</chakra.h4>
              <chakra.h4 textStyle="lightCaption" fontWeight="semibold">
                -${discountVal}
              </chakra.h4>
            </Flex>
          )}
          <Flex w="100%" justifyContent="space-between">
            <chakra.h4 textStyle="lightCaption">Shipping</chakra.h4>
            <chakra.h4 textStyle="lightCaption" fontWeight="semibold">{`${shippingCost}`}</chakra.h4>
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <chakra.h4 textStyle="lightCaption">Taxes</chakra.h4>
            <chakra.h4 textStyle="lightCaption" fontWeight="semibold">
              TBD
            </chakra.h4>
          </Flex>
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
            <CartItems checkoutData={checkoutData} />
            {checkoutData.lineItems.length > 0 && <OrderSummary checkoutData={checkoutData} />}
          </>
        )}
      </Stack>
    </PageContainer>
  );
};

export default Cart;
