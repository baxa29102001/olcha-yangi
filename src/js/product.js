import { Category } from '../components/Category';
import { SingleProduct } from '../components/SingleProduct';
import { AddToCart } from '../components/AddToCart';
import { Loader } from '../components/Loader';

const categoryContainer = document.getElementById('category-btn-container');
const categoryBtn = document.querySelector('.main-header__public-btn');
const categoryBtnLayer = document.getElementById('category-btn-layer');
const containerImg = document.getElementById('single-product');
const cartBtn = document.getElementById('cart-btn');

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
});
function toggle() {
  categoryBtnLayer.classList.toggle('display-block');
}

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

const singleProduct = new SingleProduct(myParam, containerImg);
singleProduct.getProduct();

categoryBtn.addEventListener('click', toggle);
categoryContainer.addEventListener('click', tabsFunc);
