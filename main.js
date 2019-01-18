require('dotenv').config();
const dailytext = require('@dillonchr/dailytext');
const maxWidth = 32;

const receiptFormatter = text => {
    const result = text
        .split('\n')
        .map(line => {
            if (line.length > maxWidth) {
                return line.split(' ').reduce((whole, word, i) => {
                    if (!i) {
                        return word;
                    }
                    const lastNewLine = whole.lastIndexOf('\n') !== -1 ? whole.lastIndexOf('\n') : 0;
                    const lengthSoFar = whole.substr(lastNewLine + 1).length;
                    const wouldBeNextLineLength = lengthSoFar + word.length + 1;
                    if (wouldBeNextLineLength > maxWidth) {
                        return `${whole}\n${word}`;
                    }
                    return `${whole} ${word}`;
                });
            }

            return line;
        })
        .join('\n');
    return result;
};

dailytext((err, text) => {
    console.log(text);
});

