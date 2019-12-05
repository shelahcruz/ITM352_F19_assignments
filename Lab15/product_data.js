products =
  [
    {
      model: "Apple iPhone XS",
      price: 990.00,
      image: 'AppleXS.jpg'
    },
    {
      model: "Samsung Galaxy S10",
      price: 850.00,
      image: 'GalaxyS10.jpg'
    },
    {
      model: "Motorola Moto G7 Power/Supra",
      price: 450.00,
      image: 'MotoG7.png'
    },
    {
      model: "Google Pixel 3a",
      price: 350.00,
      image: 'Pixel3a.jpg'
    }
  ];

if (typeof module != 'undefined') {
  module.exports.products = products;
}