import React, { useEffect } from 'react';
import { Box, HStack, VStack, Heading, Divider, Flex, FormControl, Text, Button, Input } from '@chakra-ui/react';
import { useShopify } from '../../hooks/useShopify';
import { CartItem } from 'components/storefront';

import { useSelector, shallowEqual } from 'react-redux';
import { selectors as teamSelectors } from '../../data/reducers/team';

// Cart page that shows the user the items in their cart, allows them to change quantity, and proceed to checkout

const Cart = () => {
  // you're going to need to update products so that it's only the ones inside their cart
  const { products, checkoutState, updateCartAttributes } = useShopify();
  // checkoutState is currently empty, you're going to need to add to it later on
  const team = useSelector(teamSelectors.selectTeam, shallowEqual);

  //   useEffect(() => {
  //     const userID = sessionStorage.getItem('userID');
  //     updateCartAttributes(checkoutState.id, [
  //       { key: 'userID', value: userID ? userID.toString() : '1' }, // Temporary, so that page doesn't crash
  //       // Remove once user info is added to redux
  //       { key: 'teamID', value: team.id.toString() },
  //       { key: 'teamName', value: team.name },
  //     ]);
  //   }, [checkoutState.id, team.id, team.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const openCheckout = () => {
    if (checkoutState.webUrl) {
      console.log('webUrl exists');
    }
    // window.open(checkoutState.webUrl) // opens checkout in a new window
    window.location.replace(checkoutState.webUrl); // opens checkout in same window
  };

  return (
    <>
      <Box bg="black" w="100%" color="black" px="105px">
        <Heading alignSelf="flex-start" color="white" py={5}>
          MY SHOPPING BAG
        </Heading>
      </Box>
      <HStack w="100%" h="100%" justifyContent="space-between" alignItems="flex-start" px="105px">
        <VStack w="100%" alignItems="flex-start" pt="64px" pb="64px" pr="45px">
          <Flex w="100%" justifyContent="space-between">
            <Heading as="h4" size="subtitle" color="brand.black">
              CONTINUE SHOPPING
            </Heading>
            <Heading as="h4" size="subtitle" textTransform="uppercase" color="brand.gray">
              X ITEMS
            </Heading>
          </Flex>
          <Divider />
          {/* TO DO: change to 36px in between the pictures */}
          {/* The products here should be the line-items in the Shopify Checkout */}
          {products &&
            products.map(product => (
              <Box w="100%" py="10px">
                <CartItem key={product.id} product={product} />
                <Divider py="12px" />
              </Box>
            ))}
          <HStack py="30px">
            <FormControl w="40%">
              <Input
                type="coupon"
                name="coupon"
                placeholder="123ABCD"
                // Need to change on-hover colour
                // onChange={e => handleInputChange(e, i)}
              />
            </FormControl>
            <Button size="sm" type="submit">
              APPLY COUPON
            </Button>
          </HStack>
        </VStack>
        <VStack alignItems="flex-start" pt="92px">
          {/* Fix the 92px, it's super sketch */}
          <VStack alignItems="flex-start" bg="#E8E8E8" spacing="40px" px="36px" py="36px" w="409px">
            {/* Change this 409px */}
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
            <Divider />
            {/* Need to make the dividers thiccer */}
            <Flex w="100%" justifyContent="space-between">
              <Heading as="h4" size="subtitle" color="brand.black">
                ESTIMATED TOTAL
              </Heading>
              <Heading as="h4" size="subtitle" color="brand.black">
                $1750
              </Heading>
            </Flex>
          </VStack>
          <Button size="md" type="submit">
            PROCEED TO CHECKOUT
          </Button>
        </VStack>
      </HStack>
    </>
  );
};

export default Cart;
