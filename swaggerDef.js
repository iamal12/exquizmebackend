const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'exQuizMe API',
    version: '1.0.0',
    description: 'API documentation for exQuizMe',
  },
};

module.exports = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your API route files
};
