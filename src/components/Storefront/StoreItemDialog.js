import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Dialog, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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

  const onAddCartClick = () => {
    console.log('Add to Cart clicked');
  };

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
