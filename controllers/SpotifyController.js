const SpotifyWebApi = require('spotify-web-api-node');
const { generateRandomString, getHighestOccurrenceInArray} = require("./helper");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const stateKey = 'spotify_auth_state';

const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri
});

module.exports.spotifyLogin = function (res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: 'user-read-email user-read-recently-played',
            redirect_uri: redirectUri,
            state: state
        }).toString());
};

module.exports.spotifyCallback = async function (req, res) {
    const { code } = req.query;
    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        req.session.spotifyAccount = { access_token, refresh_token };
        res.redirect('/diary');
    } catch (err) {
        res.send(`error ${err}`)
    }
};

module.exports.getDiaryData = async function (req, res) {
    try {
        spotifyApi.setAccessToken(req.session.spotifyAccount["access_token"]);
        spotifyApi.setRefreshToken(req.session.spotifyAccount["refresh_token"]);
        const me = await spotifyApi.getMe();
        spotifyApi.getMyRecentlyPlayedTracks({
            limit: 50
        }).then(function (data) {
            const arr = [], songIDs = [];
            data.body.items.forEach(function (p) {
                var obj = {
                    id: p.track.id,
                    played_at: p.played_at,
                    name: p.track.name
                };

                arr.push(obj);
                songIDs.push(p.track.id);

            });
            //calculating the time difference
            var startTime = Date.parse(arr[arr.length - 1].played_at);
            var endTime = Date.parse(arr[0].played_at);
            //convert to hours
            var timeDif = (endTime - startTime) / (1000 * 60 * 60);

            if (timeDif < 10) {
                req.session.timeDiff = 0;
                console.log('timeDIff' + 0)
            } else if (timeDif > 10 && timeDif < 18) {
                req.session.timeDiff = 1;
                console.log('timeDIff' + 1)
            } else {
                req.session.timeDiff = 2;
                console.log('timeDIff' + 2)
            }
            spotifyApi.getAudioFeaturesForTracks(songIDs).then(function (data) {

                var danceability = 0, key = [], loudness = 0, valence = 0, tempo = 0, mode = 0, energy = 0,
                    speechiness = 0,
                    acousticness = 0, instrumentalness = 0, liveness = 0;

                data.body.audio_features.forEach(function (p1, p2, p3) {
                    danceability += p1.danceability;
                    key.push(p1.key);
                    loudness += p1.loudness;
                    valence += p1.valence;
                    tempo += p1.tempo;
                    mode += p1.mode;
                    energy += p1.energy;
                    speechiness += p1.speechiness;
                    acousticness += p1.acousticness;
                    instrumentalness += p1.instrumentalness;
                    liveness += p1.liveness;
                });
                req.session.obj = {
                    danceability: danceability / data.body.audio_features.length,
                    key: getHighestOccurrenceInArray(key),
                    loudness: loudness / data.body.audio_features.length,
                    valence: valence / data.body.audio_features.length,
                    tempo: tempo / data.body.audio_features.length,
                    mode: Math.round(mode / data.body.audio_features.length),
                    energy: energy / data.body.audio_features.length,
                    speechiness: speechiness / data.body.audio_features.length,
                    acousticness: acousticness / data.body.audio_features.length,
                    instrumentalness: instrumentalness / data.body.audio_features.length,
                    liveness: liveness / data.body.audio_features.length
                };
                res.status(200).json(req.session)
            });
        });

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};