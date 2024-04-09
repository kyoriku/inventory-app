const router = require('express').Router();
const {
  getAllGrill,
  getOneGrill,
  createGrill,
  updateGrill,
  deleteGrill
} = require('../../controllers/grill-controller');

// Set up GET all and POST at /api/grills
router
  .route('/')
  .get(getAllGrill)
  .post(createGrill);

// Set up GET one, PUT, and DELETE at /api/grills/:id
router
  .route('/:id')
  .get(getOneGrill)
  .put(updateGrill)
  .delete(deleteGrill);

module.exports = router;
