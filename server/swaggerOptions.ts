import { Options } from 'swagger-jsdoc';

const swaggerDefinition: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'A simple Express API',
        },
        servers: [
            {
                url: 'http://localhost:3200',
            },
        ],
    },
    apis: ['./routes/*.ts'], // paths to your API files
};

export default swaggerDefinition;
