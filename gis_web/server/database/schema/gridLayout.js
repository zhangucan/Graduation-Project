const mongoose = require('mongoose')
const GridLayoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})
mongoose.model('GridLayout', GridLayoutSchema)
