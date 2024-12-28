const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    default: 'Mumbai',
  },
  temperatureUnit: {
    type: String,
    required: true,
    default: 'Celsius',
  },
});

const Preference = mongoose.model('Preference', preferenceSchema);
module.exports = Preference;