import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography } from '@material-ui/core';
import { useShopify } from '../../hooks/useShopify';
import Header from '../../components/Storefront/Header';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  description: {
    margin: '0 30px'
  },
  item: {
    padding: 60
  }
}));

const Product = props => {
  const classes = useStyles();
  const {
    product,
    fetchProduct,
    checkoutState,
    addVariant,
    openCart
  } = useShopify();
  const id = props.match.params.productId;
  const defaultSize = product.variants && product.variants[0].id.toString();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const description = product.description && product.description.split('.');

  useEffect(() => {
    fetchProduct(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = (sizeId, quantity) => {
    if (Object.keys(product).length === 0) {
      return;
    }
    if (sizeId === '') {
      sizeId = defaultSize;
    }
    const lineItemsToAdd = [
      { variantId: sizeId, quantity: parseInt(quantity) }
    ];
    const checkoutId = checkoutState.id;
    addVariant(checkoutId, lineItemsToAdd);
  };

  return (
    <div className={classes.root}>
      <Header />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          className={classes.item}
          display="flex"
          alignItems="center"
          flexGrow={1}
        >
          <Box display="flex">
            {/* <Box height={250} width={250} bgcolor="grey.200" /> */}
            <div className="Images">
              {product.images &&
                product.images.map((image, i) => {
                  return (
                    <img
                      height={250}
                      width={250}
                      key={image.id + i}
                      src={image.src}
                      alt={`${product.title} product shot`}
                      display="flex"
                      alignItems="center"
                      flexGrow={1}
                    />
                  );
                })}
            </div>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.description}
            >
              <Typography variant="body1" component="p">
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {/* fix this to get the actual price here */}${'15.00'}
              </Typography>
              <Typography variant="body1" component="p">
                This is the description: {description}
              </Typography>
              <Typography variant="body1" component="p">
                {'Set Size'}
              </Typography>
              <input
                className="size"
                type="string"
                min={''}
                value={size}
                onChange={e => {
                  setSize(e.target.value);
                }}
              ></input>
              {/* <Button onClick={() => setSize('')}>Set Size</Button> */}
              {/* <Button onClick={() => setQuantity(1)}>Set Quantity</Button> */}
              <Typography variant="body1" component="p">
                {'Set Quantity'}
              </Typography>
              <input
                className="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={e => {
                  setQuantity(e.target.value);
                }}
              ></input>
              <Button
                variant="outlined"
                onClick={() => addToCart(size, quantity)}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Product;
