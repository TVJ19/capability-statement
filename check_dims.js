const sizeOf = require('image-size');
const dimensions = sizeOf('GGImage.png');
console.log(`WIDTH: ${dimensions.width}`);
console.log(`HEIGHT: ${dimensions.height}`);
