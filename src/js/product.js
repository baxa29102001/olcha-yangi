import { Category } from '../components/Category';
import { SingleProduct } from '../components/SingleProduct';
import { CategoryBtn } from '../components/CategoryBtn';
import { AddToCart } from '../components/AddToCart';
import { Loader } from '../components/Loader';
import { SearchProduct } from '../components/SearchProducts';
import { changeBgFunc } from '../helper/bgHelper';

const categoryContainer = document.getElementById('category-btn-container');

const containerImg = document.getElementById('single-product');

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
  const searchProduct = new SearchProduct();
});

const singleProduct = new SingleProduct(myParam, containerImg);
singleProduct.getProduct();
