import { db } from '../js/admin';
const categoryInput = document.getElementById('category-input');
const categoryBtn = document.getElementById('category-btn');
const category = document.getElementById('kategoriy');
const subCategory = document.getElementById('sub-category');
export class ADAddCategory {
  static categoryFunc(e) {
    e.preventDefault();
    let value = categoryInput.value;
    db.collection('category')
      .add({
        'category-title': value,
        filter: {
          operation: {},
          storage: {},
          origin: {},
        },
        'sub-category': [],
      })
      .then((res) => {
        console.log('succes');
        categoryInput.value = '';
      })
      .catch((er) => {
        console.log(er);
      });
  }

  static categoryList() {
    db.collection('category')
      .get()
      .then((res) => {
        let html = '';
        let mini;
        res.docs.map((element) => {
          mini = element.data();
          html += `
           <option value="${element.id}">${mini['category-title']}</option>
                   
          `;
        });
        category.innerHTML = html;
        subCategory.innerHTML = html;
      })

      .catch((err) => {
        console.log(err);
      });
  }
}

categoryBtn.addEventListener('submit', ADAddCategory.categoryFunc);
