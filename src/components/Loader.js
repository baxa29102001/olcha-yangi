const loader2 = document.querySelector('.loader-box2');
const cartBtn = document.querySelector(
  '.main-header__user-favourite:last-child'
);
export class Loader {
  constructor() {}

  open() {
    loader2.style.display = 'flex';
  }

  close() {
    loader2.style.display = 'none';
  }
  static move() {
    window.location.href = 'cart.html';
  }
}

cartBtn.addEventListener('click', Loader.move);
