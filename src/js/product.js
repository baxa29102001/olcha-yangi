import { Category } from '../components/Category';
import { SingleProduct } from '../components/SingleProduct';
import { CategoryBtn } from '../components/CategoryBtn';
import { AddToCart } from '../components/AddToCart';
import { Loader } from '../components/Loader';

const categoryContainer = document.getElementById('category-btn-container');

const containerImg = document.getElementById('single-product');

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
});

const singleProduct = new SingleProduct(myParam, containerImg);
singleProduct.getProduct();
