import { get, remove } from '../../../lib/helpers/httpClient.js';

const pagetitle = document.querySelector('.page-title');
const productImage = document.querySelector('.details img');
const productName = document.querySelector('.info p:first-child');
const weight = document.querySelector('.info p:nth-child(2)');
const price = document.querySelector('.info p:nth-child(3)');
const quantity = document.querySelector('#quantity');
const deleteButton = document.querySelector('#deleteProduct');

let productId;

const initApp = () => {
  productId = location.search.split('=')[1];
  loadProducts(productId);
};

const loadProducts = async (productId) => {
  try {
    const response = await get(`products/${productId}`);
    const product = response.data;
    

    setPageTitle( product.productName);
    setImage(product.imageUrl);
    generateInfo(product);
    console.log('Product:', product);
  } catch (error) {
    console.log('Error information:', error);
  }
};

const handleDeleteProduct = async (e) => {
  e.preventDefault();
  const returnUrl = `${location.origin}/client/src/pages/products/products.html`;
  const result = await remove(`products/${productId}`);

  if (result === 200) {
    location.href = returnUrl;
  }
  else{
    alert('Något gick fel!!')
  }
};

const setPageTitle = (title) => {
  pagetitle.innerText = title;
};
const setImage = (imageUrl) => {
  productImage.src = imageUrl;
};

const generateInfo = (product) => {
    console.log('Product:', product);
    console.log("price", product.price);
    productName.innerHTML += `<span>${product.productName}</span>`;
    weight.innerHTML += `<span>${product?.weight}</span>`;
    price.innerHTML += `<span>${product?.price} kr</span>`;
    quantity.innerHTML += `<span>${product?.quantityPerPackage} st</span>`;
  };
  deleteButton.addEventListener('click', handleDeleteProduct);
document.addEventListener('DOMContentLoaded', initApp);
