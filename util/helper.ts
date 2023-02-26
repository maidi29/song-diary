import {AudioFeatures} from "../controllers/SpotifyController";

export const generateRandomString = (length: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const getMean = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

// standard deviation = sqrt(sum((x - mean)^2) / n)
export const getStandardDeviation = (array: number[]) => {
    const mean = getMean(array);
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / array.length)
}

export const getHighestOccurrenceInArray = (array) => {
    const modeMap = {};
    let elementWithHighestOccurrence = array[0]
    let highestCount = 1;
    array.forEach((el) => {
        modeMap[el] ? modeMap[el]++ : modeMap[el] = 1;
        if (modeMap[el] > highestCount) {
            elementWithHighestOccurrence = el;
            highestCount = modeMap[el];
        }
    })
    return elementWithHighestOccurrence;
}

export const getRandomElement = <T>(array: T[]): T => array[Math.floor(Math.random()*array.length)];


export const getMeanAndSdOfAllValues = (audioFeatures: AudioFeatures[]): {mean: number, standardDeviation: number} => {
    const data = audioFeatures.map(({type, id, uri, analysis_url, track_href, ...keep}) => keep);
    const means = Object.keys(data[0]).map((key) => ({
        [key]: getMean(data.map((item)=>item[key]))
    }))
    const standardDeviations = Object.keys(data[0]).map((key) => ({
        [key]: getStandardDeviation(data.map((item)=>item[key]))
    }));
    const mean = Object.assign({}, ...means);
    const standardDeviation = Object.assign({}, ...standardDeviations);
    return {
        mean,
        standardDeviation
    }
}

export const removeDoublesAndAddCount = <T extends {id: string}>(array: T[]): T[] => {
    return Object.values(array.reduce((acc, obj) => {
        const { id, ...rest } = obj;
        const existingObj = acc[id];
        if (existingObj) {
            existingObj.count++;
        } else {
            acc[id] = { id, count: 1, ...rest };
        }
        return acc;
    }, {}));
}

// x = arousal, y = valence,
// 0 = (1,0), 90 = (0, 1), 180=(0,-1), 270 = (-1,0)
export const getAngleDeg = (x: number, y: number): number => {
    let angle = Math.atan2(y, x);
    if (angle < 0) {
        angle = angle + 2 * Math.PI
    }
    return angle * 180 / Math.PI;
}

// max. 1.4142135623730951
export const getIntensity = (x: number, y: number): number => Math.hypot(x, y);
