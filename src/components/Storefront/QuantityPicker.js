import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  description: {
    margin: '0 30px',
  },
  decrementButton: {
    minWidth: '45px',
    maxWidth: '45px',
    borderRadius: '0',
    borderRight: '1px solid black',
  },
  incrementButton: {
    minWidth: '45px',
    maxWidth: '45px',
    borderRadius: '0',
    borderLeft: '1px solid black',
  },
  quantity: {
    margin: '0 10px',
    minWidth: '20px',
    maxWidth: '20px',
  },
}));

// Component that allows users to add/subtract quantities of items on the product page and the cart page

const QuantityPicker = ({ quantity, incrementQuantity, decrementQuantity }) => {
  const classes = useStyles();

  return (
    <Box width={130} display="flex" flexDirection="row" alignItems="center" border={1}>
      <Button onClick={decrementQuantity} className={classes.decrementButton}>
        <Remove />
      </Button>
      <Typography variant="body1" component="p" align="center" className={classes.quantity}>
        {quantity}
      </Typography>
      <Button onClick={incrementQuantity} className={classes.incrementButton}>
        <Add />
      </Button>
    </Box>
  );
};

export default QuantityPicker;
