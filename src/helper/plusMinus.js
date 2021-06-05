export function plusMinus(id, target = 'plus') {
  let arrCart = JSON.parse(localStorage.getItem('cart'));
  let productIndex = arrCart.findIndex((item) => item.id === id.id);
  let product = arrCart[productIndex];
  if (target === 'minus' && product.amount == 1) {
    return;
  }
  let obj = {
    ...product,
    amount: target === 'plus' ? product.amount + 1 : product.amount - 1,
  };
  arrCart[productIndex] = obj;
  localStorage.setItem('cart', JSON.stringify(arrCart));
  id.target.innerHTML = obj.amount;
}
