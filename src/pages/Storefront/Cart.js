import React from 'react';
import { useShopify } from 'hooks/useShopify';
import { CartItem } from 'components/storefront';
import { Box, HStack, VStack, Heading, Divider, Flex, FormControl, Text, Button, Input, Link } from '@chakra-ui/react';
import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

// import { useSelector, shallowEqual } from 'react-redux';
// import { selectors as teamSelectors } from '../../data/reducers/team';

const CartItems = ({ productsData, cartCount }) => {
  const applyCoupon = () => {
    alert('To be implemented');
  };

  return (
    <VStack flex={1} alignItems="flex-start" spacing={8} py={16} pr={12}>
      {/* Add spacing to this VStack */}
      <Flex w="100%" justifyContent="space-between">
        <Heading as="h4" size="subtitle">
          <Link as={PreserveQueryParamsLink} to={`/store`}>
            CONTINUE SHOPPING
          </Link>
        </Heading>
        <Heading as="h4" color="brand.gray" size="subtitle" textTransform="uppercase">
          {/* TO DO: update this to be the length of the line items in cart */}
          {`${cartCount} ITEMS`}
        </Heading>
      </Flex>

      {/* TO DO: The products here should be the line-items in the Shopify Checkout, also need to add unique key */}
      <VStack w="100%" spacing={8}>
        <Divider borderColor="brand.gray" />
        {productsData &&
          productsData.map(product => (
            <Box w="100%">
              <CartItem key={product.id} product={product} />
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

const OrderSummary = ({ checkoutData }) => {
  // Temporary checkout code from last term, will need to udpate
  const openCheckout = () => {
    if (checkoutData.webUrl) {
      console.log('webUrl exists');
    }
    // window.open(checkoutState.webUrl) // opens checkout in a new window
    window.location.replace(checkoutData.webUrl); // opens checkout in same window
  };

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
            <Text fontWeight="semibold">$1545</Text>
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <Text>SHIPPING ESTIMATE</Text>
            <Text fontWeight="semibold">$5</Text>
          </Flex>
          <Flex w="100%" justifyContent="space-between">
            <Text>TAXES ESTIMATE</Text>
            <Text fontWeight="semibold">$200</Text>
          </Flex>
        </VStack>
        <Divider borderColor="brand.gray" />
        <Flex w="100%" justifyContent="space-between">
          <Heading as="h4" size="subtitle">
            ESTIMATED TOTAL
          </Heading>
          <Heading as="h4" size="subtitle">
            $1750
          </Heading>
        </Flex>
      </VStack>
      <Button size="md" onClick={openCheckout}>
        PROCEED TO CHECKOUT
      </Button>
    </Flex>
  );
};

// Cart page that shows the user the items in their cart, allows them to change quantity, and proceed to checkout
const Cart = () => {
  const {
    products: { /* loading: productsLoading, */ data: productsData },
    checkout: { /* loading: checkoutLoading, */ data: checkoutData },
    cartCount,
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
      <Box bg="black" px="105px">
        <Heading color="white" py={6}>
          MY SHOPPING BAG
        </Heading>
      </Box>
      <HStack w="100%" h="100%" justifyContent="space-between" alignItems="flex-start" px="105px">
        <CartItems productsData={productsData} cartCount={cartCount} />
        <OrderSummary checkoutData={checkoutData} />
      </HStack>
    </>
  );
};

export default Cart;