const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/SpotifyController')

router.get('/spotifycallback',  async function (req, res) {
   await spotifyController.spotifyCallback(req, res);
});

router.get('/login', function(req, res) {
    spotifyController.spotifyLogin(res);
});

router.get('/diarydata', async function (req, res) {
  await spotifyController.getDiaryData(req, res);
});

module.exports = router;
