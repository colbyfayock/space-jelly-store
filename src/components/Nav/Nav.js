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
            <button>
              <FaShoppingCart />
              <span>{subtotal}</span>
            </button>
          </p>
        </Container>
      </Section>
    </nav>
  )
}

export default Nav;