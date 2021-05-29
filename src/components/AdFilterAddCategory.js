import { db, fire, FieldValue } from '../js/admin';

//documents
const filterOperationTitle = document.getElementById('filter-operation__title');
const filterOperationArr = document.getElementById('filter-operation__arr');
const arrBtn = document.getElementById('build-arr');
const subCategory = document.getElementById('sub-category');
const filterOperationBtn = document.getElementById('filter-operation-btn');
const filterValues = document.getElementById('filter-values');
const display = document.getElementById('display');

export class AdFilterAddCategory {
  constructor() {
    this.arr = [];
    this.id = 'Dq8VPVG0FOmrosW903xP';
    this.val = 'operation';
  }
  changeFilterValue() {
    this.val = filterValues.options[filterValues.options.selectedIndex].value;
  }
  changeSubCAtegory() {
    this.id = subCategory.options[subCategory.options.selectedIndex].value;
    console.log(this.id);
  }
  display() {
    const value = filterOperationArr.value;
    this.arr.push(value);
    display.innerHTML = JSON.stringify(this.arr);
  }

  addItems() {
    console.log(this.val, this.id);
    db.collection('category')
      .doc(this.id)
      .set(
        {
          filter: {
            [this.val]: {
              title: filterOperationTitle.value,
              arr: this.arr,
            },
          },
        },
        { merge: true }
      )
      .then(() => {
        console.log('good news');
        this.arr = [];
      });
  }
}

const filter = new AdFilterAddCategory();
filterOperationBtn.addEventListener('click', filter.addItems.bind(filter));
arrBtn.addEventListener('click', filter.display.bind(filter));
filterValues.addEventListener('change', filter.changeFilterValue.bind(filter));

subCategory.addEventListener('change', filter.changeSubCAtegory.bind(filter));
