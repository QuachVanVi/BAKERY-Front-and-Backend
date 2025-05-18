
  import * as http from '../../lib/helpers/httpClient.js';

  const supplierList = document.querySelector('#suppliers');

  const initApp = () => {
    loadSuppliers();
  };

 const loadSuppliers = async () => {
   const result = await http.get('suppliers');
   
   result.data.forEach((supplier) => {
     supplierList.appendChild(createHtml(supplier));
     console.log('Supplier response:', result);
   });
 
   const images = document.querySelectorAll('img');
   images.forEach((image) => {
     image.addEventListener('click', () => {
       location.href = `${location.origin}/client/src/pages/supplier/details/supplier-details.html?supplierId=${image.getAttribute('supplierId')}`;
       
     });
   });
 };
 
  const createHtml = (supplier) => {
    const li = document.createElement('li');
    li.classList.add('card');

    let html = `
    <img src="${supplier.imageUrl}" alt="${supplier.supplierName}" supplierId="${supplier.supplierId}">
      <p>Leverantör-ID: <span>${supplier.supplierId}</span></p>
      <p>Butik: <span>${supplier.supplierName}</span></p>
      <p>Kontaktperson: <span>${supplier.contactPerson}</span></p>
      <p>Telefon nr: <span>${supplier.supplierPhone}</span></p>
      <p>Email: <span>${supplier.supplierEmail}</span></p>
    `;

    li.innerHTML = html;
    return li;
  };

  const generateProductHtml = (supplier) => {
      const section = document.createElement('section');
      section.classList.add('card');

      const image = document.createElement('img');
      image.setAttribute('src', supplier.imageUrl);
      image.alt = supplier.supplierName;
      image.setAttribute('supplierId', supplier.supplierId);
      
      section.appendChild(image);

      supplierList.appendChild(section)
  };
  document.addEventListener('DOMContentLoaded', initApp);