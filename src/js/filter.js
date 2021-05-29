import { CategoryBtn } from '../components/CategoryBtn';
import { Category } from '../components/Category';
import { Filter } from '../components/Filter';
import { FilteredCards } from '../components/FilteredCards';
import { db, firebaseData } from '../components/Products';
import { SearchProduct } from '../components/SearchProducts';

const categoryContainer = document.getElementById('category-btn-container');
const params = new URLSearchParams(window.location.search);
const id = params.get('filterId');
document.addEventListener('DOMContentLoaded', () => {
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
  const filter = new Filter(id);
  filter.fetchFilterItems();
  const filteredCard = new FilteredCards();
  filteredCard.fetchItems();
  const searchProduct = new SearchProduct();
});

const bgChange = document.getElementById('background-change');

function bgColorFunc() {
  document.body.classList.toggle('body-change');
}
bgChange.addEventListener('click', bgColorFunc);
