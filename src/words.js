import words from './longwords.json'
import React from 'react';

export const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

export const renderWord = (word, guesses) => {

    const lettersOfWord = word.split("").map(letter => guesses.indexOf(letter) >= 0 ? letter : " _").join(' ');
    console.log(lettersOfWord);
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

function removeDoubles(letter, index, letters) {
    return letters.indexOf(letter) === index;
}

export const done = (word, guesses) => {
    //    guesses = guesses.filter(removeDoubles);
    const wordToGuess = word.split('').filter(removeDoubles);
    const goodGuesses = guesses.filter(function (guess) {
        return word.includes(guess);
    })
    const badGuesses = guesses.filter(function (guess, index, guesses) {
        return !word.includes(guess)
    });
    if (goodGuesses.length === wordToGuess.length) {
        return <h1>I guess we arent hanging out</h1>
    } else if (badGuesses.length >= 6) {
        return <h1>lol you died</h1>
    }
}
    //  return goodGuesses.length === wordToGuess.length || badGuesses.length >= 6;

//compair word with renderWord
