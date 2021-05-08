//Imports
import { db, fire } from '../js/admin';
import { setFile } from '../helper/imgCompresser';
import { cardSubCategoryFunc, categoryFunc } from '../helper/productCategory';
//Documents
const productbtn = document.getElementById('product-btn');
const productTitle = document.getElementById('title');
const priceMonth = document.getElementById('price-month');
const priceSum = document.getElementById('price-sum');

// Classes

export class SetProduct {
  constructor() {}

  static setProduct(e) {
    e.preventDefault();
    let quantity = categoryFunc();
    let filterSubCategory = cardSubCategoryFunc();
    db.collection('products')
      .add({
        category: `${quantity}`,
        'price-month': `${priceMonth.value}`,
        'price-sum': `${priceSum.value}`,
        title: `${productTitle.value}`,
        filterSubCategory,
      })
      .then((res) => {
        let file = setFile();
        fire
          .storage()
          .ref(`products/${res.id}/data.jpg`)
          .put(file)
          .then(() => console.log('succes img'))
          .catch(() => console.log(err));
        clear();
      })
      .catch((er) => {
        console.log('Error');
      });
  }
}

function clear() {
  priceMonth.value = '';
  priceSum.value = '';
  productTitle.value = '';
}

// Listeners
productbtn.addEventListener('submit', SetProduct.setProduct);
