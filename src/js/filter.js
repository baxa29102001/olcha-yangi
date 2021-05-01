import { CategoryBtn } from '../components/CategoryBtn';
import { Category } from '../components/Category';

const categoryContainer = document.getElementById('category-btn-container');

document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
});
