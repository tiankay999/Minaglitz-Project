 document.getElementsByClassName(".product button").addEventListener('click', function() {
    alert('Item added to cart!');
 });







 
  // Coordinates for your shop
  const shopLat = 5.681444;   // example: Accra
  const shopLng =  -0.160378;

  const map = L.map('map').setView([shopLat, shopLng], 15);

  // OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Marker + popup
  L.marker([shopLat, shopLng]).addTo(map)
    .bindPopup('<b>My Shop</b><br>hawa Avenue Accra ')
    .openPopup();


