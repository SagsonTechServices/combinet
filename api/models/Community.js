const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
