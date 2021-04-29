import { Category } from '../components/Category';
import { Cart } from '../components/Cart';
import { beutifuyFunc } from '../helper/beutifuyNum';

const categoryContainer = document.getElementById('category-btn-container');
const categoryBtn = document.querySelector('.main-header__public-btn');
const categoryBtnLayer = document.getElementById('category-btn-layer');
const cartContainer = document.getElementById('cart-container');
const cartInfoItem = cartContainer.querySelectorAll('.cart-items__info');

// cartInfoItem.forEach((item) => {
//   let span = item.querySelector('.cart-item__plus-minus span');
//   span.addEventListener('click', plusFunc);
// });

// function plusFunc() {
//   console.log('render');
// }

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
  const miniCart = new Cart();
  miniCart.fetchItems();
});
function toggle() {
  categoryBtnLayer.classList.toggle('display-block');
}

beutifuyFunc('30000000');

function tabsFunc(e) {
  let arr = categoryContainer.children;
  for (let i of arr) {
    i.classList.remove('category-btn-active');
  }
  const contentArr = document.getElementById('category-ul-content').children;
  for (let j of contentArr) {
    j.style.display = 'none';
  }
  e.target.classList.add('category-btn-active');
  let id = e.target.dataset.id;
  document.getElementById(id).style.display = 'block';
}

categoryBtn.addEventListener('click', toggle);
categoryContainer.addEventListener('click', tabsFunc);
