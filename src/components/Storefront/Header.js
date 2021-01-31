import React from 'react';
import { Button, AppBar, Toolbar, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { selectors as teamSelectors } from '../../data/reducers/team';
import { useShopify } from '../../hooks/useShopify';

// Header that appears on every storefront page
// Allows users to navigate to home, storefront, donation page (not added), and cart

const Header = () => {
  const history = useHistory();
  const team = useSelector(teamSelectors.selectTeam, shallowEqual);
  const { cartCount } = useShopify();

  const handleHomeClick = () => {
    console.log('Home Clicked');
    history.push('/');
  };

  const handleShopClick = () => {
    console.log('Shop Clicked');
    if (team.id) {
      history.push(`/${team.id}/store`);
    }
  };

  const handleDonateClick = () => {
    console.log('Donate Clicked');
  };

  const handleCartClick = () => {
    console.log('View Cart Clicked');
    if (team.id) {
      history.push(`/${team.id}/cart`);
    }
  };

  return (
    <AppBar elevation={0} position="static" color="primary">
      <Toolbar>
        <Grid justify="space-between" container spacing={10}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleHomeClick}>
              RTR
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleShopClick}>
              Shop
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleDonateClick}>
              Donate
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleCartClick}>
              View Cart ({cartCount})
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
