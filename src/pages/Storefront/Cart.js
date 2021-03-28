import React, { useEffect } from 'react';
import { Stack, HStack, VStack, Heading } from '@chakra-ui/react';
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
      <Heading mb={4}>SHOPPING BAG</Heading>
      <HStack p={4}>
        <VStack>{products && products.map(product => <CartItem key={product.id} product={product} />)}</VStack>
      </HStack>
    </>
  );
};

export default Cart;
