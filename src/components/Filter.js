import { db, imgStorage, firebaseData } from './Products';
import { Loader } from './Loader';
import { beutifuyFunc } from '../helper/beutifuyNum';

const filterBlock = document.getElementById('filter-block');
let check = false;

export class Filter {
  constructor(id) {
    this.id = id;
  }

  fetchFilterItems() {
    db.collection('category')
      .doc(this.id)
      .get()
      .then((res) => {
        let data = res.data();
        this.render(data.filter, data['sub-category']);
      });
  }

  render(obj, arr2) {
    let html = '';
    let mini = '';
    for (let i in obj) {
      mini += `    <div class="filter-block__item">
                      <h3 class="none-btn">${
                        obj[i].title
                      } <i class="ri-arrow-drop-down-line"></i></h3>
                      <div class="filter-none ">
                          <div class='filtered-version ${i}' >
                          ${obj[i].arr
                            .map((item) => {
                              return `<p data-name='${i}' data-id='${item}' check=''>${item}</p>`;
                            })
                            .join(' ')}
                          </div>
                      </div>
                  </div>   `;
    }

    html += ` 
          <div class="filter-block__item">
                    <h3 class="none-btn">Ishlab chiqaruvchilar <i class="ri-arrow-drop-down-line"></i></h3>
                    <div class="filter-none filtered-brands">
                        <div class="filtered-input__group">
                        ${arr2
                          .map((item, index) => {
                            return `
                             <div>
                             <input type="checkbox" data-id=${item} id=${index}>
                            <label for="${index}">${item}</label>
                            </div>
                            `;
                          })
                          .join(' ')}
                            
                        </div>
                    </div>
                </div>
                <div class="filter-block__item">
                    <h3 class="none-btn" style='margin-bottom:0;'>Narx <i class="ri-arrow-drop-down-line"></i></h3>
                    <div class="filter-none ">
                        <div class="filter-price__input">
                            <div class="filter-first__input" id='price__min'>
                                <h4 style='margin-top:2px;'>Dan</h4>
                                <input type="text" data-id='price__min' data-fill=''  placeholder="00000">
                            </div>
                            <div class="filter-second__input" id='price__max'>
                                <h4 style='margin-top:2px;'>Gacha</h4>
                                <input type="text" data-id='price__max' data-fill='' placeholder="99999">
                            </div>
                        </div>
                    </div>
                </div>
                   

                ${mini}
                <button type="button" class="clear-filter">Filterni Bekor qilish</button>
        `;

    filterBlock.innerHTML = html;
    const filterInputGroup = document.querySelector('.filtered-input__group');
    this.filterBlockItems = filterBlock.querySelectorAll('.filter-none');
    const filterBtns = filterBlock.querySelectorAll('.none-btn');
    this.operationItems = filterBlock.querySelector('.operation');
    const storageItems = filterBlock.querySelector('.storage');
    const originItems = filterBlock.querySelector('.origin');
    const price__min = filterBlock.querySelector('.filter-first__input input');
    const price__max = filterBlock.querySelector('.filter-second__input input');
    const priceInput = filterBlock.querySelector('.filter-price__input');

    this.urlCheckBox(filterInputGroup);
    this.simpleCheck(filterBlock);
    this.checkPrice(priceInput);

    filterBtns.forEach((filterBtn, index) => {
      filterBtn.addEventListener('click', this.hideFunc.bind(this, index));
    });
    filterInputGroup.addEventListener('click', this.checkFunc.bind(this));
    this.operationItems.addEventListener('click', this.simpleFilter.bind(this));
    storageItems.addEventListener('click', this.simpleFilter.bind(this));
    originItems.addEventListener('click', this.simpleFilter.bind(this));
    price__max.addEventListener('change', this.priceFunc.bind(this));
    price__min.addEventListener('change', this.priceFunc.bind(this));
  }
  hideFunc(i) {
    this.filterBlockItems[i].classList.toggle('filter-block');
  }
  priceFunc(e) {
    let price__name = e.target.dataset.id;
    if (!Boolean(e.target.dataset.fill)) {
      window.location.search = `${window.location.search}&${price__name}=${e.target.value}`;
    } else {
      let regexp = new RegExp(`${price__name}=\\d{1,9}`, 'i');

      let value = window.location.search.replace(
        regexp,
        `${price__name}=${e.target.value}`
      );
      window.location.search = value;
    }
  }

  checkPrice(html) {
    const params = new URLSearchParams(window.location.search);
    let arr = [];
    params.forEach((val, key) => {
      if (key === 'price__min' || key === 'price__max') arr.push({ val, key });
    });
    arr.forEach((item) => {
      let ele = html.querySelector(`#${item.key} input`);
      ele.value = item.val;
      ele.setAttribute('data-fill', 'filled');
    });
  }

  checkFunc(e) {
    if (e.target.checked) {
      window.location.search = `${window.location.search}&brands=${e.target.dataset.id}`;
    } else {
      let regexp = new RegExp(`&brands=${e.target.dataset.id}`, 'i');
      let mateched = window.location.search.replace(regexp, '');
      window.location.search = mateched;
    }
  }

  urlCheckBox(html) {
    const params = new URLSearchParams(window.location.search);
    const ids = params.getAll('brands');
    ids.forEach((item) => {
      let ele = html.querySelector(`input[data-id='${item}']`);
      ele.checked = !ele.checked;
    });
  }

  simpleFilter(e) {
    if (!Boolean(e.target.getAttribute('check'))) {
      e.target.classList.add('bg-red');
      window.location.search = `${window.location.search}&${e.target.dataset.name}=${e.target.dataset.id}`;
    } else {
      e.target.classList.remove('bg-red');
      e.target.setAttribute('check', '');
      let regexp = new RegExp(
        `&${e.target.dataset.name}=${e.target.dataset.id}`,
        'i'
      );
      console.log(regexp);
      let mateched = window.location.search.replace(regexp, '');
      window.location.search = mateched;
    }
  }

  simpleCheck(html) {
    const params = new URLSearchParams(window.location.search);
    let features = [];
    params.forEach((val, key) => {
      switch (key) {
        case 'storage':
          features.push(val);
          break;
        case 'operation':
          features.push(val);
          break;
        case 'origin':
          features.push(val);
          break;
        default:
          break;
      }
    });
    let element = [];
    const elements = html.querySelectorAll('.filtered-version');
    elements.forEach((item) => {
      features.forEach((ele) => {
        element.push(item.querySelector(`p[data-id='${ele}']`));
      });
    });
    check = !check;
    element = element.filter((item) => item !== null);
    element.forEach((i) => {
      i.classList.add('bg-red');
      i.setAttribute('check', true);
    });
  }
}
