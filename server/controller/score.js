const ScoreCard = require('../models/ScoreCard'); 
const PostScore = async (req, res) => {
    try {
      const { username, tokenID, faceScore, resumeScore, speechScore, generalScore } = req.body;
  
      const scoreCard = new ScoreCard({
        username,
        tokenID,
        faceScore,
        resumeScore,
        speechScore,
        generalScore
      });
  
      await scoreCard.save();
  
      res.status(201).json(scoreCard);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

const getScore = async (req, res) => {
    try {
      const username = req.params.username;
      console.log(username);
      const scoreCards = await ScoreCard.find({ username });
  
      if (scoreCards.length === 0) {
        return res.status(404).json({ error: 'No score cards found for this username' });
      }
  
      res.json(scoreCards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

const getCandidateList = async (req, res) => {
    try {
      const faceScoreSort = await ScoreCard.find().sort({ faceScore: 1 }).distinct('username');
      const resumeScoreSort = await ScoreCard.find().sort({ resumeScore: 1 }).distinct('username');
      const speechScoreSort = await ScoreCard.find().sort({ speechScore: 1 }).distinct('username');
  
      res.json({
        faceScoreSort,
        resumeScoreSort,
        speechScoreSort
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {getCandidateList,getScore,PostScore};