import * as http from '../../lib/helpers/httpClient.js';


  const images = [
   './assets/images/croissant-angle.jpg',
  './assets/images/bake.jpg',
  './assets/images/cookie.jpg',
  './assets/images/croissant.jpg',
  './assets/images/coffee.jpg',
  './assets/images/cake.jpg'
  ];

  const container = document.getElementById('image-container');
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Description of ${src}`;
    img.classList.add('image-class'); 
    container.appendChild(img);
  });

