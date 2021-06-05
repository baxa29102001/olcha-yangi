import { db } from './Products';

// Documents
const searchInput = document.getElementById('search-product');
const container__search = document.querySelector('.container__search');
const searchItems = document.querySelector('.search-items__container');
const arr = [];
export class SearchProduct {
  constructor() {
    this.fetch();
  }

  fetch() {
    db.collection('products')
      .get()
      .then((res) => {
        res.docs.forEach((item) => {
          let data = item.data();
          arr.push({ ...data, id: item.id });
        });
      });
  }

  static search(e) {
    if (e.target.value.trim().length > 0) {
      container__search.style.display = 'block';
      let val = e.target.value;
      let regex = new RegExp(`${val}`, 'i', 'g');
      let title = arr.filter((item) => item.title.match(regex));
      let category = arr.filter((item) => item.category.match(regex));
      let brand = arr.filter((item) => item.brands.match(regex));
      let html = '';
      brand.map((item) => {
        return (html += ` <li>
                    <a href="singleProduct.html?id=${item.id}">${item.title}</a>
                </li>`);
      });
      category.map((item) => {
        return (html += ` <li>
                    <a href="singleProduct.html?id=${item.id}">${item.title}</a>
                </li>`);
      });
      title.map((item) => {
        return (html += ` <li>
                   <a href="singleProduct.html?id=${item.id}">${item.title}</a>
                </li>`);
      });
      searchItems.innerHTML = html;
    } else {
      searchItems.style.display = 'none';
      searchInput.value = '';
    }
  }
}

searchInput.addEventListener('input', SearchProduct.search);
