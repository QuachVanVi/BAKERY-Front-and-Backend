import { get, put} from '../../../lib/helpers/httpClient.js';

const form = document.querySelector('#adjustPriceForm');

const handleAdjustPrice = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const productInfo = Object.fromEntries(formData.entries());

  const { productId, price } = productInfo;

  try {
    const existingProduct = await get(`products/${productId}`);

    if(!existingProduct) {
      alert('Produkten hittades inte!');
      return;
    }

    existingProduct.price = parseFloat(price);
    

    const result = await put(`products/${productId}?price=${price}`, null);
    console.log('Result:', result);

    if (result) {
      alert('Priset har uppdaterats!');
    } else {
      alert('Det gick ej att uppdatera priset.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ett fel inträffade!!!');
  }
}
form.addEventListener('submit', handleAdjustPrice);
