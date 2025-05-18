
import * as http from '../../lib/helpers/httpClient.js';

const productsList = document.querySelector('#products');

const initApp = () => {
  loadProducts();
};

const loadProducts = async () => {
  const result = await http.get('products');
  
  result.data.forEach((product) => {
    productsList.appendChild(createHtml(product));
    console.log('Product response:', result);
  });

  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    image.addEventListener('click', () => {
      location.href = `${location.origin}/client/src/pages/products/details/product-details.html?productId=${image.getAttribute('productId')}`;
      
    });
  });
};

const createHtml = (product) => {
  const li = document.createElement('li');
  li.classList.add('card');

  let html = `
  <img src="${product.imageUrl}" alt="${product.product_Name}" productId="${product.productNumber}">
    <p>Produkt-ID: <span>${product.productNumber}</span></p>
    <p>Produkt-namn: <span>${product.product_Name}</span></p>
    <p>Kvantitet: <span>${product.quantityPerPackage} </span></p>
    <p>Pris: <span>${product.product_Price} kr</span></p>
    <p>Vikt: <span>${product.weight}</span></p>
  `;

  li.innerHTML = html;
  return li;
};

const generateProductHtml = (product) => {
    const section = document.createElement('section');
    section.classList.add('card');

    const image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.alt = product.product_Name;
    image.setAttribute('productId', product.productNumber);
    
    
    section.appendChild(image);
    
    const info = document.createElement('p');
    info.innerText = product.productNumber;

    section.appendChild(info);

    productsList.appendChild(section)
};
document.addEventListener('DOMContentLoaded', initApp);