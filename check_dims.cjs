const sizeOf = require('image-size');
try {
    const dimensions = sizeOf('GGImage.png');
    console.log(`WIDTH: ${dimensions.width}`);
    console.log(`HEIGHT: ${dimensions.height}`);
} catch (e) {
    console.log(e);
}
