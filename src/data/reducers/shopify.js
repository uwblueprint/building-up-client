import { useSelector, useDispatch } from 'react-redux';
import Client from 'shopify-buy';

// Creates the client with Shopify-Buy and store info
//
const client = Client.buildClient({
  storefrontAccessToken: 'your-storefront-access-token',
  domain: 'your-shop-name.myshopify.com'
});

//
// Example Storefront
//
// const client = Client.buildClient({
// 	storefrontAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
// 	domain: "graphql.myshopify.com",
// })

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
  isCartOpen: false,
  cartCount: 0,
  checkout: {},
  products: [],
  featured: [],
  product: {},
  shop: {}
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
    client.product.fetchAll().then(resp => {
      dispatch({
        type: PRODUCTS_FOUND,
        payload: resp
      });
    });
  };
};

// Gets individual item based on id
const getProduct = id => {
  return async dispatch => {
    const resp = await client.product.fetch(id);
    dispatch({
      type: PRODUCT_FOUND,
      payload: resp
    });
    return resp;
  };
};

//
// Gets a  collection based on that collection's id
//
// const getCollection = () => {
// 	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIwODAyMDYwMzAzMw=="
// 	return (dispatch) => {
// 		client.collection.fetchWithProducts(collectionId).then((resp) => {
// 			dispatch({
// 				type: COLLECTION_FOUND,
// 				payload: resp.products,
// 			})
// 		})
// 	}
// }

// Creates initial checkout state from Shopify
const checkout = () => {
  return dispatch => {
    client.checkout.create().then(resp => {
      dispatch({
        type: CHECKOUT_FOUND,
        payload: resp
      });
    });
  };
};

// Gets Shopify store information
const shopInfo = () => {
  return dispatch => {
    client.shop.fetchInfo().then(resp => {
      dispatch({
        type: SHOP_FOUND,
        payload: resp
      });
    });
  };
};

// Updates cart attributes
const updateCartCustomAttributes = (checkoutId, attributes) => {
  const customAttributes = {
    customAttributes: attributes
  };

  return async dispatch => {
    const response = await client.checkout.updateAttributes(
      checkoutId,
      customAttributes
    );
    dispatch({
      type: UPDATE_CART_ATTRIBUTE,
      payload: response
    });
    return response;
  };
};

// Adds variants to cart/checkout
const addVariantToCart = (checkoutId, lineItemsToAdd) => {
  return async dispatch => {
    const response = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    dispatch({
      type: ADD_VARIANT_TO_CART,
      payload: response
    });
    return response;
  };
};

// Updates quantity of line items in cart and in checkout state
const updateQuantityInCart = (lineItemId, quantity, checkoutId) => {
  const lineItemsToUpdate = [
    { id: lineItemId, quantity: parseInt(quantity, 10) }
  ];

  return async dispatch => {
    const resp = await client.checkout.updateLineItems(
      checkoutId,
      lineItemsToUpdate
    );
    dispatch({
      type: UPDATE_QUANTITY_IN_CART,
      payload: resp
    });
    return resp;
  };
};

// Removes line item from cart and checkout state
const removeLineItemInCart = (checkoutId, lineItemId) => {
  return dispatch => {
    client.checkout.removeLineItems(checkoutId, [lineItemId]).then(resp => {
      dispatch({
        type: REMOVE_LINE_ITEM_IN_CART,
        payload: resp
      });
    });
  };
};

// To close the cart
const handleCartClose = () => {
  return {
    type: CLOSE_CART
  };
};

// To open the cart
const handleCartOpen = () => {
  return {
    type: OPEN_CART
  };
};

// Set the count of items in the cart
const handleSetCount = count => {
  return {
    type: CART_COUNT,
    payload: count
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
  // const fetchCollection = () => dispatch(getCollection())
  const createCheckout = () => dispatch(checkout());
  const createShop = () => dispatch(shopInfo());
  const closeCart = () => dispatch(handleCartClose());
  const openCart = () => dispatch(handleCartOpen());
  const setCount = count => dispatch(handleSetCount(count));

  const updateCartAttributes = (checkoutId, attributes) =>
    dispatch(updateCartCustomAttributes(checkoutId, attributes));
  const addVariant = (checkoutId, lineItemsToAdd) =>
    dispatch(addVariantToCart(checkoutId, lineItemsToAdd));
  const updateQuantity = (lineItemId, quantity, checkoutID) =>
    dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID));
  const removeLineItem = (checkoutId, lineItemId) =>
    dispatch(removeLineItemInCart(checkoutId, lineItemId));

  return {
    products,
    product,
    featured,
    cartStatus,
    checkoutState,
    cartCount,
    shopDetails,
    updateCartAttributes,
    addVariant,
    fetchProducts,
    fetchProduct,
    // fetchCollection,
    createCheckout,
    createShop,
    closeCart,
    openCart,
    updateQuantity,
    removeLineItem,
    setCount
  };
};