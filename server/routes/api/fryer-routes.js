const router = require('express').Router();
const {
  getAllFryer,
  getOneFryer,
  createFryer,
  updateFryer,
  deleteFryer
} = require('../../controllers/fryer-controller');

const { authMiddleware } = require('../../utils/auth');

// Set up GET all and POST at /api/fryers
router
  .route('/')
  .get(getAllFryer)
  .post(authMiddleware, createFryer);

// Set up GET one, PUT, and DELETE at /api/fryers/:id
router
  .route('/:id')
  .get(getOneFryer)
  .put(authMiddleware, updateFryer)
  .delete(authMiddleware, deleteFryer);

module.exports = router;
