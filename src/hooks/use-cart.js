import { useContext } from 'react';

import { formatCurrency } from 'lib/currency';

import CartContext from 'context/cart-context';

export default function useCart() {
  const cart = useContext(CartContext);
  return {
    ...cart,
    subtotal: formatCurrency(cart.subtotal )
  };
}

