const mongoose = require("mongoose");

const PlayerScheme = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = Player = mongoose.model("Player", PlayerScheme);
