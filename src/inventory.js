let submit = document.getElementById('submit');
let cancel = document.getElementById('cancel');

function focusOnFirstInput() {
  document.getElementById('item-name').focus();
}

function clearForm() {
  document.getElementById('item-name').value = '';
  document.getElementById('item-price').value = null;
  document.getElementById('item-description').value = '';
  document.getElementById('item-quantity').value = null;
}

function createRow(item) {
  let data = new Array();
  let tr = document.createElement('tr');

  let name = document.createElement('td');
  name.innerHTML = item.name;
  data.push(name);

  let price = document.createElement('td');
  price.innerHTML = `$${item.price}`;
  data.push(price);

  let description = document.createElement('td');
  description.innerHTML = item.description;
  data.push(description);

  let quantity = document.createElement('td');
  let input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('value', `${item.quantity}`);
  quantity.appendChild(input);
  data.push(quantity);

  let btnContainer1 = document.createElement('td');
  let save = document.createElement('button');
  save.innerHTML = 'Save';
  save.setAttribute('class', 'saveButton');
  btnContainer1.appendChild(save);
  data.push(btnContainer1);

  data.forEach((item) => {
    tr.appendChild(item);
  });

  document.getElementById('inventory-display').appendChild(tr);
}

function storeProduct(item) {
  if (store.getItem('products') === null ||
      store.getItem('products') === undefined ||
      store.getItem('products') === []) {
        console.log('creating first storage item');
        let items = new Array();
        items.push(item);
        store.setItem('products', JSON.stringify(items));
      } else {
        console.log(JSON.parse(store.getItem('products')));
        let items = JSON.parse(store.getItem('products'));
        items.push(item);
        store.setItem('products', JSON.stringify(items));
      }
      console.log(JSON.parse(store.getItem('products')));
      createRow(item);
}

function fetchProducts() {
  if (store.getItem('products') === null ||
      store.getItem('products') === undefined ||
      store.getItem('products') === []) {
        return
      } else {
        let items = JSON.parse(store.getItem('products'));
        items.forEach((item) => {
          createRow(item);
        });
      }
}

function createItem() {
  return new Item(document.getElementById('item-name').value,
                              document.getElementById('item-price').value,
                              document.getElementById('item-description').value,
                              document.getElementById('item-quantity').value);
}

document.addEventListener('DOMContentLoaded', () => {
  let content = document.getElementsById('content');
  content.setAttribute('class', 'fade-in');
  fetchProducts();
});

submit.addEventListener('click', (e) => {
  // prevent default submit behavior
  e.preventDefault();
  // generate new item
  let item = createItem();
  // store new item
  storeProduct(item);

  clearForm();
  focusOnFirstInput();
});

cancel.addEventListener('click', (e) => {
  e.preventDefault();
  clearForm();
  focusOnFirstInput();
});
