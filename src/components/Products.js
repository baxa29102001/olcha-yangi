import firebase from 'firebase';
import { Loader } from './Loader';
const loader = new Loader();
export let firebaseConfig = {
  apiKey: 'AIzaSyAgZwsJMDkQVJHPpiuahohtNLtpyRMpBKc',
  authDomain: 'augmented-clock-310203.firebaseapp.com',
  projectId: 'augmented-clock-310203',
  storageBucket: 'augmented-clock-310203.appspot.com',
  messagingSenderId: '335468813630',
  appId: '1:335468813630:web:bdb0cb6ed55c4081bb206f',
  measurementId: 'G-V8W5LF6E6T',
};
export const firebaseData = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const imgStorage = firebase.storage();

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: false });
let dataArray = [];

export class Product {
  constructor(target) {
    this.target = target;
  }

  fetchProducts() {
    loader.open();
    db.collection('products')
      .get()

      .then((res) => {
        res.docs.forEach((item) => {
          let data = item.data();
          console.log('data');
          imgStorage
            .ref(`products/${item.id}/data.jpg`)
            .getDownloadURL()
            .then((img) => {
              dataArray.push({ ...data, img, id: item.id });
            })
            .then(() => {
              this.render(dataArray);
              loader.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render(data) {
    let html = '';

    // data &&
    data.map((item) => {
      return (html += `
              <div class="card">
               <a href="singleProduct.html?id=${item.id}">
                           
                       
                    <div class="card-header-img">
                        <img src="${item.img}"
                            alt="">
                    </div>
                     </a>
                    <div class="card-body">
                     <a href="singleProduct.html?id=${item.id}">
                     <h3 class="card-title">${item.title}</h3>
                     </a>
                        
                        <div class="card__info">
                            <p>Lorem ipsum dolor sit amet consectetur <br> adipisicing elit. Commodi, recusandae?</p>
                            <div class="stars">
                                <i class="ri-star-line"></i>
                                <i class="ri-star-line"></i>
                                <i class="ri-star-line"></i>
                                <i class="ri-star-line"></i>
                                <i class="ri-star-line"></i>
                                </div>
                            <p class="month-price">${item['price-month']} so'm/oyiga</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p>${item['price-sum']} so'm</p>
                        </div>
                </div>`);
    });

    this.target.innerHTML = html;
  }
}
