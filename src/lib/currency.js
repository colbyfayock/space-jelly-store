/**
 * formatCurrency
 */

export function formatCurrency(number) {
  if ( typeof number !== 'number' ) {
    throw new Error(`Failed to format currency; Invalid number type ${typeof number}`);
  }
  return (number / 100 ).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}