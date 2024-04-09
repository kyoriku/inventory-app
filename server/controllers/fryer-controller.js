const { Fryer } = require('../models');

const fryerController = {
  // get all fryer data
  async getAllFryer(req, res) {
    try {
      const fryerData = await Fryer.find();
      res.json(fryerData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // get one fryer data by id
  async getOneFryer({ params }, res) {
    try {
      const fryerData = await Fryer.findById(params.id);
      if (!fryerData) {
        res.status(404).json({ message: 'No fryer data found with this id!' });
        return;
      }
      res.json(fryerData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create fryer data
  async createFryer({ body }, res) {
    try {
      const fryerData = await Fryer.create(body);
      res.json(fryerData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // update fryer data by id
  async updateFryer(req, res) {
    try {
      // Fetch the existing fryer data
      const existingFryerData = await Fryer.findOneAndUpdate(
        { _id: req.params.id }, // Filter by fryer ID
        { $set: req.body }, // Update with the data provided in the request body
        { new: true, runValidators: true } // Options: return the modified document, run schema validators
      );
  
      // Checking if fryer data exists
      if (!existingFryerData) {
        return res.status(404).json({ message: 'No fryer data found with this id!' });
      }
  
      // Sending the updated fryer data as a JSON response
      res.json(existingFryerData);
    } catch (err) {
      // Handling any errors that occur, logging them, and sending a 500 status code along with the error message
      console.error(err);
      res.status(500).json(err);
    }
  },  

  // delete fryer data by id
  async deleteFryer({ params }, res) {
    try {
      const fryerData = await Fryer.findByIdAndDelete(params.id);
      if (!fryerData) {
        res.status(404).json({ message: 'No fryer data found with this id!' });
        return;
      }
      res.json(fryerData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = fryerController;
