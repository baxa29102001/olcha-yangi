import { Product } from '../components/Products';
import { Category } from '../components/Category';
import { CategoryBtn } from '../components/CategoryBtn';
import { Carousel } from '../components/Carousel';
import { SearchProduct } from '../components/SearchProducts';
import { changeBgFunc } from '../helper/bgHelper';

const mostProductsContainer = document.getElementById('most-products');
const categoryContainer = document.getElementById('category-btn-container');

document.addEventListener('DOMContentLoaded', () => {
  const products = new Product(mostProductsContainer);
  products.fetchProducts();
  const categoryList = new Category(categoryContainer);
  categoryList.render();
  categoryList.getCategory();
  const searchProduct = new SearchProduct();
});
