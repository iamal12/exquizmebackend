const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

const options = require('./swaggerDef.js'); // Make sure the path is correct

const swaggerSpec = swaggerJSDoc(options);

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger documentation generated successfully.');
