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

const centerLine = (line) => {
    const empties = maxWidth - line.length;
    const prefix = new Array(empties >> 1).fill(' ').join('');
    return `${prefix}${line}`;
};

dailytext((err, text) => {
    const pieces = [];
    const lineBreak = new Array(maxWidth).fill('-').join('');
    pieces.push(centerLine(text.date));
    pieces.push(lineBreak);
    pieces.push('');
    pieces.push(receiptFormatter(text.themeScripture));
    pieces.push('');
    pieces.push(centerLine(text.themeScriptureLocation));
    pieces.push(lineBreak);
    pieces.push('');
    pieces.push(receiptFormatter(text.comments));
    console.log(pieces.join('\n'));
});

