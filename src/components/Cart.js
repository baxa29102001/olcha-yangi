import { db, imgStorage } from './Products';
import { Loader } from './Loader';
import { beutifuyFunc } from '../helper/beutifuyNum';

// document install
const emptyContainer = document.getElementById('empty-cart');
const cartContainer = document.getElementById('cart-container');
const mainCon = cartContainer.querySelector('.cart-container');
const cartItem = document.getElementById('cart-item');
const hisobItem = document.getElementById('hisob-kitob__item');
const hisobJami = document.getElementById('hisob-kitob__jami');

const loader = new Loader();

export class Cart {
  constructor(target) {
    this.target = target;
    this.arr = [];
  }

  fetchItems() {
    loader.open();

    const arr1 = [];
    const arr = JSON.parse(localStorage.getItem('cart')) || [];

    arr.length != 0
      ? arr.forEach((item) => {
          let categoryUrl = item.category;
          imgStorage
            .ref(`products/${item.imgId}/data.jpg`)
            .getDownloadURL()
            .then((res) => {
              arr1.push({ ...item, id: item.id, imgUrl: res, categoryUrl });
              this.render(arr1);
              this.sumUp(arr1);
              loader.close();
            });
        })
      : this.render(arr);
    loader.close();
  }

  render(arr1) {
    if (arr1.length <= 0) {
      cartContainer.style.display = 'none';
      emptyContainer.style.display = 'block';
      this.sumUp(arr1);
      return;
    }
    cartContainer.style.display = 'block';
    let html = '';
    arr1.map((item) => {
      return (html += `
      <div class="cart-items__info">
                    <div class="cart-item__img">
                        <img class="img-size"
                        src=${item.imgUrl}
                            alt="">
                    </div>
                    <div class="cart-item__info">
                        <h4 style="margin-bottom: 5px;">${item.categoryUrl}</h4>
                        <h5 style="margin-top: 0;">${item.title}</h5>
                    </div>
                    <div class="cart-item__plus-minus">
                        <span  data-id=${item.id}>+</span>
                        <h4 data-id=${item.id} >${item.amount}</h4>
                        <span data-id=${item.id}>-</span>
                    </div>
                    <h4 class="cart-item__price">${beutifuyFunc(
                      item['price-sum']
                    )} so'm</h4>
                    <div>
                        <button type="button" data-id=${
                          item.id
                        } class="cart-item__remove">X</button>
                    </div>
                </div>`);
    });

    mainCon.innerHTML = html;
    let plusItems = mainCon.querySelectorAll(
      '.cart-item__plus-minus span:first-child'
    );
    let minusItems = mainCon.querySelectorAll(
      '.cart-item__plus-minus span:last-child'
    );
    plusItems.forEach((plusitem) =>
      plusitem.addEventListener(
        'click',
        this.plus.bind(this, plusitem.dataset.id)
      )
    );
    minusItems.forEach((minusitem) =>
      minusitem.addEventListener(
        'click',
        this.minus.bind(this, minusitem.dataset.id)
      )
    );
    this.amount = document.querySelectorAll('.cart-item__plus-minus h4');
    const removeBtns = mainCon.querySelectorAll('.cart-item__remove');

    removeBtns.forEach((removeBtn) =>
      removeBtn.addEventListener(
        'click',
        this.removeFunc.bind(this, removeBtn.dataset.id)
      )
    );
  }

  removeFunc(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const arr2 = cart.filter((item) => item.id !== id);
    if (arr2.length > 0) {
      localStorage.setItem('cart', JSON.stringify(arr2));
    } else {
      localStorage.removeItem('cart');
    }
    this.fetchItems();
  }

  plus(id) {
    const arr = JSON.parse(localStorage.getItem('cart')) || [];

    let objIndex = arr.findIndex((item) => item.id === id);
    let product = arr[objIndex];

    let obj = {
      ...product,
      amount: product.amount + 1,
    };
    arr[objIndex] = obj;
    localStorage.setItem('cart', JSON.stringify(arr));
    this.fetchItems();
  }
  minus(id) {
    const arr = JSON.parse(localStorage.getItem('cart')) || [];

    let objIndex = arr.findIndex((item) => item.id === id);
    let product = arr[objIndex];
    if (product.amount <= 1) {
      return;
    }

    let obj = {
      ...product,
      amount: product.amount - 1,
    };
    arr[objIndex] = obj;
    localStorage.setItem('cart', JSON.stringify(arr));
    this.fetchItems();
  }

  sumUp(arr) {
    let itemIndex = 0;
    let priceSum = 0;

    arr.forEach((item, index) => {
      itemIndex += item.amount;
      priceSum += item.amount * Number(clearSapce(item['price-sum']));
    });
    cartItem.textContent = itemIndex;
    hisobItem.textContent = itemIndex + ' ta';
    hisobJami.textContent = beutifuyFunc(String(priceSum)) + " so'm";
  }

  removeAllItems() {
    let spaceArr = [];
    localStorage.setItem('cart', JSON.stringify(spaceArr));
  }
}

function clearSapce(str) {
  return str.replace(/\s/g, '');
}
const cart = new Cart();

setTimeout(cart.removeAllItems, 500000);
