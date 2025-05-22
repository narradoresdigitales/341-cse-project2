const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students Api',
        description: 'Students Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/courses.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)