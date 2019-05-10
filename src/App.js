import './style.css';
import React from 'react';
import Hangman from './Hangman'
import { renderWord, getRandomWord, done } from './words';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { word: null, guesses: [], progress: null };
        this.pushGuess = this.pushGuess.bind(this)
    }

    pushGuess(button, e, word) {
        e.preventDefault();
        // done(this.state.word, this.state.guesses);
        this.state.guesses.push(button);
        console.log(this.state.guesses);
        if (!this.state.word.includes(button)) {
            return this.setState({ progress: this.state.progress + 1 });
        }
        // if (this.state.progress === 6) {
        //     document.getElementsByTagName("button").disabled = true;
        // }
    }

    componentWillMount() {
        this.setState({ word: getRandomWord() })
    }

    render() {
        const { word, guesses } = this.state;
        const wordToRender = renderWord(word, guesses);
        const guessButtons = "abcdefghijklmnopqrstuvwxyz".split("")
        const buttons = guessButtons.map(button => {
            return <button key={button} onClick={(e) => this.pushGuess(button, e)}>{button}</button>
        })

        return <div className="game">
            <h1>Are you ready to HANG (out)? <span>⚰️</span></h1>
            <Hangman progress={this.state.progress} />
            <WordView renderWord={wordToRender} />
            {buttons}
            <br></br>
            {/* button to start new game */}
            <button className="newGame">NEW GAME</button>
            <footer className="footer">
                <p>Copyright by Sugarcube© powered by unicorns™🦄</p>
            </footer>
        </div>;
    }

    componentDidMount() {

    }
}

function WordView(props) {
    return <p className='Word'>{props.renderWord}</p>;
}

export default App;
