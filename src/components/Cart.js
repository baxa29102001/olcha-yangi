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
    db.collection('cart')
      .get()
      .then((res) => {
        if (res.docs.length <= 0) {
          this.render(res.docs);
          loader.close();
        }
        res.docs.forEach((item) => {
          let data = item.data();
          imgStorage
            .ref(`products/${data.imgId}/data.jpg`)
            .getDownloadURL()
            .then((res) => {
              this.arr.push({ ...data, id: item.id, imgUrl: res });
              loader.close();
              this.render(this.arr);
            })
            .then(() => {
              this.sumUp(this.arr);
            });
        });
      });
  }

  render(arr1) {
    if (arr1.length <= 0) {
      emptyContainer.style.display = 'block';
      return;
    }

    cartContainer.style.display = 'block';
    let html = '';
    arr1.map((item) => {
      return (html += `
      <div class="cart-items__info">
                    <div class="cart-item__img">
                        <img src="https://olcha.uz/image/80x80/products/ILAl7RsKkwMnmfK2zIDvvdXnP7SreWXMQqmWkImeBtbaHC9bkFHG8Ok1QpeO.jpeg"
                            alt="">
                    </div>
                    <div class="cart-item__info">
                        <h4 style="margin-bottom: 5px;">${item.category}</h4>
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
    let plusItems = mainCon.querySelectorAll('.cart-item__plus-minus span');
    plusItems.forEach((plusitem) =>
      plusitem.addEventListener(
        'click',
        this.plus.bind(this, plusitem.dataset.id)
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
    console.log(id);
    loader.open();
    db.collection('cart')
      .doc(id)
      .delete()
      .then(() => {
        this.arr = [];
        this.fetchItems();
        this.sumUp();
        loader.close();
      });
  }

  plus(id) {
    let obj = this.arr.find((item) => item.id === id);

    loader.open();
    db.collection('cart')
      .doc(id)
      .update({
        amount: obj.amount + 1,
      })
      .then(() => {
        db.collection('cart')
          .doc(id)
          .get()
          .then((res) => {
            let dataAmount = res.data();
            let arr = [...this.amount];
            let obj = arr.findIndex((item) => item.dataset.id === id);
            this.amount[obj].innerHTML = dataAmount.amount;
            this.arr = [];
            this.fetchItems();
            this.sumUp();
            loader.close();
          });
      });
  }
  minus() {}

  sumUp(arr) {
    let itemIndex = 0;
    let priceSum = 0;
    arr.forEach((item, index) => {
      itemIndex += item.amount;
      priceSum += item.amount * +item['price-sum'];
    });
    cartItem.textContent = itemIndex;
    hisobItem.textContent = itemIndex + ' ta';
    hisobJami.textContent = beutifuyFunc(String(priceSum)) + " so'm";
  }
}
