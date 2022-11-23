let isURL = require('validator/lib/isURL');
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
  fileList: {
    type: [{ type: String }],
    default: [],
    validate: {
      validator : (v) => v.every(item => isURL(item)),
      message: (prop) =>  `${prop.value} неверный адрес!`,
    }
  }
});

module.exports = mongoose.model('todo', todoSchema);