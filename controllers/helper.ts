export const generateRandomString = (length: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const getMean = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

export const getStandardDeviation = (array: number[]) => {
    const mean = getMean(array);
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / array.length)
}

export const getHighestOccurrenceInArray = (array) => {
    const modeMap = {};
    let elementWithHighestOccurrence = array[0], highestCount = 1;
    array.forEach((el) => {
        modeMap[el] ? modeMap[el]++ : modeMap[el] = 1;
        if (modeMap[el] > highestCount) {
            elementWithHighestOccurrence = el;
            highestCount = modeMap[el];
        }
    })
    return elementWithHighestOccurrence;
}