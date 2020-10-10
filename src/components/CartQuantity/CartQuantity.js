import Button from 'components/Button';

import styles from './CartQuantity.module.scss';

const CartQuantity = ({ id, quantity, onUpdate }) => {

  /**
   * handleOnSubmit
   */

  function handleOnSubmit(e) {
    e.preventDefault();

    const { currentTarget } = e;
    const inputs = Array.from(currentTarget.elements);
    const id = inputs.find(input => input.name === 'id')?.value;
    const quantity = inputs.find(input => input.name === 'quantity')?.value;

    onUpdate({
      id: id && parseInt(id),
      quantity: quantity && parseInt(quantity)
    });
  }

  return (
    <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
      <input name="id" type="hidden" value={id || ''} />
      <input name="quantity" type="number" min={0} defaultValue={quantity} />
      <Button>Update</Button>
    </form>
  )
}

export default CartQuantity;