const simpleIcons = require('simple-icons');

const brands = [
    'Amazon Web Services',
    'Microsoft Azure',
    'Google Cloud',
    'Kubernetes',
    'StrongDM',
    'Akeyless',
    'SailPoint',
    'Microsoft Entra', // Check key
    'Ping Identity',
    'Microsoft Intune' // Check key
];

console.log('--- EXTRACTED SVGS ---');
brands.forEach(brand => {
    // Fuzzy find or direct access
    const key = Object.keys(simpleIcons).find(k => simpleIcons[k].title === brand || simpleIcons[k].slug === brand.toLowerCase().replace(/ /g, ''));

    if (key) {
        console.log(`BRAND: ${brand}`);
        console.log(`PATH: ${simpleIcons[key].path}`);
        console.log('-------------------');
    } else {
        console.log(`BRAND: ${brand} NOT FOUND`);
    }
});
