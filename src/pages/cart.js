import Link from 'next/link';
import { Helmet } from 'react-helmet';
import { FaShoppingCart } from 'react-icons/fa';

import { formatCurrency } from 'lib/currency';
import { initCheckout } from 'lib/payments';
import useSite from 'hooks/use-site';
import useCart from 'hooks/use-cart';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Header from 'components/Header';
import Table from 'components/Table';
import CartQuantity from 'components/CartQuantity';
import Button from 'components/Button';

import products from 'data/products.json';

import styles from 'styles/pages/Cart.module.scss';

export default function Home() {

  const { cartItems, products, updateItemQuantity } = useCart();

  const { metadata } = useSite();
  const { siteName } = metadata;

  // Filter out any items that the customer doesn't want

  let data = cartItems.filter(({ quantity }) => quantity > 0);

  // Pap through our filtered cart items and create a data format
  // suitable for the Table component

  data = data.map(item => {
    const { id, quantity, pricePerUnit } = item;
    const product = products.find(({ id: pid }) => pid === id);
    const { name } = product;
    return {
      id,
      name,
      quantity,
      price: formatCurrency(pricePerUnit),
      update: <CartQuantity id={id} quantity={quantity} onUpdate={handleOnUpdateItem} />,
      total: formatCurrency(quantity * pricePerUnit)
    }
  });

  const columns = [
    {
      columnId: 'name',
      Header: 'Product Name'
    },
    {
      columnId: 'update',
      Header: 'Quantity'
    },
    {
      columnId: 'price',
      Header: 'Price Per Item'
    },
    {
      columnId: 'total',
      Header: 'Item Total'
    }
  ];

  /**
   * handleOnUpdateItem
   */

  function handleOnUpdateItem({ id, quantity }) {
    updateItemQuantity({
      id,
      quantity
    })
  }

  /**
   * handleOnCheckout
   */

  function handleOnCheckout() {
    const lineItems = cartItems.map(({ id, quantity }) => {
      const product = products.find(product => product.id === id);
      const { sku } = product;
      return {
        price: sku,
        quantity
      }
    });

    initCheckout({
      lineItems
    })
  }

  return (
    <Layout>

      <Helmet>
        <title>Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Header>
        <FaShoppingCart /> Cart
      </Header>

      <Section className={styles.cart}>
        <Container>
          <Table data={data} columns={columns} />

          {data.length > 0 && (
            <p className={styles.cartCheckout}>
              <Button onClick={handleOnCheckout}>Check Out with Stripe</Button>
            </p>
          )}

          {data.length === 0 && (
            <p className={styles.cartNoItems}>
              No items in your cart. <Link href="/"><a>Go add something</a></Link>!
            </p>
          )}
        </Container>
      </Section>

    </Layout>
  )
}
