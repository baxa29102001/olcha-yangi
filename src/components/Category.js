import { db } from './Products';
const subContainer = document.getElementById('category-ul-content');
export class Category {
  constructor(target) {
    this.target = target;
  }

  getCategory() {
    db.collection('category')
      .get()
      .then((res) => {
        let html = '';
        let subCategory = '';
        res.docs.forEach((ele) => {
          let data = ele.data();
          html += `
            <li class="category-ul-item" data-id="${ele.id}">${data['category-title']}</li>
            `;
          let arr = data['sub-category'];
          subCategory += ` 
           <li class="content" id=${ele.id}>
              ${arr
                .map((item) => {
                  return `<a href='filter.html?filterId=${ele.id}'>
                  <p>${item}</p>
                  </a>`;
                })
                .join(' ')}
           </li>`;
        });
        this.target.innerHTML = html;
        subContainer.innerHTML = subCategory;
      });
  }
}
