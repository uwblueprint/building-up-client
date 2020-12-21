import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { useShopify } from '../../hooks/useShopify';
import Header from '../../components/Storefront/Header';
import QuantityPicker from '../../components/Storefront/QuantityPicker';

const useStyles = makeStyles(() => ({
  description: {
    margin: '0 30px'
  },
  item: {
    padding: 60
  }
}));

// Product page that displays all the details of a single product
// Allows users to change quantity and size, as well as adding to cart
// TODO: Allow user to select different sizes/colours if there are different variants of the product

const Product = props => {
  const classes = useStyles();
  const {
    product,
    fetchProduct,
    checkoutState,
    addVariant,
    updateCartCount,
    cartCount
  } = useShopify();
  const id = props.match.params.productId;
  const defaultSize = product.variants && product.variants[0].id.toString();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const description = product.description;

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
    updateCartCount(cartCount + parseInt(quantity));
  };

  const incrementQuantity = () => {
      setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
      if (quantity > 1) {
          setQuantity(quantity - 1);
      }
  }

  return (
    <div>
      <Header />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          className={classes.item}
          display="flex"
          alignItems="center"
        >
          <Box display="flex">
            {/* <Box height={250} width={250} bgcolor="grey.200" /> */}
            <div className="Images">
              {product.images &&
                product.images.map((image, i) => {
                  return (
                    <img
                      height={400}
                      width={400}
                      key={image.id + i}
                      src={image.src}
                      alt={`${product.title} product shot`}
                      display="flex"
                      border={1}
                    />
                  );
                })}
            </div>
            <Grid
              container
              justify="space-between"
              direction="column"
              className={classes.description}
            >
              <Typography variant="h3">
                {product.title}
              </Typography>
              <Typography variant="h3" color="secondary" component="p">
                ${product.variants[0].price}
              </Typography>
              <Typography variant="body1" component="p">
                {description}
              </Typography>
              <Button variant="contained" disabled>
                One Size Only
              </Button>
              {/* <input
                className="size"
                type="string"
                min={''}
                value={size}
                onChange={e => {
                  setSize(e.target.value);
                }}
              ></input> */}
              <QuantityPicker
                quantity={quantity}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(size, quantity)}
              >
                Add to Cart
              </Button>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Product;
