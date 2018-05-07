const mongoose = require('mongoose')
const MapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rasterLayers: []
})
mongoose.model('Map', MapSchema)
