import { CategoryBtn } from '../components/CategoryBtn';
import { Category } from '../components/Category';
import { Filter } from '../components/Filter';
import { db, firebaseData } from '../components/Products';

const categoryContainer = document.getElementById('category-btn-container');
const params = new URLSearchParams(window.location.search);
const id = params.get('filterId');
document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
  const filter = new Filter(id);
  filter.fetchFilterItems();
});

const bgChange = document.getElementById('background-change');

function bgColorFunc() {
  document.body.classList.toggle('body-change');
}
bgChange.addEventListener('click', bgColorFunc);
