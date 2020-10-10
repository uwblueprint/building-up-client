import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import StoreItem from './StoreItem';

const useStyles = makeStyles(() => ({
  sectionHeading: {
    padding: '5px 10px',
    marginBottom: 30
  },
  storeItems: {
    maxWidth: '77vw',
    margin: '50px auto'
  }
}));

const ItemListing = ({ sectionTitle, storeItems }) => {
  const classes = useStyles();

  return (
    <div className={classes.storeItems}>
      <Box bgcolor="grey.300" width={255} className={classes.sectionHeading}>
        <Typography variant="h6">{sectionTitle}</Typography>
      </Box>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {storeItems.map((storeItem, index) => (
          <Grid item key={index}>
            <StoreItem itemName={storeItem.itemName} price={storeItem.price} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemListing;
