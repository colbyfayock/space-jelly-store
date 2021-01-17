import { useReducer, useEffect } from 'react';
import { getStorageItem, setStorageItem } from 'lib/storage';

import products from 'data/products.json';

const initialState = {
  products: {}
}

const CART_STATE_KEY = 'cart';

export default function useCartContext() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    dispatch(setCart(getInitialState(cart)));
  }, []);

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerUnit: product.price
    }
  });

  const subtotal = cartItems.reduce((accumulator, { pricePerUnit, quantity }) => {
    return accumulator + ( pricePerUnit * quantity );
  }, 0);

  /**
   * handleAddItem
   */

  function handleAddItem({ id, quantity } = {}) {
    dispatch(addItem({ id, quantity }))
  }

  /**
   * handleRemoveItem
   */

  function handleRemoveItem({ id, quantity } = {}) {
    dispatch(removeItem({ id, quantity }))
  }

  /**
   * handleUpdateItemQuantity
   */

  function handleUpdateItemQuantity({ id, quantity } = {}) {
    dispatch(updateItemQuantity({ id, quantity }))
  }

  /**
   * handleClearCart
   */

  function handleClearCart() {
    dispatch(setCart(initialState));
  }

  return {
    products,
    subtotal,
    cartItems,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateItemQuantity: handleUpdateItemQuantity,
    clearCart: handleClearCart
  };

}

/**
 * getInitialState
 */

function getInitialState(initialState) {
  const cartStateFromStorage = getStorageItem(CART_STATE_KEY);
  return cartStateFromStorage || initialState;
}

/**
 * cartReducer
 */

function cartReducer(state, action) {
  const newState = reducer(state, action);
  setStorageItem(CART_STATE_KEY, newState);
  return newState;
}

/**
 * reducer
 */

function reducer(state, action) {
  const { type, data } = action;

  switch (type) {
    case 'SET_CART':
      return {...data};
    case 'ADD_ITEM':
      if ( !state.products[data.id] ) {
        state.products[data.id] = {...data};
      } else {
        state.products[data.id] = {
          ...state.products[data.id],
          quantity: state.products[data.id].quantity + data.quantity
        }
      }
      return {...state};
    case 'REMOVE_ITEM':
      if ( state.products[data.id] && state.products[data.id].quantity > 0 ) {
        state.products[data.id] = {
          ...state.products[data.id],
          quantity: state.products[data.id].quantity - data.quantity
        }
      }

      if ( state.products[data.id].quantity < 0 ) {
        state.products[data.id].quantity = 0;
      }

      return {...state};
    case 'UPDATE_QUANTITY':
      if ( !state.products[data.id] ) {
        state.products[data.id] = {...data};
      } else {
        state.products[data.id] = {
          ...state.products[data.id],
          quantity: data.quantity > 0 ? data.quantity : 0
        }
      }
      return {...state};
    default:
      throw new Error();
  }
}

/**
 * setCart
 */

function setCart(data) {
  return {
    type: 'SET_CART',
    data
  }
}

/**
 * addItem
 */

function addItem({ id, quantity = 1 } = {}) {
  if ( typeof id !== 'number' ) {
    throw new Error('Failed to add item to cart: Invalid ID');
  }
  return {
    type: 'ADD_ITEM',
    data: {
      id,
      quantity
    }
  }
}

/**
 * removeItem
 */

function removeItem({ id, quantity = 1 } = {}) {
  if ( typeof id !== 'number' ) {
    throw new Error('Failed to remove item from cart: Invalid ID');
  }
  return {
    type: 'REMOVE_ITEM',
    data: {
      id,
      quantity
    }
  }
}

/**
 * updateItemQuantity
 */

function updateItemQuantity({ id, quantity = 1 } = {}) {
  if ( typeof id !== 'number' ) {
    throw new Error('Failed to remove item from cart: Invalid ID');
  }
  return {
    type: 'UPDATE_QUANTITY',
    data: {
      id,
      quantity
    }
  }
}