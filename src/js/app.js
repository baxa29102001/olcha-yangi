import { Product } from '../components/Products';
import { Category } from '../components/Category';
import { CategoryBtn } from '../components/CategoryBtn';
import { Carousel } from '../components/Carousel';

const mostProductsContainer = document.getElementById('most-products');
const categoryContainer = document.getElementById('category-btn-container');

document.addEventListener('DOMContentLoaded', () => {
  const products = new Product(mostProductsContainer);
  products.fetchProducts();
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
});
