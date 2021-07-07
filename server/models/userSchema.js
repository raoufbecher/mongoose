const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: String,
  favouriteFoods: {
    required: [true, 'you have to add favourite food !!'],
    type: [String],
  },
  age: Number
});

const user = mongoose.model('person', userSchema);
module.exports = user;