// import { Product } from '../components/Products';

const bannerContainer = document.querySelector('.carousel-container');
const carouselItem = document.querySelectorAll('.banner-carousel');
const nextBtn = document.getElementById('next');
const beforeBtn = document.getElementById('before');
const productContainer = document.querySelector('.products-container__slider');
const productCards = document.querySelectorAll('#products .card');
const newProductsContainer = document.getElementById('new-product');
const newProductCards = document.querySelectorAll('#new-product .card');
import './admin.js';
import '../css/style.css';

let index = 1;
let carouselItemWidth = carouselItem[0].clientWidth;
let productWidth = productCards[9].clientWidth;
let newProductWidth = newProductCards[9].clientWidth;
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
    if (e.propertyName === 'transform' && this.index > this.items.length - 2) {
      this.index = 1;
      this.target.style.transition = 'none';
      this.target.style.transform = `translateX(${-this.index * this.width}px)`;
    }

    if (e.propertyName === 'transform' && this.index <= 0) {
      this.index = this.items.length - 2;
      this.target.style.transition = 'none';
      this.target.style.transform = `translateX(${-this.index * this.width}px)`;
    }
  }
}

const bannerCarousel = new Carousel(
  carouselItemWidth,
  bannerContainer,
  carouselItem
);

const productCarousel = new Carousel(
  productWidth,
  productContainer,
  productCards
);

const newProductCarousel = new Carousel(
  newProductWidth,
  newProductsContainer,
  newProductCards
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

setInterval(bannerCarousel.rightFunc.bind(bannerCarousel), 2000);
setInterval(productCarousel.rightFunc.bind(productCarousel), 2000);
setInterval(newProductCarousel.rightFunc.bind(newProductCarousel), 2500);
