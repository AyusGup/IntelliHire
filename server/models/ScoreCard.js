const mongoose = require("mongoose")
const connect = require("../config/connect")

const scoreCardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  tokenID: {
    type: String,
    required: true
  },
  faceScore: {
    type: Number,
    required: true
  },
  resumeScore: {
    type: Number,
    default: 0
  },
  speechScore: {
    type: Number,
    default: 0
  },
  generalScore: {
    type: Number,
    default: 0
  }
});

const ScoreCard = mongoose.model('ScoreCard', scoreCardSchema);

module.exports = ScoreCard;
