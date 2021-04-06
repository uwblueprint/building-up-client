import React, { useEffect } from 'react';
import { useShopify } from '../../hooks/useShopify';
import { CartItem } from 'components/storefront';
import { Box, HStack, VStack, Heading, Divider, Flex, FormControl, Text, Button, Input } from '@chakra-ui/react';
import { useSelector, shallowEqual } from 'react-redux';
import { selectors as teamSelectors } from '../../data/reducers/team';

// Cart page that shows the user the items in their cart, allows them to change quantity, and proceed to checkout

const Cart = () => {
  const { products, checkoutState, updateCartAttributes } = useShopify();
  const team = useSelector(teamSelectors.selectTeam, shallowEqual);

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

  // Temporary checkout code from last term, will need to udpate
  const openCheckout = () => {
    if (checkoutState.webUrl) {
      console.log('webUrl exists');
    }
    // window.open(checkoutState.webUrl) // opens checkout in a new window
    window.location.replace(checkoutState.webUrl); // opens checkout in same window
  };

  const applyCoupon = () => {
    alert('To be implemented');
  };

  return (
    <>
      <Box bg="black" color="black" px="105px">
        <Heading alignSelf="flex-start" color="white" py={6}>
          MY SHOPPING BAG
        </Heading>
      </Box>
      <HStack w="100%" h="100%" justifyContent="space-between" alignItems="flex-start" px="105px">
        <VStack w="100%" alignItems="flex-start" py="64px" pr="45px">
          <Flex w="100%" justifyContent="space-between">
            <Heading as="h4" size="subtitle" color="brand.black">
              CONTINUE SHOPPING
            </Heading>
            <Heading as="h4" color="brand.gray" size="subtitle" textTransform="uppercase">
              {/* TO DO: update this to be the length of the line items in cart */}
              {`${products.length} ITEMS`}
            </Heading>
          </Flex>
          <Divider borderColor="brand.gray" />
          {/* TO DO: The products here should be the line-items in the Shopify Checkout, also need to add unique key */}
          {products &&
            products.map(product => (
              <Box w="100%" pt="28px">
                <CartItem key={product.id} product={product} />
                <Divider borderColor="brand.gray" pb="36px" />
              </Box>
            ))}
          <HStack py="30px">
            <FormControl w="40%">
              <Input
                type="coupon"
                name="coupon"
                placeholder="123ABCD"
                // onChange={e => handleInputChange(e, i)}
              />
            </FormControl>
            <Button size="sm" onClick={applyCoupon}>
              APPLY COUPON
            </Button>
          </HStack>
        </VStack>
        <VStack alignItems="flex-start" pt="92px">
          <VStack alignItems="flex-start" bg="brand.lightgray" spacing="40px" p="36px" w="409px" mb="24px">
            {/* The current values in Order Summary are just placeholders */}
            <Heading as="h4" size="subtitle" color="brand.black">
              ORDER SUMMARY
            </Heading>
            <VStack w="100%" alignItems="flex-start" spacing="30px">
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
              <Heading as="h4" size="subtitle" color="brand.black">
                ESTIMATED TOTAL
              </Heading>
              <Heading as="h4" size="subtitle" color="brand.black">
                $1750
              </Heading>
            </Flex>
          </VStack>
          <Button size="md" onClick={openCheckout}>
            PROCEED TO CHECKOUT
          </Button>
        </VStack>
      </HStack>
    </>
  );
};

export default Cart;
