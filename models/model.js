const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  gitUsername: { type: String, unique: true, required: true },
  profile: Object,
  isDeleted: { type: Boolean, default: false },
  connections: [String],
});

module.exports = mongoose.model('GithubUser', userSchema);
