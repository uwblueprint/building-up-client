import React from 'react';
import PropTypes from 'prop-types';
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

const ItemListing = ({ sectionTitle, products, handleItemClick }) => {
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
        {products &&
          products.map((product, i) => (
            <Grid item key={i}>
              <StoreItem
                title={product.title}
                price={product.variants[0].price}
                onItemClick={() => handleItemClick(product.id)}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

ItemListing.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          price: PropTypes.number.isRequired
        })
      )
    })
  ),
  handleItemClick: PropTypes.func.isRequired
};

export default ItemListing;
