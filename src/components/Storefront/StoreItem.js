import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
// import { useShopify } from '../../data/reducers/index';

const useStyles = makeStyles(() => ({
  description: {
    paddingTop: 10
  }
}));

const StoreItem = ({ itemName, price, onItemClick }) => {
  const classes = useStyles();

  return (
    <Box onClick={onItemClick}>
      <Box height={250} width={250} bgcolor="grey.200" />
      <Box className={classes.description}>
        <Typography variant="body1" component="p">
          {itemName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ${price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

StoreItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default StoreItem;
