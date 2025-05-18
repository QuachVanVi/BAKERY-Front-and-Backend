import { post } from '../../../lib/helpers/httpClient.js';

const form = document.querySelector('#addCustomerForm');

const handleAddCustomer = async (e) => {
  e.preventDefault();
  
  const customerInfo = {
    storeName: document.querySelector('#storeName').value,
    contactPerson: document.querySelector('#contactPerson').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    imageUrl: document.querySelector('#imageUrl').value,
    addresses: [] 
  };


  const result = await post('customers', customerInfo);
  console.log('Resultat:', result);
};

// Koppla formuläret till en händelse...
form.addEventListener('submit', handleAddCustomer);
