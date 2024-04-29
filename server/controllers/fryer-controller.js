const { Fryer } = require('../models');

const fryerController = {
  // get all fryer data
  async getAllFryer(req, res) {
    try {
      const fryerData = await Fryer.find();
      res.json(fryerData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
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
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // create fryer data
  async createFryer({ body }, res) {
    try {
      const fryerData = await Fryer.create(body);
      // console.log(body)
      res.json(fryerData);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  // update fryer data by id
  async updateFryer(req, res) {
    try {
      const fryerData = await Fryer.findOneAndUpdate(
        { _id: req.params.id }, // Filter by fryer ID
        { $set: req.body }, // Update with the data provided in the request body
        { new: true, runValidators: true } // Options: return the modified document, run schema validators
      );
  
      // Checking if fryer data exists
      if (!fryerData) {
        return res.status(404).json({ message: 'No fryer data found with this id!' });
      }
  
      // Sending the updated fryer data as a JSON response
      res.json(fryerData);
    } catch (error) {
      // Handling any errors that occur, logging them, and sending a 500 status code along with the error message
      console.error(error);
      res.status(500).json(error);
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = fryerController;
