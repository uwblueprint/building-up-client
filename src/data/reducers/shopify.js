import { useSelector, useDispatch } from 'react-redux';
import Client from 'shopify-buy';
import { SHOPIFY_KEY } from '../../config/config';

// Actions/reducers/selectors for shopify related data in the store
// Creates the client with Shopify-Buy and store info
//
const client = Client.buildClient({
  storefrontAccessToken: SHOPIFY_KEY,
  domain: 'raising-the-roof-chez-toit.myshopify.com',
});

const PRODUCTS_FOUND = 'shopify/PRODUCTS_FOUND';
const PRODUCT_FOUND = 'shopify/PRODUCT_FOUND';
const COLLECTION_FOUND = 'shopify/COLLECTION_FOUND';
const CHECKOUT_FOUND = 'shopify/CHECKOUT_FOUND';
const SHOP_FOUND = 'shopify/SHOP_FOUND';
const UPDATE_CART_ATTRIBUTE = 'shopify/UPDATE_CART_ATTRIBUTE';
const ADD_VARIANT_TO_CART = 'shopify/ADD_VARIANT_TO_CART';
const UPDATE_QUANTITY_IN_CART = 'shopify/UPDATE_QUANTITY_IN_CART';
const REMOVE_LINE_ITEM_IN_CART = 'shopify/REMOVE_LINE_ITEM_IN_CART';
const OPEN_CART = 'shopify/OPEN_CART';
const CLOSE_CART = 'shopify/CLOSE_CART';
const CART_COUNT = 'shopify/CART_COUNT';

const initialState = {
  isCartOpen: false, // whether the cart popover is visible or not (currently unused)
  cartCount: 0, // the number of items in the cart
  checkout: {}, // the checkout object that Shopify creates
  products: [], // the checkout object that Shopify creates
  featured: [], // the list of featured products pulled from Shopify (currently unused)
  product: {}, // the product that the user is currently viewing
  shop: {}, // the shop object that Shopify creates
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_FOUND:
      return { ...state, products: action.payload };
    case PRODUCT_FOUND:
      return { ...state, product: action.payload };
    case COLLECTION_FOUND:
      return { ...state, featured: action.payload };
    case CHECKOUT_FOUND:
      return { ...state, checkout: action.payload };
    case SHOP_FOUND:
      return { ...state, shop: action.payload };
    case UPDATE_CART_ATTRIBUTE:
      return { ...state, checkout: action.payload };
    case ADD_VARIANT_TO_CART:
      return { ...state, checkout: action.payload };
    case UPDATE_QUANTITY_IN_CART:
      return { ...state, checkout: action.payload };
    case REMOVE_LINE_ITEM_IN_CART:
      return { ...state, checkout: action.payload };
    case OPEN_CART:
      return { ...state, isCartOpen: true };
    case CLOSE_CART:
      return { ...state, isCartOpen: false };
    case CART_COUNT:
      return { ...state, cartCount: action.payload };
    default:
      return state;
  }
};

// Gets all the products from Shopify
const getProducts = () => {
  return dispatch => {
    client.product.fetchAll().then(res => {
      dispatch({
        type: PRODUCTS_FOUND,
        payload: res,
      });
    });
  };
};

// Gets individual item based on id
const getProduct = id => {
  return async dispatch => {
    const res = await client.product.fetch(id);
    dispatch({
      type: PRODUCT_FOUND,
      payload: res,
    });
    return res;
  };
};

// Creates initial checkout state from Shopify
const checkout = () => {
  return dispatch => {
    client.checkout.create().then(res => {
      dispatch({
        type: CHECKOUT_FOUND,
        payload: res,
      });
    });
  };
};

// Gets Shopify store information
const shopInfo = () => {
  return dispatch => {
    client.shop.fetchInfo().then(res => {
      dispatch({
        type: SHOP_FOUND,
        payload: res,
      });
    });
  };
};

// Updates custom cart attributes
const updateCartCustomAttributes = (checkoutId, attributes) => {
  const customAttributes = {
    customAttributes: attributes,
  };

  return async dispatch => {
    const res = await client.checkout.updateAttributes(checkoutId, customAttributes);
    dispatch({
      type: UPDATE_CART_ATTRIBUTE,
      payload: res,
    });
    return res;
  };
};

// Updates the cart popover count
const updateCartItemCount = amount => {
  return async dispatch => {
    dispatch({
      type: CART_COUNT,
      payload: amount,
    });
  };
};

// Adds variants to cart/checkout
const addVariantToCart = (checkoutId, lineItemsToAdd) => {
  return async dispatch => {
    const res = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    dispatch({
      type: ADD_VARIANT_TO_CART,
      payload: res,
    });
    return res;
  };
};

// Updates quantity of line items in cart and in checkout state
const updateQuantityInCart = (lineItemId, quantity, checkoutId) => {
  const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }];

  return async dispatch => {
    const res = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
    dispatch({
      type: UPDATE_QUANTITY_IN_CART,
      payload: res,
    });
    return res;
  };
};

// Removes line item from cart and checkout state
const removeLineItemInCart = (checkoutId, lineItemId) => {
  return dispatch => {
    client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      dispatch({
        type: REMOVE_LINE_ITEM_IN_CART,
        payload: res,
      });
    });
  };
};

// To close the cart
const handleCartClose = () => {
  return {
    type: CLOSE_CART,
  };
};

// To make the cart visible
const handleCartOpen = () => {
  return {
    type: OPEN_CART,
  };
};

// Set the count of items in the cart
const handleSetCount = count => {
  return {
    type: CART_COUNT,
    payload: count,
  };
};

export const useShopify = () => {
  const dispatch = useDispatch();
  const cartStatus = useSelector(state => state.shopifyState.isCartOpen);
  const cartCount = useSelector(state => state.shopifyState.cartCount);
  const products = useSelector(state => state.shopifyState.products);
  const product = useSelector(state => state.shopifyState.product);
  const featured = useSelector(state => state.shopifyState.featured);
  const checkoutState = useSelector(state => state.shopifyState.checkout);
  const shopDetails = useSelector(state => state.shopifyState.shop);
  const fetchProducts = () => dispatch(getProducts());
  const fetchProduct = id => dispatch(getProduct(id));
  const createCheckout = () => dispatch(checkout());
  const createShop = () => dispatch(shopInfo());
  const closeCart = () => dispatch(handleCartClose());
  const openCart = () => dispatch(handleCartOpen());
  const setCount = count => dispatch(handleSetCount(count));

  const updateCartCount = amount => dispatch(updateCartItemCount(amount));
  const updateCartAttributes = (checkoutId, attributes) => dispatch(updateCartCustomAttributes(checkoutId, attributes));
  const addVariant = (checkoutId, lineItemsToAdd) => dispatch(addVariantToCart(checkoutId, lineItemsToAdd));
  const updateQuantity = (lineItemId, quantity, checkoutID) =>
    dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID));
  const removeLineItem = (checkoutId, lineItemId) => dispatch(removeLineItemInCart(checkoutId, lineItemId));

  return {
    products,
    product,
    featured,
    cartStatus,
    checkoutState,
    cartCount,
    shopDetails,
    updateCartCount,
    updateCartAttributes,
    addVariant,
    fetchProducts,
    fetchProduct,
    createCheckout,
    createShop,
    closeCart,
    openCart,
    updateQuantity,
    removeLineItem,
    setCount,
  };
};
