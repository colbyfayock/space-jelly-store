import { useContext } from 'react';

import CartContext from 'context/cart-context';

export default function useCart() {
  const cart = useContext(CartContext);
  return {
    ...cart,
    subtotal: (cart.subtotal / 100 ).toLocaleString('en-US', {
      style:'currency',
      currency:'USD'
    })
  };
}

