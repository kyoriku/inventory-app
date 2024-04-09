const router = require('express').Router();
const {
  getAllFryer,
  getOneFryer,
  createFryer,
  updateFryer,
  deleteFryer
} = require('../../controllers/fryer-controller');

// Set up GET all and POST at /api/fryers
router
  .route('/')
  .get(getAllFryer)
  .post(createFryer);

// Set up GET one, PUT, and DELETE at /api/fryers/:id
router
  .route('/:id')
  .get(getOneFryer)
  .put(updateFryer)
  .delete(deleteFryer);

module.exports = router;
