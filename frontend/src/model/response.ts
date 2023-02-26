import type { MappedSongData } from "../../../shared/model";

export interface TrackFeatures {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

export interface Response {
  me: {
    name: string;
    image?: string;
  };
  mean: TrackFeatures;
  standardDeviation: TrackFeatures;
  count: number;
  date: string;
  randomSongName: string;
  diaryEntry: string;
  imageUrl: string;
  moodData: MappedSongData[];
  moodMean: { valence: number; arousal: number };
  moodStandardDeviation: { valence: number; arousal: number };
}
