import { get, put} from '../../../lib/helpers/httpClient.js';

const form = document.querySelector('#adjustSupplierForm');

const handleAdjustSupplier = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const supplierInfo = Object.fromEntries(formData.entries());

  const { supplierId, contactPerson } = supplierInfo;

  try {
    const existingSupplier = await get(`suppliers/${supplierId}`);

    if(!existingSupplier) {
      alert('Leverantören hittades inte!');
      return;
    }

    existingSupplier.contactPerson = String(contactPerson);
    

    const result = await put(`suppliers/${supplierId}?contactPerson=${contactPerson}`, null);
    console.log('Result:', result);

    if (result) {
      alert('Kontakt-Personen har uppdaterats!');
    } else {
      alert('Det gick ej att uppdatera Kontakt-Personen.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ett fel inträffade!!!');
  }
}
form.addEventListener('submit', handleAdjustSupplier);
