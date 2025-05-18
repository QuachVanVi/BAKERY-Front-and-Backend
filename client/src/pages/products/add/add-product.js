import { post } from '../../../lib/helpers/httpClient.js';

const form = document.querySelector('#addProductForm');

const handleAddProduct = async (e) => {
  e.preventDefault();

  // Skapar ett formData objekt ifrån formulärets inmatningsfält...
  const productData = new FormData(e.target);
  const productInfo = Object.fromEntries(productData.entries());
  const result = await post('products', productInfo);
  console.log('Resultat:', result);
};

// Koppla formuläret till en händelse...
form.addEventListener('submit', handleAddProduct);
