const { Grill } = require('../models');

const grillController = {
  // Get all grill data
  async getAllGrill(req, res) {
    try {
      const grillData = await Grill.find();

      if (!grillData) {
        return res.status(404).json({ message: 'No grill data found!' });
      }

      res.json(grillData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get one grill data by id
  async getOneGrill({ params }, res) {
    try {
      const grillData = await Grill.findById(params.id);

      if (!grillData) {
        return res.status(404).json({ message: 'No grill data found with this id!' });
      }

      res.json(grillData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create grill data
  async createGrill({ body }, res) {
    try {
      const grillData = await Grill.create(body);
      res.json(grillData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Update grill data by id
  async updateGrill(req, res) {
    try {
      // Fetch the existing grill data
      const grillData = await Grill.findOneAndUpdate(
        { _id: req.params.id }, // Filter by grill ID
        { $set: req.body }, // Update with the data provided in the request body
        { new: true, runValidators: true } // Options: return the modified document, run schema validators
      );

      // Checking if grill data exists
      if (!grillData) {
        return res.status(404).json({ message: 'No grill data found with this id!' });
      }

      // Sending the updated grill data as a JSON response
      res.json(grillData);
    } catch (err) {
      // Handling any errors that occur, logging them, and sending a 400 status code along with the error message
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Delete grill data by id
  async deleteGrill({ params }, res) {
    try {
      const grillData = await Grill.findByIdAndDelete(params.id);
      if (!grillData) {
        res.status(404).json({ message: 'No grill data found with this id!' });
        return;
      }
      res.json(grillData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = grillController;
