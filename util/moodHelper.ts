import {
  constantMoodsHighArousal,
  constantMoodsLowArousal,
  MOOD,
  MOODS,
  stableMoodsNegative,
  stableMoodsPositive,
  temperamentalMoodsNegative,
  temperamentalMoodsPositive,
  volatileMoodsHighArousal,
  volatileMoodsLowArousal,
} from "../constants/moods";
import { getRandomElement } from "./helper";

export enum INTENSITY {
  LOW,
  NEUTRAL,
  HIGH,
}

export const generateMood = ({
  intensity,
  mood,
}: {
  intensity: INTENSITY;
  mood: MOOD;
}) =>
  `${
    intensity === INTENSITY.HIGH
      ? "extremely "
      : intensity === INTENSITY.LOW
      ? "slightly "
      : ""
  }${getRandomElement(MOODS[mood])}`;

export const getMood = (
  angle: number,
  intensity: number
): { intensity: INTENSITY; mood: MOOD } => {
  if (angle >= 0 && angle < 90) {
    return getMoodHappyAwake(angle, intensity);
  } else if (angle >= 90 && angle < 180) {
    return getMoodSadAwake(angle - 90, intensity);
  } else if (angle >= 180 && angle < 270) {
    return getMoodSadBored(angle - 180, intensity);
  } else {
    return getMoodHappyBored(angle - 270, intensity);
  }
};

const initMood = (intensity: number) => ({
  mood: undefined,
  intensity:
    intensity < 0.3
      ? INTENSITY.LOW
      : intensity > 0.7
      ? INTENSITY.HIGH
      : INTENSITY.NEUTRAL,
});
const getAngleMoods = (
  angle: number,
  low: MOOD,
  middle: MOOD,
  high: MOOD
): MOOD => (angle < 30 ? low : angle < 60 ? middle : high);
export const getMoodHappyAwake = (
  angle: number,
  intensity: number
): {
  mood: MOOD;
  intensity: INTENSITY;
} => {
  let mood = initMood(intensity);
  mood.mood = getAngleMoods(angle, MOOD.PLEASED, MOOD.HAPPY, MOOD.EXCITED);
  return mood;
};

export const getMoodSadAwake = (
  angle: number,
  intensity: number
): {
  mood: MOOD;
  intensity: INTENSITY;
} => {
  let mood = initMood(intensity);
  mood.mood = getAngleMoods(angle, MOOD.MAD, MOOD.ANGRY, MOOD.NERVOUS);
  return mood;
};

export const getMoodSadBored = (
  angle: number,
  intensity: number
): {
  mood: MOOD;
  intensity: INTENSITY;
} => {
  let mood = initMood(intensity);
  mood.mood = getAngleMoods(angle, MOOD.SAD, MOOD.BORED, MOOD.SLEEPY);
  return mood;
};

export const getMoodHappyBored = (
  angle: number,
  intensity: number
): {
  mood: MOOD;
  intensity: INTENSITY;
} => {
  let mood = initMood(intensity);
  mood.mood = getAngleMoods(angle, MOOD.CALM, MOOD.PEACEFUL, MOOD.RELAXED);
  return mood;
};

export const addSDMoods = (
  moodMean: { valence: number; arousal: number },
  moodStandardDeviation: { valence: number; arousal: number }
): string[] => {
  const moods = [];
  if (moodStandardDeviation.arousal > 0.2) {
    moods.push(
      getRandomElement(
        moodMean.arousal >= 0
          ? volatileMoodsHighArousal
          : volatileMoodsLowArousal
      )
    );
  } else if (moodStandardDeviation.arousal < 0.1) {
    moods.push(
      getRandomElement(
        moodMean.arousal >= 0
          ? constantMoodsHighArousal
          : constantMoodsLowArousal
      )
    );
  }
  if (moodStandardDeviation.valence > 0.2) {
    moods.push(
      getRandomElement(
        moodMean.valence >= 0
          ? temperamentalMoodsPositive
          : temperamentalMoodsNegative
      )
    );
  } else if (moodStandardDeviation.arousal < 0.1) {
    moods.push(
      getRandomElement(
        moodMean.valence >= 0 ? stableMoodsPositive : stableMoodsNegative
      )
    );
  }
  return moods;
};
