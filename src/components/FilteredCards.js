import { db, Product, imgStorage } from './Products';

const params = new URLSearchParams(window.location.search);
const mainId = params.get('filterId');
let brand = [];
let arr = [];

params.forEach((val, key) => {
  if (!(key === 'filterId')) arr.push({ val, key });
});

let dataArray = [];
//documents

const cardContent = document.querySelector('.filtered__content');
export class FilteredCards extends Product {
  constructor() {
    super(cardContent);
    this.arr = [];
  }

  fetchItems() {
    db.collection('category')
      .doc(mainId)
      .get()
      .then((res) => {
        let data = res.data()['category-title'];
        return data;
      })
      .then((res) => {
        this.filterFunc(res);
      });
  }

  filterFunc(id) {
    let miniArr = [];
    if (arr.length > 0) {
      db.collection('products')
        .where('category', '==', id)
        .get()
        .then((res) => {
          arr.forEach((ele) => {
            let mainData = res.docs.filter((data) => {
              let item = data.data();
              return item[ele.key] === ele.val;
            });
            miniArr.push(...mainData);
          });

          this.cardRender(miniArr);
        });
    } else {
      db.collection('products')
        .where('category', '==', id)
        .limit(8)
        .get()
        .then((res) => {
          miniArr = [...res.docs];

          this.cardRender(miniArr);
        });
    }
  }

  cardRender(res) {
    res.forEach((item) => {
      let data = item.data();
      imgStorage
        .ref(`products/${item.id}/data.jpg`)
        .getDownloadURL()
        .then((img) => {
          dataArray.push({ ...data, img, id: item.id });
        })
        .then(() => {
          this.render(dataArray);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
