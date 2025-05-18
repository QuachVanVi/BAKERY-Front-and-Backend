import * as http from '../../lib/helpers/httpClient.js';

const orderList = document.querySelector('#orders');

const initApp = () => {
    loadOrders();
    };


    const loadOrders = async () => {
        const result = await http.get('orders');
        const customers = result.data;     
       customers.forEach((customer) => {
            customer.orders.forEach((order) => {
                orderList.appendChild(createHtml(order, customer));
            });
        });
    };

const createHtml = (order,customer) => {
    const li = document.createElement('li');
    li.classList.add('card');

    
    const total = (order.price * order.quantity).toFixed(2);

    let html = `
    
     <p>Beställnings-ID: <span>${order.id}</span></p>
    <p>Butik: <span>${customer.storeName}</span></p>
    <p>Produkt-namn: <span>${order.productName}</span></p>
    <p>Antal: <span>${order.quantity} st</span></p>
    <p>Pris/st: <span>${order.price} kr</span></p>
    <p>Totalt: <span>${total} kr</span></p>
<p>Orderdatum: <span>${new Date(order.orderDate).toISOString().split("T")[0]}</span></p>
    
    `;

    li.innerHTML = html;
    return li;
};

document.addEventListener('DOMContentLoaded', initApp);