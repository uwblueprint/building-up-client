import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, shallowEqual } from "react-redux";
import { selectors as teamSelectors } from "../../data/reducers/team";
import { useShopify } from "../../hooks/useShopify";
import { Button, Box, Typography } from "@material-ui/core";
import Header from "../../components/Storefront/Header";
import CartItem from "../../components/Storefront/CartItem";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

const Cart = () => {
  const classes = useStyles();
  const { checkoutState, updateCartAttributes } = useShopify();
  const team = useSelector(teamSelectors.selectTeam, shallowEqual);

  const openCheckout = () => {
    const checkoutId = checkoutState.id;

    if (checkoutState.webUrl) {
      console.log("webUrl exists");
      updateCartAttributes(checkoutId, [
        { key: "teamId", value: team.id },
        { key: "teamName", value: team.name }
      ]);
    }
    // window.open(checkoutState.webUrl) // opens checkout in a new window
    window.location.replace(checkoutState.webUrl); // opens checkout in same window
  };

  return (
    <div className={classes.root}>
      <Header />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h2">Cart</Typography>
        <Box display="flex" alignItems="center" flexGrow={1}>
          {checkoutState.lineItems &&
            checkoutState.lineItems.map((lineItem, i) => (
              <CartItem key={i} lineItem={lineItem} />
            ))}
        </Box>
        <Button variant="outlined" onClick={openCheckout}>
          Open Checkout
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
