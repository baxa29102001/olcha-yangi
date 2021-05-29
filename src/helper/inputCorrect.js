const priceSum = document.getElementById('price-sum');
const priceMonth = document.getElementById('price-month');
export function inputFunc() {
  let data = this.value.replace(this.value, replacer(this.value));
  this.value = this.value.replace(this.value, replacer(this.value));
}

function replacer(data) {
  let ele = data.replace(/\s/g, '') || data;

  let str = '';
  if (ele.length > 3) {
    for (let i = 0; i < ele.length; i += 3) {
      if (ele.length == 4 && i == 3) {
        str = ele.substring(0, 1) + ' ' + ele.substring(1, 4);
      } else if (ele.length == 7 && i == 6) {
        let one = ele.substring(0, 1);
        let zero = ele.substring(1, 4);
        let zero2 = ele.substring(4, 7);
        str = one + ' ' + zero + ' ' + zero2;
      } else {
        str += ele.substring(i, i + 3) + ' ';
      }
    }
  } else {
    str = ele;
  }

  return str;
}

priceSum.addEventListener('keyup', inputFunc);
priceMonth.addEventListener('keyup', inputFunc);
