const router = require('express').Router();
const userRoutes = require('./user-routes');
const fryerRoutes = require('./fryer-routes');
const grillRoutes = require('./grill-routes');

router.use('/users', userRoutes);
router.use('/fryer', fryerRoutes);
router.use('/grill', grillRoutes);

module.exports = router;
