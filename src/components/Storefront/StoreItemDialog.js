import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Dialog, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useShopify } from '../../hooks/useShopify';
// import  { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  description: {
    margin: '0 30px'
  },
  dialog: {
    height: '70vh',
    width: '70vh'
  },
  item: {
    padding: 20
  },
  addCartButton: {
    marginTop: 'auto'
  }
}));

const StoreItemDialog = ({ itemName, price, onClose, open }) => {
  const classes = useStyles();
  // let history = useHistory();

  const {
    openCart,
    checkoutState,
    addVariant,
    fetchProduct,
  } = useShopify();

  const onAddCartClick = () => {
    console.log('Add to Cart clicked');


    openCart();
    const checkoutId = checkoutState.id;

    const lineItemsToAdd = [
      { colour: 'black', quantity: 1 }
    ];

    addVariant(checkoutId, lineItemsToAdd);
  };

  const onMoreDetailsClick = (event, productId) => {
    console.log('See more details clicked');

    event.preventDefault();
    const id = productId;
    fetchProduct(id).then((res) => {
      // Redirect to product page ?
      // history.push(`/StoreItem/${res.id}`);
      console.log(res);
    })
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        className={classes.dialog}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box
          className={classes.item}
          display="flex"
          alignItems="center"
          flexGrow={1}
        >
          <Box display="flex">
            <Box height={250} width={250} bgcolor="grey.200" />
            <Box
              display="flex"
              flexDirection="column"
              className={classes.description}
            >
              <Typography variant="body1" component="p">
                {itemName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ${price.toFixed(2)}
              </Typography>
              <a onClick={onMoreDetailsClick} >See more details</a>
              <Button
                variant="outlined"
                onClick={onAddCartClick}
                className={classes.addCartButton}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

StoreItemDialog.propTypes = {
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default StoreItemDialog;
