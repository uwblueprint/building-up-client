import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, shallowEqual } from 'react-redux';
import { selectors as teamSelectors } from '../../data/reducers/team';
import { useShopify } from '../../hooks/useShopify';
import { Button, Box, Typography } from '@material-ui/core';
import Header from '../../components/storefront/Header';
import CartItem from '../../components/storefront/CartItem';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  cartHeading: {
    padding: 30,
  },
  checkoutButton: {
    minWidth: 400,
    maxWidth: 400,
  },
}));

// Cart page that shows the user the items in their cart, allows them to change quantity, and proceed to checkout

const Cart = () => {
  const classes = useStyles();
  const { checkoutState, updateCartAttributes } = useShopify();
  const team = useSelector(teamSelectors.selectTeam, shallowEqual);

  useEffect(() => {
    const userID = sessionStorage.getItem('userID');
    updateCartAttributes(checkoutState.id, [
      { key: 'userID', value: userID ? userID.toString() : '1' }, // Temporary, so that page doesn't crash
      // Remove once user info is added to redux
      { key: 'teamID', value: team.id.toString() },
      { key: 'teamName', value: team.name },
    ]);
  }, [checkoutState.id, team.id, team.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const openCheckout = () => {
    if (checkoutState.webUrl) {
      console.log('webUrl exists');
    }
    // window.open(checkoutState.webUrl) // opens checkout in a new window
    window.location.replace(checkoutState.webUrl); // opens checkout in same window
  };

  return (
    <div className={classes.root}>
      <Header />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h2" className={classes.cartHeading}>
          Cart
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
          {checkoutState.lineItems &&
            checkoutState.lineItems.map((lineItem, i) => <CartItem key={i} lineItem={lineItem} />)}
        </Box>
        <Button variant="contained" color="primary" onClick={openCheckout} className={classes.checkoutButton}>
          Proceed to Checkout
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
