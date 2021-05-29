//Imports
import { db, fire } from '../js/admin';
import { setFile } from '../helper/imgCompresser';
import { cardSubCategoryFunc, categoryFunc } from '../helper/productCategory';
import {
  FilterItemProduct,
  getOperation,
  getOrigin,
  getStoarge,
} from '../components/AdFilterAddProduct';
import { input } from '../helper/inputCorrect';
//Documents
const productbtn = document.getElementById('product-btn');
const productTitle = document.getElementById('title');
const priceMonth = document.getElementById('price-month');
const priceSum = document.getElementById('price-sum');

const filterItemProduct = new FilterItemProduct();

// Classes

export class SetProduct {
  constructor() {}

  static setProduct(e) {
    e.preventDefault();
    let quantity = categoryFunc();
    let filterSubCategory = cardSubCategoryFunc();
    let operation = getOperation();
    let origin = getOrigin();
    let storage = getStoarge();

    db.collection('products')
      .add({
        category: `${quantity}`,
        'price-month': `${priceMonth.value}`,
        'price-sum': `${priceSum.value}`,
        title: `${productTitle.value}`,
        brands: filterSubCategory,
        operation,
        origin,
        storage,
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
