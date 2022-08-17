import type { TrackFeatures } from "@/model/diaryData";

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const positiveEvents = [
  "I think I met someone special.",
  "Finally I could confide in someone.",
  "A person close to me gave me a very good feeling.",
  "I have received recognition and respect from my peers for my accomplishments.",
  "I had a good conversation.",
  "I have found again something I thought lost.",
  "Long efforts on my part are finally tipped for success."
];
const negativeEvents = [
  "Work and private life were in tension on this day.",
  "I have kept my problems to myself for too long.",
  "I have had a mishap that I now have to deal with.",
  "I had a bad conversation today.",
  "It seems to me that no one sees my efforts and endeavors.",
  "I had a very difficult decision to make.",
  "I forgot one important thing and now I feel bad."
];

export const generateDiaryText = (
  mean: TrackFeatures,
  standardDeviation: TrackFeatures
) =>
  `Today was a${
    mean.valence > 0.8 || mean.valence < 0.2 ? "n extremely" : " rather"
  } 
    ${mean.valence > 0.5 ? "positive" : "negative"} day, 
    ${
      standardDeviation.valence > 0.3
        ? "my mood changed constantly."
        : "my mood was quite balanced."
    }
    ${
      mean.valence > 0.5
        ? getRandomElement<string>(positiveEvents)
        : getRandomElement<string>(negativeEvents)
    }
    ${
      mean.energy > 0.7
        ? "Additionally, I had a lot of energy and was very active" +
          (standardDeviation.energy > 0.25 ? " but also tired sometimes." : ".")
        : mean.energy < 0.3
        ? "Additionally, I did not have much energy, I was limp and unmotivated" +
          (standardDeviation.energy > 0.25
            ? " but also energetic sometimes."
            : ".")
        : ""
    }
    ${
      mean.loudness > -5
        ? "I really had to release pressure sometimes."
        : mean.loudness < -10
        ? "I had little pressure to cope."
        : ""
    }
    ${
      mean.danceability > 0.7
        ? "Also, I longed to dance and party" +
          (standardDeviation.danceability > 0.25
            ? " from time to time."
            : " all day long.")
        : mean.danceability < 0.3
        ? "Also, I really did not feel like celebrating today."
        : ""
    }
    ${
      mean.tempo > 140
        ? "The day flew by."
        : mean.tempo < 100
        ? "I was very bored and slow like a sloth."
        : ""
    }
    ${
      mean.acousticness > 0.7
        ? "Moreover, I was in the here and now with a clear mind."
        : mean.acousticness < 0.3
        ? "Moreover, everything felt unreal like a dream."
        : ""
    }
    ${
      mean.instrumentalness > 0.5
        ? "I worried a lot about things I can't change."
        : "I had few thoughts or worries."
    }
    ${
      mean.duration_ms > 300000
        ? "Furthermore, I could concentrate on one thing for a long time and was not easily distracted."
        :  mean.duration_ms < 180000
        ? "Furthermore, my attention span was rather limited and I was easily distracted."
        : ""
    }`;
