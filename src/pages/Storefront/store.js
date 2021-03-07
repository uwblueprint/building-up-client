import React, { useEffect } from 'react';
import { useShopify } from '../../hooks/useShopify';

const Store = () => {
  const { createShop, createCheckout, fetchProducts } = useShopify();

  useEffect(() => {
    // Component on mount (i.e. app init): Try to fetch user data (Apollo client internally uses a cookie)
    createShop();
    fetchProducts();
    createCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Storefront</div>;
};

export default Store;
