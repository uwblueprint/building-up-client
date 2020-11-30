import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import { Add, Remove, Clear } from '@material-ui/icons';
import { useShopify } from '../../hooks/useShopify';

const useStyles = makeStyles(() => ({
  buttons: {
    padding: 60
  }
}));

const CartItem = ({ lineItem }) => {
  const classes = useStyles();
  const { checkoutState, updateQuantity, removeLineItem } = useShopify();

  const incrementQuantity = () => {
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItem.quantity + 1;
    updateQuantity(lineItem.id, updatedQuantity, checkoutId);
  };

  const decrementQuantity = () => {
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItem.quantity - 1;
    updateQuantity(lineItem.id, updatedQuantity, checkoutId);
  };

  const deleteLineItem = () => {
    const checkoutId = checkoutState.id;
    removeLineItem(checkoutId, lineItem.id);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box height={100} width={100} bgcolor="grey.200" />
      <Box className={classes.buttons}>
        <IconButton onClick={incrementQuantity}>
          <Add />
        </IconButton>
        <IconButton onClick={decrementQuantity}>
          <Remove />
        </IconButton>
        <IconButton onClick={deleteLineItem}>
          <Clear />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
