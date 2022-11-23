const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  caption: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  description: {
    type: String,
  },
  expires: {
    type: Date,
    // default 7 days after created
    default: new Date(new Date().valueOf() + 604800000),
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  fileList: [{
    type: String,
  }]
});

module.exports = mongoose.model('todo', todoSchema);