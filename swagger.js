const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AJIO Clone API',
            version: '1.0.0',
            description: 'API documentation for AJIO Clone e-commerce application',
            contact: {
                name: 'API Support',
                url: 'https://ajio-server.onrender.com',
                email: 'vikeshraut952@gmail.com',
            },
        },
        servers: [
            {
                url: 'https://ajio-server.onrender.com/api',
                description: 'Production server',
            },
            {
                url: 'http://localhost:5000/api',
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};