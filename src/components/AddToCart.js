import { db } from './Products';
import { Loader } from './Loader';
const cartAlert = document.querySelector('.cart-alert');
const cartBtn = document.querySelector('.cart-btn');
const productLoader = new Loader();
import { plusMinus } from '../helper/plusMinus';

let arr = JSON.parse(localStorage.getItem('cart')) || [];
export class AddToCart {
  constructor(id) {
    this.id = id;
    this.obj = {};
  }

  findProduct() {
    productLoader.open();

    db.collection('products')
      .doc(this.id)
      .get()
      .then((res) => {
        this.obj = {
          id: this.id, //Math.random().toFixed(3),
          ...res.data(),
          amount: 1,
          imgId: this.id,
        };
        let existItemIndex = arr.findIndex((item) => item.id === this.obj.id);
        let existItem = arr[existItemIndex];
        if (!existItem) {
          arr.push(this.obj);
          localStorage.setItem('cart', JSON.stringify(arr));
        } else {
          let obj = {
            ...existItem,
            amount: existItem.amount + 1,
          };
          arr[existItemIndex] = obj;
          localStorage.setItem('cart', JSON.stringify(arr));
        }

        this.render();
        productLoader.close();
      });
  }

  render() {
    let html = '';
    html = ` <div class="cart-container">
            <h2>Tovar savatga qoshildi</h2>
            <div class="cart-info-con">
                <div>
                    <img src="https://olcha.uz/image/50x50/products/ILAl7RsKkwMnmfK2zIDvvdXnP7SreWXMQqmWkImeBtbaHC9bkFHG8Ok1QpeO.jpeg"
                        alt="">
                </div>
                <div class="cart-name-price">
                    <h3>${this.obj.title}</h3>
                    <p style="margin: 0;">${this.obj['price-sum']} so'm</p>
                </div>
                <div class="cart-amount">
                    <span id="amount-plus">+</span>
                    <h5 style="text-align: center;" id="cart-amount">${this.obj.amount}</h5>
                    <span id="amount-minus">-</span>
                </div>
            </div>
            <button class="cart-btn" style="margin-top: 10px;">Savatchaga o'tish</button>
            <div class="close-modal">x</div>
        </div>`;

    cartAlert.style.display = 'block';
    cartAlert.innerHTML = html;
    let closeBtn = cartAlert.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      cartAlert.style.display = 'none';
    });
    let amountPlus = cartAlert.querySelector('#amount-plus');
    let amountMinus = cartAlert.querySelector('#amount-minus');
    let savatcha = cartAlert.querySelector('.cart-btn');
    this.cartAmount = cartAlert.querySelector('#cart-amount');
    amountPlus.addEventListener('click', this.plusAmount.bind(this));
    amountMinus.addEventListener('click', this.minusAmount.bind(this));
    savatcha.addEventListener('click', Loader.move);
  }

  plusAmount() {
    productLoader.open();
    plusMinus({
      id: this.obj.id,
      target: this.cartAmount,
    });

    productLoader.close();
  }
  minusAmount() {
    plusMinus(
      {
        id: this.obj.id,
        target: this.cartAmount,
      },
      'minus'
    );
  }
}
