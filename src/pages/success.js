import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useCart from 'hooks/use-cart';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from 'styles/pages/Success.module.scss';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [])

  return (
    <Layout>

      <Helmet>
        <title>Success</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Header>
        Success
      </Header>

      <Section className={styles.successContent}>
        <Container>
          <p className={styles.successThankYou}>
            Thank you for your order!
          </p>
        </Container>
      </Section>

    </Layout>
  )
}
