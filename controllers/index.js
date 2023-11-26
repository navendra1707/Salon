// Entry Point for controllers ROUTERS
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const authenticationRoutes = require('./authentication-routes');

router.use('/api', apiRoutes);
router.use('', homeRoutes);
router.use('', authenticationRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;

