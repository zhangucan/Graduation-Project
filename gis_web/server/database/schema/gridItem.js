const mongoose = require('mongoose')
const GridItemSchema = new mongoose.Schema({
  i: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  w: {
    type: Number,
    required: true
  },
  h: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  component: {
    type: String,
    required: true
  },
  gridType: {
    type: String,
    required: true
  },
  gridLayoutId: {
    type: mongoose.Schema.ObjectId,
    ref: 'GridLayout'
  }
})
mongoose.model('GridItem', GridItemSchema)
