import words from './longwords.json'

export const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

export const renderWord = (word, guesses) => {
    const lettersOfWord = word.split("").map(letter => guesses.indexOf(letter) >= 0 ? letter : " _").join(' ');
    let answereArray = [];
    for (let i = 0; i < word.length; i++) {
        const letter = word[i]
        if (guesses.includes(letter)) {
            answereArray.push(letter);
        } else {
            answereArray.push(" _ ");
        }
    }
    return answereArray;
}

export const done = (word, guesses) => {
    const foo = renderWord(word, guesses).join('')
    if (word === foo)
        return true
}