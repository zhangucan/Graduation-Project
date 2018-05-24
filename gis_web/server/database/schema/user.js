const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  roles: [],
  gridLayouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GridLayout' }],
  password: {
    type: String,
    required: true
  }
})
mongoose.model('User', UserSchema)
