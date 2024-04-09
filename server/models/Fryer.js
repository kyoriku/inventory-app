const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const fryerSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp)
  },
  chickenThighs: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  chickenKarage: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  chickenWings: {
    type: Number,
    required: true,
  },
  hotDogs: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  vegDogs: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  }
},
  {
    toJSON: {
      getters: true,
      versionKey: false
    },
    id: false
  }
);

const Fryer = model('Fryer', fryerSchema);

module.exports = Fryer;