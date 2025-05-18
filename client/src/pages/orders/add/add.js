import { post } from '../../../lib/helpers/httpClient.js';

const form = document.querySelector('#addOrderForm');

const handleAddOrder = async (e) => {
  e.preventDefault();
  
  const order = {
    customerId: parseInt(document.querySelector('#customerId').value),
    productId: parseInt(document.querySelector('#productId').value),
    quantity: parseInt(document.querySelector('#quantity').value),
    price: parseInt(document.querySelector('#price').value),
    
  };

  
  const result = await post('orders', order);
  console.log('Skickad order:', order);
  console.log('Resultat från backend:', result);
};

form.addEventListener('submit', handleAddOrder);
