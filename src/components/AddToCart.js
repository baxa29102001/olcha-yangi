import { db } from './Products';
import { Loader } from './Loader';
const cartAlert = document.querySelector('.cart-alert');
const cartBtn = document.querySelector('.cart-btn');
const productLoader = new Loader();
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
        db.collection('cart')
          .add({ ...res.data(), amount: 1, imgId: this.id })
          .then((res) => {
            res.get().then((data) => {
              productLoader.close();
              this.obj = { ...data.data(), id: data.id };
              this.render();
            });
          })
          .catch((err) => {
            console.log('err', err);
          });
      });
  }

  render() {
    cartBtn.disabled = true;
    cartBtn.style.cursor = 'not-allowed';
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
    db.collection('cart')
      .doc(this.obj.id)
      .update({
        amount: this.obj.amount + 1,
      })
      .then(() => {
        db.collection('cart')
          .doc(this.obj.id)
          .get()
          .then((res) => {
            productLoader.close();
            let obj = res.data();
            this.obj = { ...obj, id: res.id };
            this.cartAmount.innerHTML = obj.amount;
          });
      });
  }
  minusAmount() {
    if (this.obj.amount <= 1) {
      console.log('minus');
      return;
    }

    productLoader.open();
    db.collection('cart')
      .doc(this.obj.id)
      .update({
        amount: this.obj.amount - 1,
      })
      .then(() => {
        db.collection('cart')
          .doc(this.obj.id)
          .get()
          .then((res) => {
            productLoader.close();
            let obj = res.data();
            this.obj = { ...obj, id: res.id };
            this.cartAmount.innerHTML = obj.amount;
          });
      });
  }
}
