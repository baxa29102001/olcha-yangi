//imports
import { db } from '../js/admin';
import { FilterItemProduct } from '../components/AdFilterAddProduct';

//documents
const category = document.getElementById('kategoriy');
const cardSubCategory = document.getElementById('card-sub__category');

let id;
let quantity;
let filterSubCategory;

//functions

export function categoryFunc(e) {
  id = category.options[category.options.selectedIndex].value;
  miniSubCategory(id);
  const filterProduct = new FilterItemProduct(id);
  filterProduct.fetchItems();
  return (quantity =
    category.options[category.options.selectedIndex].innerHTML);
}

export function cardSubCategoryFunc() {
  return (filterSubCategory =
    cardSubCategory.options[cardSubCategory.options.selectedIndex].innerHTML);
}

function miniSubCategory(id = 'Dq8VPVG0FOmrosW903xP') {
  let html = '';
  db.collection('category')
    .doc(id)
    .get()
    .then((res) => {
      let data = res.data()['sub-category'];
      data.map((item) => {
        return (html += `
         <option value="${item}">${item}</option>
         `);
      });
      cardSubCategory.innerHTML = html;
    });
}

category.addEventListener('change', categoryFunc);
cardSubCategory.addEventListener('change', cardSubCategoryFunc);
