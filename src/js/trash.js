function nextFunc() {
  bannerContainer.style.transition = 'all 0.5s linear';
  index++;
  bannerContainer.style.transform = `translateX(-${
    index * carouselItemWidth
  }px)`;
}

function beforeFunc() {
  bannerContainer.style.transition = 'all 0.5s linear';
  index--;
  bannerContainer.style.transform = `translateX(-${
    index * carouselItemWidth
  }px)`;
}

function endTransition(e) {
  if (e.propertyName === 'transform' && index > carouselItem.length - 2) {
    index = 1;
    bannerContainer.style.transition = 'none';
    bannerContainer.style.transform = `translateX(${
      -index * carouselItemWidth
    }px)`;
  }

  if (e.propertyName === 'transform' && index <= 0) {
    index = 3;
    bannerContainer.style.transition = 'none';
    bannerContainer.style.transform = `translateX(${
      -index * carouselItemWidth
    }px)`;
  }
}
