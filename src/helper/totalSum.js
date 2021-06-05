let cartItem = document.getElementById('cart-item');

export function render() {
  let arr = JSON.parse(localStorage.getItem('cart')) || [];
  let itemIndex = 0;
  let priceSum = 0;
  arr &&
    arr.forEach((item, index) => {
      itemIndex += item.amount;
      priceSum += item.amount * +item['price-sum'];
    });

  cartItem.textContent = itemIndex;
}
