import { Helmet } from 'react-helmet';
import { FaShoppingCart } from 'react-icons/fa';

import { formatCurrency } from 'lib/currency';
import useCart from 'hooks/use-cart';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';

import { products } from 'data/products';

import styles from 'styles/pages/Product.module.scss';

export default function Product({ product }) {
  const { addItem } = useCart();

  /**
   * handleAddToCart
   */

  function handleAddToCart() {
    addItem({
      id: product.id,
      quantity: 1
    })
  }

  return (
    <Layout>

      <Helmet>
        <title>{ product.name }</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Section>
        <Container className={styles.productContainer}>
          <div className={styles.productImage}>
            <img src={product.image} />
          </div>
          <div>
            <h1>{ product.name }</h1>
            <p>
              { product.description }
            </p>
            <p>
              { formatCurrency(product.price) }
            </p>
            <p>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            </p>
          </div>
        </Container>
      </Section>

    </Layout>
  )
}

export async function getStaticProps({ params = {} }) {
  const product = products.find(({ id }) => `${id}` === `${params.productId}`);

  return {
    props: {
      product
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    const { id } = product;
    return {
      params: {
        productId: `${id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}