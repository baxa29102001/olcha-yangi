import { db, fire, FieldValue } from '../js/admin';

// document
const subCategory = document.getElementById('sub-category');
const subCategoryInput = document.getElementById('sub-category-input');
const subCategoryBtn = document.getElementById('sub-category-btn');
// addeventlistenre
let categoryId;
subCategory.addEventListener('change', (e) => {
  categoryId = e.target.options[e.target.options.selectedIndex || 0].value;
});
export class AdsubCategory {
  constructor() {}

  static subCategoryFunc() {
    const value = subCategoryInput.value;
    db.collection('category')
      .doc(categoryId)
      .update({ 'sub-category': FieldValue.arrayUnion(value) })
      .then(() => {
        console.log('suceess');
        subCategoryInput.value = '';
      });
  }
}

subCategoryBtn.addEventListener('click', AdsubCategory.subCategoryFunc);
