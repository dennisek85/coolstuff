const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let CoolstuffSchema = new Schema({
  color: {
    type: String,
    required: 'Color is required'
  },
  number:{
    type: Number,
    required: 'Color is required'
  }
});

const Coolstuff = mongoose.model('Coolstuff', CoolstuffSchema);
module.exports = Coolstuff;
