const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

app.use(bodyParser.json());

app.use('/', require('./routes'));

const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});





process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    process.exit(1);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
}); 

