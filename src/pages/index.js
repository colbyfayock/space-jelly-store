import { Helmet } from 'react-helmet';

import useSite from 'hooks/use-site';
import useCart from 'hooks/use-cart';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Header from 'components/Header';
import ProductGrid from 'components/ProductGrid';

import products from 'data/products.json';

import styles from 'styles/pages/Home.module.scss';

export default function Home() {

  const { addItem, removeItem } = useCart();

  const { metadata } = useSite();
  const { siteName } = metadata;

  /**
   * handleAddToCart
   */

  function handleAddToCart(e, { id }) {
    addItem({
      id: id,
      quantity: 1
    })
  }

  return (
    <Layout>

      <Helmet>
        <title>{ siteName }</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Header>
        { siteName }
      </Header>

      <Section>
        <Container>
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        </Container>
      </Section>

    </Layout>
  )
}
