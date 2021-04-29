import { Product } from '../components/Products';
import { Category } from '../components/Category';
const bannerContainer = document.querySelector('.carousel-container');
const carouselItem = document.querySelectorAll('.banner-carousel');
const nextBtn = document.getElementById('next');
const beforeBtn = document.getElementById('before');
const productContainer = document.querySelector('.products-container__slider');
const productCards = document.querySelectorAll('#products .card');
const newProductsContainer = document.getElementById('new-product');
const newProductCards = document.querySelectorAll('#new-product .card');
const mostProductsContainer = document.getElementById('most-products');
const categoryContainer = document.getElementById('category-btn-container');
const categoryBtn = document.querySelector('.main-header__public-btn');
const categoryBtnLayer = document.getElementById('category-btn-layer');
const categoryBtnItems = document.querySelectorAll('.category-ul-item');

document.addEventListener('DOMContentLoaded', () => {
  const products = new Product(mostProductsContainer);
  products.fetchProducts();
  const categoryList = new Category(categoryContainer);
  categoryList.getCategory();
});

let index = 1;
let carouselItemWidth = carouselItem[0].clientWidth;
let productWidth = 240 || productCards[0].clientWidth;
let newProductWidth = newProductCards[0].clientWidth;
console.log(productWidth);
bannerContainer.style.transform = `translateX(-${index * carouselItemWidth}px)`;

class Carousel {
  constructor(width, target, items) {
    this.width = width;
    this.target = target;
    this.items = items;
    this.index = 1;
  }

  rightFunc() {
    this.target.style.transition = 'all 0.5s linear';
    this.index++;
    this.target.style.transform = `translateX(-${this.index * this.width}px)`;
  }

  leftFunc() {
    this.target.style.transition = 'all 0.5s linear';
    this.index--;
    this.target.style.transform = `translateX(-${this.index * this.width}px)`;
  }

  infiniteFunc(e) {
    if (e.propertyName === 'transform' && this.index > this.items - 2) {
      this.index = 1;
      this.target.style.transition = 'none';
      this.target.style.transform = `translateX(${-this.index * this.width}px)`;
    }

    if (e.propertyName === 'transform' && this.index <= 0) {
      this.index = this.items - 2;
      this.target.style.transition = 'none';
      this.target.style.transform = `translateX(${-this.index * this.width}px)`;
    }
  }
}

const bannerCarousel = new Carousel(
  carouselItemWidth,
  bannerContainer,
  carouselItem.length
);

const productCarousel = new Carousel(productWidth, productContainer, 13);

const newProductCarousel = new Carousel(
  newProductWidth,
  newProductsContainer,
  newProductCards.length
);

nextBtn.addEventListener(
  'click',
  bannerCarousel.rightFunc.bind(bannerCarousel)
);
beforeBtn.addEventListener(
  'click',
  bannerCarousel.leftFunc.bind(bannerCarousel)
);
bannerContainer.addEventListener(
  'transitionend',
  bannerCarousel.infiniteFunc.bind(bannerCarousel)
);

productContainer.addEventListener(
  'transitionend',
  productCarousel.infiniteFunc.bind(productCarousel)
);

newProductsContainer.addEventListener(
  'transitionend',
  newProductCarousel.infiniteFunc.bind(newProductCarousel)
);

function toggle() {
  categoryBtnLayer.classList.toggle('display-block');
}
categoryBtn.addEventListener('click', toggle);
// categoryBtnLayer.addEventListener('click', toggle);

function tabsFunc(e) {
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

categoryContainer.addEventListener('click', tabsFunc);

setInterval(bannerCarousel.rightFunc.bind(bannerCarousel), 2000);
setInterval(productCarousel.rightFunc.bind(productCarousel), 2000);
// setInterval(newProductCarousel.rightFunc.bind(newProductCarousel), 2500);
