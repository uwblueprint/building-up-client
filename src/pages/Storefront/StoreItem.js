import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  description: {
    paddingTop: 10
  }
}));

const StoreItem = ({ itemName, price }) => {
  const classes = useStyles();
  return (
    <Box>
      <Box height={250} width={250} bgcolor="grey.200" />
      <div className={classes.description}>
        <Typography gutterBottom variant="body1" component="p">
          {itemName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ${price.toFixed(2)}
        </Typography>
      </div>
    </Box>
  );
};

export default StoreItem;
