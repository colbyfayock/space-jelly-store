import Link from 'next/link';

import { formatCurrency } from 'lib/currency';

import Button from 'components/Button';

import styles from './ProductGrid.module.scss';

const ProductGrid = ({ products = [], onAddToCart }) => {
  return (
    <ul className={styles.productGrid}>
      {products.map(product => {
        return (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <a>
                <img src={product.image} />
                <h2>{ product.name }</h2>
                <p>{ product.description }</p>
                <p>{ formatCurrency(product.price) }</p>
              </a>
            </Link>
            <p>
              <Button onClick={(e) => onAddToCart(e, product)}>Add to Cart</Button>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductGrid;