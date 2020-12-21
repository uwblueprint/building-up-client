import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useShopify } from '../../hooks/useShopify';
import QuantityPicker from '../../components/Storefront/QuantityPicker';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '30px'
  },
  details: {
    margin: '0 30px'
  },
  clearButton: {
    marginLeft: '20px'
  }
}));

// A single item in the cart on the cart page

const CartItem = ({ lineItem }) => {
  const classes = useStyles();
  const {
    checkoutState,
    updateQuantity,
    removeLineItem,
    updateCartCount,
    cartCount
  } = useShopify();

  const incrementQuantity = () => {
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItem.quantity + 1;
    updateQuantity(lineItem.id, updatedQuantity, checkoutId);
    updateCartCount(cartCount + 1);
  };

  const decrementQuantity = () => {
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItem.quantity - 1;
    updateQuantity(lineItem.id, updatedQuantity, checkoutId);
    updateCartCount(cartCount - 1);
  };

  const deleteLineItem = () => {
    const checkoutId = checkoutState.id;
    removeLineItem(checkoutId, lineItem.id);
    updateCartCount(cartCount - lineItem.quantity);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" className={classes.root}>
      {<img height={100} width={100} src={lineItem.variant.image.src} alt={`${lineItem.title} product shot`} border={1}/>}
      <Box
        width={200}
        display="flex"
        flexDirection="column"
        className={classes.details}
      >
        <Typography variant="body2">
          {lineItem.title}
        </Typography>
        <Typography variant="body2" component="p">
          ${lineItem.variant.price}
        </Typography>
      </Box>
      <QuantityPicker
        quantity={lineItem.quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
      <IconButton onClick={deleteLineItem} className={classes.clearButton}>
        <Clear />
      </IconButton>
    </Box>
  );
};

export default CartItem;
