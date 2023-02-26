import { addSDMoods, generateMood, getMood } from "../util/moodHelper";
import {
  generateRandomString,
  getAngleDeg,
  getIntensity,
  getMean,
  getMeanAndSdOfAllValues,
  getRandomElement,
  getStandardDeviation,
  removeDoublesAndAddCount,
} from "../util/helper";
import { MOOD, MOODS } from "../constants/moods";
import { MappedSongData } from "../shared/model";

const openAiController = require("../controllers/OpenAiController");
const SpotifyWebApi = require("spotify-web-api-node");

export interface AudioFeatures {
  danceability: number; // a value of 0.0 is least danceable and 1.0 is most danceable
  energy: number; // a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity
  key: number; // Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
  loudness: number; // The overall loudness of a track in decibels (dB). Values typically range between -60 and 0 db.
  mode: number; // Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
  speechiness: number; // Speechiness detects the presence of spoken words in a track. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
  acousticness: number; // confidence measure from 0.0 to 1.0 of whether the track is acoustic
  instrumentalness: number; // Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
  liveness: number; // Detects the presence of an audience in the recording. A value above 0.8 provides strong likelihood that the track is live.
  valence: number; // A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
  tempo: number; // The overall estimated tempo of a track in beats per minute (BPM).
  type: "audio_features";
  id: string; // Spotify ID
  uri: string; // Spotify URI
  track_href: string; // link to the Web API endpoint providing full details of the track
  analysis_url: string; // URL to access the full audio analysis of this track.
  duration_ms: number;
  time_signature: number; // An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
}

interface Track {
  artists: any[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  uri: string;
}

interface RecentlyPlayedItem {
  track: Track;
  played_at: string;
}

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const stateKey = "spotify_auth_state";

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

module.exports.spotifyLogin = function (res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: "user-read-recently-played",
        redirect_uri: redirectUri,
        state: state,
      }).toString()
  );
};

module.exports.spotifyCallback = async function (req, res) {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    req.session.spotifyAccount = { access_token, refresh_token };
    res.redirect("/diary");
  } catch (err) {
    res.send(`error ${err}`);
  }
};

module.exports.getDiaryData = async function (req, res) {
  try {
    spotifyApi.setAccessToken(req.session.spotifyAccount["access_token"]);
    spotifyApi.setRefreshToken(req.session.spotifyAccount["refresh_token"]);
    const me = (await spotifyApi.getMe()).body;

    const yesterdayBegin = new Date();
    const yesterdayEnd = new Date();
    yesterdayBegin.setDate(yesterdayBegin.getDate() - 1);
    yesterdayEnd.setHours(0, 0, 0, 0);
    yesterdayBegin.setHours(0, 0, 0, 0);
    let date = yesterdayBegin;

    const recentlyPlayedItems: RecentlyPlayedItem[] = (
      await spotifyApi.getMyRecentlyPlayedTracks({
        limit: 50,
        after: yesterdayBegin.getTime(),
      })
    ).body.items;

    if (recentlyPlayedItems.length === 0) {
      res.status(204);
      return res.end();
    }

    let dayItems = recentlyPlayedItems.filter(
      (item) => new Date(item.played_at).getTime() < yesterdayEnd.getTime()
    );
    if (dayItems.length === 0) {
      dayItems = recentlyPlayedItems;
      date = yesterdayEnd;
    }
    const songIds = dayItems.map(({ track }) => track.id);
    const count = dayItems.length;

    const audioFeatures: AudioFeatures[] = (
      await spotifyApi.getAudioFeaturesForTracks(songIds)
    ).body.audio_features;
    if (audioFeatures.length > 0 && audioFeatures[0] !== null) {
      const { mean, standardDeviation } =
        getMeanAndSdOfAllValues(audioFeatures);
      const moodCountTracks: { [key in keyof typeof MOOD]?: number } = {};

      for (const key of Object.keys(MOOD)) {
        moodCountTracks[key] = 0;
      }

      const mappedSongData = getSongData(
        audioFeatures,
        dayItems,
        moodCountTracks
      );
      // Calculate mean and SD
      const allArousalValues = mappedSongData.map((item) => item.arousal);
      const allValenceValues = mappedSongData.map((item) => item.valence);
      const moodMean = {
        arousal: getMean(allArousalValues),
        valence: getMean(allValenceValues),
      };
      const moodStandardDeviation = {
        arousal: getStandardDeviation(allArousalValues),
        valence: getStandardDeviation(allValenceValues),
      };

      const moodMeanAngle = getAngleDeg(moodMean.valence, moodMean.arousal);
      const moodMeanIntensity = getIntensity(
        moodMean.valence,
        moodMean.arousal
      );

      // get two moods from mean values
      let moods = [];
      const mood = getMood(moodMeanAngle, moodMeanIntensity);
      moods.push(generateMood(mood));
      moods.push(generateMood(mood));

      // get one mood from area with most songs and one sd mood
      const songMoodsSortedByCount = Object.keys(moodCountTracks).sort(
        (a, b) => moodCountTracks[b] - moodCountTracks[a]
      );
      const highestSongCountMood = moodCountTracks[songMoodsSortedByCount[0]];
      for (let key of songMoodsSortedByCount) {
        if (moodCountTracks[key] === highestSongCountMood) {
          moods.push(getRandomElement(MOODS[key]));
        } else {
          break;
        }
      }
      moods = [...moods, ...addSDMoods(moodMean, moodStandardDeviation)];

      const randomSongName =
        getRandomElement<RecentlyPlayedItem>(dayItems).track.name.split(
          "(feat."
        )[0];

      // Generate Image and diary entry
      /*const { diaryEntry, imageUrl } = await openAiController.generate(
        randomSongName,
        moods,
        me.display_name,
        res
      );*/

      res.status(200).json({
        me: {
          name: me.display_name,
          image: me.images[0]?.url,
        },
        mean,
        standardDeviation,
        moodData: removeDoublesAndAddCount(mappedSongData),
        moodMean,
        moodStandardDeviation,
        count,
        date,
        randomSongName,
        diaryEntry: "",
        imageUrl: "",
      });
      return res.end();
    } else {
      throw new Error("Audio Features request failed.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
    return res.end();
  }
};

const getSongData = (
  audioFeatures: AudioFeatures[],
  dayItems: RecentlyPlayedItem[],
  moodCountTracks: { [key in keyof typeof MOOD]?: number }
): MappedSongData[] => {
  return audioFeatures.map((song) => {
    const track = dayItems.find((item) => item.track.id === song.id).track;
    const arousal = 2 * song.danceability - 1; //scale to values from -1 to 1
    const valence = 2 * song.valence - 1;
    const angle = getAngleDeg(valence, arousal);
    const intensity = getIntensity(valence, arousal);

    const mood = getMood(angle, intensity);
    moodCountTracks[mood.mood] = moodCountTracks[mood.mood] + 1;

    return {
      arousal,
      valence,
      angle,
      intensity,
      name: track.name,
      artists: track.artists.map((artist) => artist.name),
      id: song.id,
      count: 1,
    };
  });
};
