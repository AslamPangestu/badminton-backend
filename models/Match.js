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
    refree: {
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
    sets: {
      type: [
        {
          time: { type: String },
          score_team1: { type: Number },
          score_team2: { type: Number }
        }
      ]
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = Player = mongoose.model("Match", MatchScheme);
