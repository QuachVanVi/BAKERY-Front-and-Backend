import { post } from '../../../lib/helpers/httpClient.js';

const form = document.querySelector('#addSupplierForm');

const handleAddSupplier = async (e) => {
  e.preventDefault();

  // Skapar ett formData objekt ifrån formulärets inmatningsfält...
  const supplierData = new FormData(e.target);
  const supplierInfo = Object.fromEntries(supplierData.entries());
  const result = await post('suppliers', supplierInfo);
  console.log('Resultat:', result);
};

// Koppla formuläret till en händelse...
form.addEventListener('submit', handleAddSupplier);
