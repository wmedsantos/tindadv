const { Schema, model } = require('mongoose');

const AdvSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  bio: String,
  avatar: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Proc',
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Proc',
  }],
}, {
  timestamps: true,
});

module.exports = model('Adv', AdvSchema);
