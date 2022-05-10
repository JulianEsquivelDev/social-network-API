// require router from express
const router = require('express').Router();
// require all api routes
const apiRoutes = require('./api');
// establish a prefix of '/api' to all of the routes
router.use('/api', apiRoutes);
// error message for page not found
router.use((req, res) => {
    res.status(404).send('<h1> Error page not found! </h1>');
});
// export routes
module.exports = router;
