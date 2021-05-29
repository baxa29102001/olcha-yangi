//Imports
import { db } from '../js/admin';

// documents
const operation = document.getElementById('filter-operation');
const storage = document.getElementById('filter-storage');
const origin = document.getElementById('filter-origin');
const arr = [];

export class FilterItemProduct {
  constructor(id) {
    this.id = id;
  }

  fetchItems() {
    db.collection('category')
      .doc(this.id)
      .get()
      .then((res) => {
        const data = res.data().filter;
        this.render(data);
      });
  }

  render(data) {
    for (let i in data) {
      let mini = '';
      data[i].arr.map((item) => {
        return (mini += `<option value="${item}">${item}</option>`);
      });
      let html = document.getElementById(`filter-${i}`);
      let label = document.querySelector(`label[for="filter-${i}"]`);
      label.textContent = data[i].title;
      html.innerHTML = mini;
    }
  }
}

export function getDataFilter(id) {
  let html = document.getElementById(id);

  let obj = {
    name: html.id,
  };
  if (check(obj)) {
    arr.push(obj);
  } else {
    let item = arr.findIndex((item) => item.name === obj.name);
    console.log(item);
    arr.splice(item, 1, obj);
  }

  return arr;
}

function check(obj) {
  if (arr.length > 2) {
    arr.forEach((item, index) => {
      if (item.name === obj.name) {
        return false;
      }
    });
  } else {
    return true;
  }
}
class Func {
  static getData(id) {
    return id.options[id.options.selectedIndex].value;
  }
}

export function getOperation() {
  return Func.getData(operation);
}
export function getStoarge() {
  return Func.getData(storage);
}
export function getOrigin() {
  return Func.getData(origin);
}

operation.addEventListener('change', getOperation);
storage.addEventListener('change', getStoarge);
origin.addEventListener('change', getOrigin);
