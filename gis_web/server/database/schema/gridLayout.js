const mongoose = require('mongoose')
const GridLayoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  girdItems: [{ type: mongoose.Schema.Types.ObjectId }]
})
mongoose.model('GridLayout', GridLayoutSchema)
