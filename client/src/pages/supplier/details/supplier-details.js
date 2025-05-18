import { get, remove } from '../../../lib/helpers/httpClient.js';

const pagetitle = document.querySelector('.page-title');
const supplierImage = document.querySelector('.details img');
const supplierName = document.querySelector('.info p:first-child');
const contactPerson = document.querySelector('.info p:nth-child(2)');
const phone = document.querySelector('.info p:nth-child(3)');
const email = document.querySelector('#email');
const deleteButton = document.querySelector('#deleteSupplier');

let supplierId;

const initApp = () => {
  supplierId = location.search.split('=')[1];
  loadSuppliers(supplierId);
};

const loadSuppliers = async (supplierId) => {
  try {
    const response = await get(`suppliers/${supplierId}`);
    const supplier = response.data;
    

    setPageTitle( supplier.supplierName);
    setImage(supplier.imageUrl);
    generateInfo(supplier);
    console.log('Supplier:', supplier);
  } catch (error) {
    console.log('Error information:', error);
  }
};

const handleDeleteSupplier = async (e) => {
  e.preventDefault();
  const returnUrl = `${location.origin}/client/src/pages/supplier/supplier.html`;
  const result = await remove(`suppliers/${supplierId}`);

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
  supplierImage.src = imageUrl;
};

const generateInfo = (supplier) => {
    console.log('Supplier:', supplier);
    supplierName.innerHTML += `<span>${supplier?.supplierName}</span>`;
    contactPerson.innerHTML += `<span>${supplier?.contactPerson}</span>`;
    phone.innerHTML += `<span>${supplier?.supplierPhone} </span>`;
    email.innerHTML += `<span>${supplier?.supplierEmail} </span>`;
    
    
  };
  deleteButton.addEventListener('click', handleDeleteSupplier);
  console.log('Email element:', email);
document.addEventListener('DOMContentLoaded', initApp);
