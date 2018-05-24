const mongoose = require('mongoose')
const GridLayoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  girdItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GridItem' }]
})
mongoose.model('GridLayout', GridLayoutSchema)
