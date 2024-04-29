const router = require('express').Router();
const {
  getAllGrill,
  getOneGrill,
  createGrill,
  updateGrill,
  deleteGrill
} = require('../../controllers/grill-controller');

const { authMiddleware } = require('../../utils/auth');

// Set up GET all and POST at /api/grills
router
  .route('/')
  .get(getAllGrill)
  .post(authMiddleware, createGrill);

// Set up GET one, PUT, and DELETE at /api/grills/:id
router
  .route('/:id')
  .get(getOneGrill)
  .put(authMiddleware, updateGrill)
  .delete(authMiddleware, deleteGrill);

module.exports = router;
