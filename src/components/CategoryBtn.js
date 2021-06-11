const categoryContainer = document.getElementById('category-btn-container');
const categoryBtn = document.querySelector('.main-header__public-btn');
const categoryBtnLayer = document.getElementById('category-btn-layer');
const closeModal = document.querySelector('.close-modal-2');

export class CategoryBtn {
  constructor() {}

  static tabsFunc(e) {
    let arr = categoryContainer.children;
    for (let i of arr) {
      i.classList.remove('category-btn-active');
    }
    const contentArr = document.getElementById('category-ul-content').children;
    for (let j of contentArr) {
      j.style.display = 'none';
    }
    e.target.classList.add('category-btn-active');
    let id = e.target.dataset.id;
    document.getElementById(id).style.display = 'block';
  }

  static toggle() {
    categoryBtnLayer.classList.toggle('display-block');
  }
}

categoryBtn.addEventListener('click', CategoryBtn.toggle);
closeModal.addEventListener('click', CategoryBtn.toggle);
categoryContainer.addEventListener('click', CategoryBtn.tabsFunc);
