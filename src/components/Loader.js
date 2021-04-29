const loader2 = document.querySelector('.loader-box2');
export class Loader {
  constructor() {}

  open() {
    loader2.style.display = 'flex';
  }

  close() {
    loader2.style.display = 'none';
  }
}
