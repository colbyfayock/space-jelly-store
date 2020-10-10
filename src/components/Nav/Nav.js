import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useCart from 'hooks/use-cart';

import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Nav.module.scss';

const Nav = () => {
  const { metadata = {} } = useSite();
  const { siteName } = metadata;

  const { subtotal } = useCart();

  return (
    <nav className={styles.nav}>
      <Section className={styles.navSection}>
        <Container className={styles.navContainer}>
          <p className={styles.navName}>
            <a href="/">{ siteName }</a>
          </p>
          <p className={styles.navCart}>
            <Link href="/cart">
              <a>
                <FaShoppingCart />
                <span>{subtotal}</span>
              </a>
            </Link>
          </p>
        </Container>
      </Section>
    </nav>
  )
}

export default Nav;