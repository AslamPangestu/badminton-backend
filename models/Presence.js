const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PresenceScheme = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      required: true
    },
    players: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "Player" },
          time: { type: Date }
        }
      ],
      require: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = Player = mongoose.model("Presence", PresenceScheme);
