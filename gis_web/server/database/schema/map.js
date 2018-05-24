const mongoose = require('mongoose')
const MapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rasterLayers: [],
  vectorLayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VectorFeatures' }],
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

