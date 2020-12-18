import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Home = () => {
  // Temporary navigation to shop, remove after demo
  const history = useHistory();
  const handleShopClick = () => {
    console.log('Shop Clicked');
    history.push(`/1/store`);
  };

  return (
    <>
      <h1>Building Up -- Home Page</h1>
      <Button onClick={handleShopClick}> Storefront </Button>
    </>
  );
};

export default Home;
