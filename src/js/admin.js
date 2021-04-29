import Compressor from 'compressorjs';
import firebase from 'firebase';
// import firebaseFirestore from 'firebase/firebase-firestore';
// import firebaseAnalitik from 'firebase/firebase-analytics';
// import firebaseStorage from 'firebase/firebase-storage';
const categoryInput = document.getElementById('category-input');
const category = document.getElementById('kategoriy');
const categoryBtn = document.getElementById('category-btn');
const productTitle = document.getElementById('title');
const priceMonth = document.getElementById('price-month');
const priceSum = document.getElementById('price-sum');
const productbtn = document.getElementById('product-btn');
const imgInput = document.getElementById('img');

export var firebaseConfig = {
  apiKey: 'AIzaSyAgZwsJMDkQVJHPpiuahohtNLtpyRMpBKc',
  authDomain: 'augmented-clock-310203.firebaseapp.com',
  projectId: 'augmented-clock-310203',
  storageBucket: 'augmented-clock-310203.appspot.com',
  messagingSenderId: '335468813630',
  appId: '1:335468813630:web:bdb0cb6ed55c4081bb206f',
  measurementId: 'G-V8W5LF6E6T',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// firebaseAnalitik();

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: false });

function categoryList() {
  db.collection('category')
    .get()
    .then((res) => {
      let html = '';
      res.docs.map((element) => {
        let mini = element.data();
        html += `
           <option value="${element.id}">${mini['category-title']}</option>
                   
          `;
      });
      category.innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
}

function categoryFunc(e) {
  e.preventDefault();
  let value = categoryInput.value;
  db.collection('category')
    .add({
      'category-title': value,
    })
    .then((res) => {
      console.log('succes');
    })
    .catch((er) => {
      console.log(er);
    });
}

let file = {};
function setFile(e) {
  let imgOptima = e.target.files[0];
  console.log(imgOptima);

  new Compressor(imgOptima, {
    quality: 0.6,
    width: 200,
    height: 200,

    success(result) {
      file = result;
      console.log(file);
    },
  });
}

function getProducts() {
  db.collection('products')
    .get()
    .then((res) => {
      res.docs.forEach((item) => {
        let data = item.data();
        firebase
          .storage()
          .ref(`products/${item.id}/data.jpg`)
          .getDownloadURL()
          .then((img) => {
            // document.getElementById('img-tag').src = img;
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

console.log(category);
category.addEventListener('change', (e) => {
  quantity = e.target.options[e.target.options.selectedIndex || 0].value;
});
let quantity;

function setProduct(e) {
  e.preventDefault();
  db.collection('products')
    .add({
      category: `category/${quantity}`,
      'price-month': `${priceMonth.value}`,
      'price-sum': `${priceSum.value}`,
      title: `${productTitle.value}`,
    })
    .then((res) => {
      firebase
        .storage()
        .ref(`products/${res.id}/data.jpg`)
        .put(file)
        .then(() => console.log('succes img'))
        .catch(() => console.log(err));
    })
    .catch((er) => {
      console.log('Error');
    });
}
productbtn.addEventListener('submit', setProduct);
imgInput.addEventListener('change', setFile);

categoryBtn.addEventListener('submit', categoryFunc);
categoryList();
getProducts();
