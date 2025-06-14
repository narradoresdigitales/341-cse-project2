const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use(session ({
    secret: "secret" ,
    resave: false ,
    saveUninitialized: true ,
}))
// This is the basic express session ({..}) initialization.
.use(passport.initialize())
// init passport on every route call.
.use(passport.session())
// allow passport to use "express-session".

.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'
]}))
.use(cors({ origin: '*'}))

.use("/", require("./routes/index.js"));


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    process.exit(1);
});



passport.use(new GitHubStrategy({ 
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});






mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
}); 

