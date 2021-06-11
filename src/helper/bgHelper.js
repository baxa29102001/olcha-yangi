const changeBgBtn = document.querySelector('.dot-change');
const userAllBtn = document.querySelectorAll('.user-all-btn');

if (localStorage.getItem('bg') === 'black') {
  changeBgFunc();
}

export function changeBgFunc() {
  if (document.body.className === 'body-change') {
    localStorage.removeItem('bg', 'black');
    changeBgBtn.classList.remove('bg-class');
    document.body.classList.remove('body-change');
    userAllBtn.forEach((userBtn) => {
      userBtn.classList.remove('active');
    });
  } else {
    changeBgBtn.classList.add('bg-class');
    document.body.classList.add('body-change');
    userAllBtn.forEach((userBtn) => {
      userBtn.classList.add('active');
    });
    localStorage.setItem('bg', 'black');
  }
}

changeBgBtn.addEventListener('click', changeBgFunc);
