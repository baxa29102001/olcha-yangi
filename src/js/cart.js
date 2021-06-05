import { Category } from '../components/Category';
import { Cart } from '../components/Cart';
import { beutifuyFunc } from '../helper/beutifuyNum';
import { CategoryBtn } from '../components/CategoryBtn';
import { SearchProduct } from '../components/SearchProducts';

const categoryContainer = document.getElementById('category-btn-container');

const cartContainer = document.getElementById('cart-container');

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
  const miniCart = new Cart();
  miniCart.fetchItems();
  const searchProduct = new SearchProduct();
});
