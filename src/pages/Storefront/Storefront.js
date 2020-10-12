import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar, Grid } from '@material-ui/core';
import Banner from '../../components/Storefront/Banner';
import ItemListing from '../../components/Storefront/ItemListing';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

const toques = [];
for (let i = 0; i < 7; ++i) {
  toques.push({ itemName: 'Example of Toque', price: 15.0 });
}
const caps = [];
for (let i = 0; i < 3; ++i) {
  caps.push({ itemName: 'Example of Cap', price: 10.0 });
}
const masks = [];
for (let i = 0; i < 2; ++i) {
  masks.push({ itemName: 'Example of Mask', price: 5.0 });
}

const StoreFront = props => {
  const classes = useStyles();

  useEffect(() => {
    console.log(props);
  }, [props]);

  const handleHomeClick = () => {
    console.log('Home Clicked');
  };

  const handleShopClick = () => {
    console.log('Shop Clicked');
  };

  const handleDonateClick = () => {
    console.log('Donate Clicked');
  };

  const handleCartClick = () => {
    console.log('View Cart Clicked');
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" color="default">
        <Toolbar>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Button variant="outlined" onClick={handleHomeClick}>
                RTR
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleShopClick}>Shop</Button>
            </Grid>
            <Grid item>
              <Button onClick={handleDonateClick}>Donate</Button>
            </Grid>
            <Grid item>
              <Button onClick={handleCartClick}>View Cart</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Banner />
      <ItemListing sectionTitle="TOQUES" storeItems={toques} />
      <ItemListing sectionTitle="CAPS" storeItems={caps} />
      <ItemListing sectionTitle="MASKS" storeItems={masks} />
    </div>
  );
};

export default StoreFront;
