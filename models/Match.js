const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchScheme = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    is_single: {
      type: Boolean,
      required: true
    },
    referee: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true
    },
    players_team1: {
      type: [{ type: Schema.Types.ObjectId, ref: "Player" }],
      required: true
    },
    players_team2: {
      type: [{ type: Schema.Types.ObjectId, ref: "Player" }],
      required: true
    },
    set1: {},
    set2: {},
    set3: {}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = Player = mongoose.model("Match", MatchScheme);
