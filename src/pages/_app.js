import 'styles/globals.scss';

import siteConfig from '../../site.config';

import SiteContext from 'context/site-context';
import CartContext from 'context/cart-context';
import useCartContext from 'hooks/use-cart-context';

const context = {
  metadata: siteConfig
}

function App({ Component, pageProps }) {
  const cart = useCartContext();

  return (
    <SiteContext.Provider value={context}>
      <CartContext.Provider value={cart}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </SiteContext.Provider>
  );
}

export default App;