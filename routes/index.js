const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/SpotifyController')
const openAiController = require('../controllers/OpenAiController')

router.get('/spotifycallback',  async function (req, res) {
   await spotifyController.spotifyCallback(req, res);
});

router.get('/login', function(req, res) {
    spotifyController.spotifyLogin(res);
});

router.get('/diarydata', async function (req, res) {
  await spotifyController.getDiaryData(req, res);
});

router.post('/generate', async function (req, res) {
    await openAiController.generate(req, res);
});

module.exports = router;
