import { Helmet } from 'react-helmet';
import styles from 'styles/App.module.scss';

import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';
import FeatureList from 'components/FeatureList';

import { products } from 'data/products';

export default function Home() {
  const { metadata } = useSite();
  const { siteName } = metadata;

  return (
    <Layout>

      <Helmet>
        <title>{ siteName }</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Section className={styles.homeHeader}>
        <Container>
          <h1 className={styles.homeTitle}>
            { siteName }
          </h1>
        </Container>
      </Section>

      <Section>
        <Container>
          <ul className={styles.productGrid}>
            {products.map(product => {
              return (
                <li key={product.id}>
                  <img src={product.image} />
                  <h2>{ product.name }</h2>
                  <p>{ product.description }</p>
                  <Button>Add to Cart</Button>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

    </Layout>
  )
}
