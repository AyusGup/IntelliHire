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
    required: true
  },
  speechScore: {
    type: Number,
    required: true
  },
  generalScore: {
    type: Number,
    required: true
  }
});

const ScoreCard = mongoose.model('ScoreCard', scoreCardSchema);

module.exports = ScoreCard;
