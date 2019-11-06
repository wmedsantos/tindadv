const { Schema, model } = require('mongoose');

const ProcSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = model('Proc', ProcSchema);
