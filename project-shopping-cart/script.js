const cart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
let price = 0;
let computerListing = [];

// cri as imagens
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// cria os elementos no html
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// cria cada item no html
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// função para preencher a tela com os itens
const fillList = () => {
  const items = document.querySelector('.items');

  computerListing.forEach((product) => {
    items.appendChild(
      createProductItemElement(
      { sku: product.id, name: product.title, image: product.thumbnail },
      ),
    );
  });
};

// função para chamar a api
const callComputer = async () => {
  const computerList = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const computerListJson = await computerList.json();
  computerListing = computerListJson.results;
  fillList();
};

// função para somar os preços
function sumPrices(salePrice) {
  price += salePrice;
  const roundNumber = Math.round(price * 100) / 100;
  totalPrice.innerHTML = roundNumber;
}

// função para tirar os preços
function decreasePrices(event) {
  const getStringPrice = event.target.innerHTML.split('PRICE: $')[1];
  const getNumberPrice = Number(getStringPrice);
  price -= getNumberPrice;
  const roundNumber = Math.round(price * 100) / 100;
  totalPrice.innerHTML = roundNumber;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// função para criar os elementos do carrinho
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  sumPrices(salePrice);
  return cart.appendChild(li);
}

// função para salvar os itens do carrinho e o preço no localStorage
function saveCart() {
  localStorage.setItem('cart', cart.innerHTML);
  localStorage.setItem('totalPrice', totalPrice.innerHTML);
}

// função pegar a soma do preço do carrinho salvo
function getSavedCart() {
  cart.innerHTML = localStorage.getItem('cart');
  const priceLocalStorage = Number(localStorage.getItem('totalPrice'));
  price = priceLocalStorage;
  totalPrice.innerHTML = priceLocalStorage;
}

// função para passar as informações
const productInfo = async (product) => ({
    sku: product.id,
    name: product.title,
    salePrice: product.price,
   });

// função para quando clicar, adicionar o item no carrinho
const clickButton = async (event) => {
  const myId = event.target.parentNode.children[0].innerText;
  const itensList = await fetch(`https://api.mercadolibre.com/items/${myId}`);
  const itensListJson = await itensList.json();
  const product = await productInfo(itensListJson);
  cart.appendChild(createCartItemElement(product));
    saveCart();
};

function handleButtonEvent() {
  const buttons = document.querySelectorAll('button.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', clickButton);
  });
}

// função para remover um item do carrinho
function cartItemClickListener(event) {
  const click = event.target;
  if (click.innerHTML.split('|').length === 3) {
    decreasePrices(event);
    event.target.remove();
  }
  saveCart();
}

function handleEraseEvent() {
  cart.addEventListener('click', cartItemClickListener);
}

// função para limpar o carrinho
function clearCart() {
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
    price = 0;
    totalPrice.innerHTML = 0;
    cart.innerHTML = '';
    saveCart();
  });
}

// função para aparecer o loading
function loading() {
  const section = document.querySelector('.container');
  const span = document.createElement('span');
  span.classList.add('loading');
  span.innerText = 'Loading...';
  section.appendChild(span);
  setTimeout(() => span.remove(), 2000);
}

async function onloadFunctions() {
  await callComputer();
  handleButtonEvent();
  await handleEraseEvent();
  getSavedCart();
  clearCart();
  loading();
}

window.onload = () => { onloadFunctions(); };