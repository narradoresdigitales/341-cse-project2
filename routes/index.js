const passport = require('passport');

const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World');
});

router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

router.get('/login', passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/'}),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/');
    }
);

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(err => {
        if (err) { return next(err); }
        res.clearCookie('connect.sid');  // clear session cookie (name depends on your config)
        res.redirect('/');
    });
    });
});




module.exports = router