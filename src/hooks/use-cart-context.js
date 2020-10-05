import { useReducer } from 'react';

import { products } from 'data/products';

const initialState = {
  products: {}
}

export default function useCartContext() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => id === key);
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

  function handleAddItem({ id } = {}) {
    dispatch(addItem({ id }))
  }

  /**
   * handleRemoveItem
   */

  function handleRemoveItem({ id } = {}) {
    dispatch(removeItem({ id }))
  }

  return {
    subtotal,
    cartItems,
    addItem: handleAddItem,
    removeItem: handleRemoveItem
  };

}

/**
 * reducer
 */

function reducer(state, action) {
  const { type, data } = action;

  switch (type) {
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
    default:
      throw new Error();
  }
}

/**
 * addItem
 */

function addItem({ id, quantity = 1 } = {}) {
  if ( typeof id !== 'string' ) {
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
  if ( typeof id !== 'string' ) {
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