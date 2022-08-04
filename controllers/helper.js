module.exports.generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports.getHighestOccurrenceInArray = (array) => {
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