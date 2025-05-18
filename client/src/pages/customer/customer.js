import * as http from '../../lib/helpers/httpClient.js';

const customerList = document.querySelector('#customers');

const initApp = () => {
    loadCustomers();
    };

const loadCustomers = async () => {
    const result = await http.get('customers');
    
    result.data.forEach((customer) => {
        customerList.appendChild(createHtml(customer));
    });

    
};

const createHtml = (customer) => {
    const li = document.createElement('li');
    li.classList.add('card');

    if (!customer.imageUrl || customer.imageUrl.trim() === '') {
        customer.imageUrl = 'https://res.cloudinary.com/raizo1/image/upload/v1746826075/no-image.png_bpijw3.png';
      }

    let html = `
    <img src="${customer.imageUrl}" alt="${customer.storeName}" >
    <p>Kund: <span>${customer.storeName}</span></p>
    <p>Email: <span>${customer.email}</span></p>
    <p>Kontakt Person: <span>${customer.contactPerson}</span></p>
    <p>Telefon: <span>${customer.phone}</span></p>
    `;

    li.innerHTML = html;
    return li;
};

const generateCustomerHtml = (customer) => {
    const section = document.createElement('section');
    section.classList.add('card');

    const image = document.createElement('img');
    image.setAttribute('src', customer.imageUrl);
    image.alt = customer.storeName;
    image.setAttribute('customerId', customer.id);
    
    section.appendChild(image);
    const info = document.createElement('p');
    info.innerText = customer.id;

    section.appendChild(info);
    customerList.appendChild(section) 
};
document.addEventListener('DOMContentLoaded', initApp);