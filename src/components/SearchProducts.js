import { db } from './Products';

// Documents
const searchInput = document.getElementById('search-product');
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
          arr.push(data);
        });
      });
  }

  static search(e) {
    if (e.target.value.trim().length > 0) {
      searchItems.style.display = 'block';
      let val = e.target.value;
      let regex = new RegExp(`${val}`, 'i', 'g');
      let title = arr.filter((item) => item.title.match(regex));
      let category = arr.filter((item) => item.category.match(regex));
      let brand = arr.filter((item) => item.brands.match(regex));
      console.log(`title=>`, title, `brand=>`, brand, `catgeory=>`, category);
      let html = '';
      brand.map((item) => {
        return (html += `<li>${item.title}<li>`);
      });
      category.map((item) => {
        return (html += `<li>${item.title}<li>`);
      });
      title.map((item) => {
        return (html += `<li>${item.title}<li>`);
      });
      console.log(html);
      searchItems.innerHTML = html;
    } else {
      searchItems.style.display = 'none';
    }
  }
}

searchInput.addEventListener('input', SearchProduct.search);
