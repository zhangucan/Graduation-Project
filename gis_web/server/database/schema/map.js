const mongoose = require('mongoose')
const MapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rasterLayers: [],
  lon: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})
mongoose.model('Map', MapSchema)

