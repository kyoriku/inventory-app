const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const grillSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp)
  },
  burgers: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  clubChicken: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  beerCanChicken: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  vegBurgers: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  sourdough: {
    type: Number,
    required: true,
  },
  sesameBuns: {
    type: Number,
    required: true,
  },
  hoagieBuns: {
    type: Number,
    required: true,
  },
  turkey: {
    onLine: {
      type: Number,
      required: true,
    },
    frozen: {
      type: Number,
      required: true,
    },
  },
  halloumi: {
    type: Number,
    required: true,
  },
},
  {
    toJSON: {
      getters: true,
      versionKey: false
    },
    id: false
  }
);

const Grill = model('Grill', grillSchema);

module.exports = Grill;