import { db, imgStorage } from './Products';
import { Loader } from './Loader';
import { AddToCart } from './AddToCart';
import { render } from '../helper/totalSum';
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
const addToCart = new AddToCart(myParam);
const loader = new Loader();
let arr = [];
export class SingleProduct {
  constructor(id, target) {
    this.id = id;
    this.target = target;
  }

  getProduct() {
    loader.open();
    db.collection('products')
      .get()
      .then((res) => {
        let arr = [];
        let data = res.docs.filter((ele) => ele.id === this.id);
        data.forEach((ele) => {
          let res = ele.data();
          imgStorage
            .ref(`products/${ele.id}/data.jpg`)
            .getDownloadURL()
            .then((img) => {
              arr.push({ ...res, img, id: ele.id });
              loader.close();
              this.render(arr);
            });
        });
      })
      .then(() => {
        db.collection('cart')
          .get()
          .then((res) => {
            res.docs.forEach((item) => {
              let data = item.data();
              arr.push(data);
            });
          })
          .then(() => {
            render();
          });
      });
  }

  render(arr) {
    let html = '';
    arr.map((ele) => {
      return (html += `
      <div class="product-container">
            <div class="mini-img-container">
                <img src="https://olcha.uz/image/100x100/products/ILAl7RsKkwMnmfK2zIDvvdXnP7SreWXMQqmWkImeBtbaHC9bkFHG8Ok1QpeO.jpeg"
                    alt="">
                <img src="https://olcha.uz/image/100x100/products/0wkVzquyfUy2cqqq51PGoyA0jZiqHEJ2eHi9goEOuLXWR3Phdx7tbG71Wu0B.png"
                    alt="">
                <img src="https://olcha.uz/image/100x100/products/NrWiNnvVTTxVLiF7uNjpMjsJThDbXsTsU7EzUFRKY5S6W8XyFh7cyNNpWsY3.png"
                    alt="">
            </div>
            <div class="big-img-container">
                <div class="big-img">
                    <img src='${ele.img}'>
                </div>
            </div>
            <div class="img-info-container">
                <h2 class="img-info__title">${ele.title}</h2>
                <div class="img-info__navigation-bar">
                    <div class="starts">
                        <i class="ri-star-line"></i>
                        <i class="ri-star-line"></i>
                        <i class="ri-star-line"></i>
                        <i class="ri-star-line"></i>
                        <i class="ri-star-line"></i>
                    </div>
                    <div class="comments">
                        <h4>Sharhlar (10)</h4>
                    </div>
                    <div class="main-header-action main-header__user-favourite">
                        <span><i class="ri-heart-line"></i></span>
                        <button type="button" class="user-all-btn">Tanlanganlar</button>
                    </div>
                    <div class="main-header-action main-header__user-favourite">
                        <span><i class="ri-book-open-line"></i></span>
                        <button type="button" class="user-all-btn">Taqqoslash</button>
                    </div>
                </div>
                <h2>Qisqacha ma'lumot</h2>
                <p>Kafolat muddati (oy): 12
                    Operatsion sistema versiyasi: Android 10.0
                    Doimiy xotira hajmi: 32GB
                    Face ID Datchigi: Mavjud
                    Siz sotib olish ingiz mumkin Samsung Galaxy A21s 3/32GB, Black A217 (eng arzon narxlarda) nafaqat
                    Toshkent bo‘yicha
                    balki Andijon, Buxoro, Farg‘ona, Jizzax, Xorazm, Namangan, Navoi, Qashqadaryo, Qoraqalpog‘iston
                    Respublikasi, Samarqand,
                    Sirdaryo, Surxandaryo, Toshkent viloyati bo‘ylab naqdga va muddatli to‘lovga juda tez yetkazib
                    beramiz. Samsung Galaxy
                    A21s 3/32GB, Black A217 muddatli to‘lov kredit xisobidan emas, shaxsiy mablag‘larimiz xisobidan
                    moliyalashtiriladi.
                </p>
                <h3>${ele['price-sum']} so'm</h3>
                <p>${ele['price-month']} so'm/oyiga</p>
                <div class="cart-navigation__bar">
                    <button class="cart-btn" data-id='${ele.id}'>Sotib Olish</button>
                    <button class="cart-btn cart-btn-white" data-id='${ele.id}'>Bo'lib to'lash</button>
                    <button class="cart-btn cart-btn-outline" data-id='${ele.id}'>Bir bosishda sotib oling</button>
                </div>
            </div>
        </div>`);
    });
    this.target.innerHTML = html;
    let cartBtn = this.target.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
      cartBtn.disabled = true;
      cartBtn.style.cursor = 'not-allowed';
      addToCart.findProduct();
    });
  }
}
