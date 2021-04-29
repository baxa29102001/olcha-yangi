import { db } from './Products';

export class Category {
  constructor(target) {
    this.target = target;
  }

  getCategory() {
    db.collection('category')
      .get()
      .then((res) => {
        let html = '';
        res.docs.forEach((ele) => {
          let data = ele.data();
          html += `
            <li class="category-ul-item" data-id="${ele.id}">${data['category-title']}</li>
            `;
        });
        this.target.innerHTML = html;
      });
  }
}
