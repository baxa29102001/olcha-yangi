import { db } from './Products';
//Docuemnts

const subContainer = document.getElementById('category-ul-content');
const categoryImgCon = document.querySelector('.category-container');

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
          let mainCategory = data['category-title'];
          subCategory += ` 
           <li class="content" id=${ele.id}>
            <a href='filter.html?filterId=${
              ele.id
            }' class='main-category' >${mainCategory}</a>
              ${arr
                .map((item) => {
                  return `
                  <a class='category-a' href='filter.html?filterId=${ele.id}&brands=${item}'>
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

  render() {
    db.collection('category')
      .get()
      .then((res) => {
        let html = '';
        res.docs.forEach((item) => {
          let data = item.data();
          html += `
       <div class="category-item" data-id="${item.id}">
                <img src="https://olcha.uz/image/61x50/category/DWidpURwovuISy9LDhVcG3I97xyG7chAq3EHMbcX6fVmBrZ2bX8Xfbccxont.png"
                    alt="">
                <p>${data['category-title']}</p>
            </div>`;
        });

        categoryImgCon.innerHTML = html;
      });
  }
}
