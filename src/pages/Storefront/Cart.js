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
  chakra,
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
    <VStack flex={1} alignItems="flex-start" spacing={8} pr={12}>
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
      )}
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
  const { totalPrice, subtotalPrice, webUrl } = checkoutData;
  const couponVal = 0; // Temp placeholder for coupon/discount value

  return (
    <Flex direction="column" alignItems="flex-start" pt="52px">
      <VStack alignItems="flex-start" bg="brand.lightgray" spacing={10} p={8} w="409px" mb={6}>
        <Heading as="h4" size="subtitle" textTransform="uppercase">
          order summary
        </Heading>
        <VStack w="100%" alignItems="flex-start" spacing={8}>
          <Flex w="100%" justifyContent="space-between">
            <chakra.h4 textStyle="lightCaption">subtotal</chakra.h4>
            <chakra.h4 textStyle="lightCaption" fontWeight="semibold">{`$${subtotalPrice}`}</chakra.h4>
          </Flex>
          {couponVal && (
            <Flex w="100%" justifyContent="space-between">
              <chakra.h4 textStyle="lightCaption">coupon discount</chakra.h4>
              <chakra.h4 textStyle="lightCaption" fontWeight="semibold">
                -${couponVal}
              </chakra.h4>
              {/* TO DO: Coupon discount to be implemented in next PR */}
            </Flex>
          )}
          <chakra.h4 textStyle="lightCaption" fontStyle="italic">
            shipping & taxes calculated at checkout.
          </chakra.h4>
        </VStack>
        <Divider borderColor="brand.gray" />
        <Flex w="100%" justifyContent="space-between">
          <Heading as="h4" size="subtitle" textTransform="uppercase">
            estimated total
          </Heading>
          <Heading as="h4" size="subtitle">{`$${totalPrice}`}</Heading>
        </Flex>
      </VStack>
      <Link href={webUrl}>
        <Button size="md" textTransform="uppercase">
          proceed to checkout
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
  // const team = useSelector(teamSelectors.selectTeam, shallowEqual);

  /* previous code that might be userful
  useEffect(() => {
    const userID = sessionStorage.getItem('userID');
    updateCartAttributes(checkoutState.id, [
      { key: 'userID', value: userID ? userID.toString() : '1' }, // Temporary, so that page doesn't crash
      // Remove once user info is added to redux
      { key: 'teamID', value: team.id.toString() },
      { key: 'teamName', value: team.name },
    ]);
  }, [checkoutState.id, team.id, team.name]); // eslint-disable-line react-hooks/exhaustive-deps
  */

  return (
    <>
      <HStack w="100%" h="100%" justifyContent="space-between" alignItems="flex-start" px="105px" py={16}>
        {checkoutLoading || productsLoading ? (
          <>
            <CartItemsSkeleton />
            <OrderSummarySkeleton />
          </>
        ) : (
          <>
            <CartItems checkoutData={checkoutData} />
            {checkoutData.lineItems.length > 0 && <OrderSummary checkoutData={checkoutData} />}
          </>
        )}
      </HStack>
    </>
  );
};

export default Cart;
