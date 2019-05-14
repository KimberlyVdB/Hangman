import './style.css';
import React from 'react';
import Hangman from './Hangman'
import { renderWord, getRandomWord, done } from './words';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { word: getRandomWord(), guesses: [], progress: 0 };
    }

    pushGuess(button, e, word) {
        e.preventDefault();
        const guesses = [...this.state.guesses];
        guesses.push(button);
        this.setState({ guesses });
        if (!this.state.word.includes(button) && !done(this.state.word, this.state.guesses)) {
            this.setState({ progress: this.state.progress + 1 });
        }
    }

    disableBtn(btn) {
        if (this.state.progress > 5) {
            return true
        }
        if (done(this.state.word, this.state.guesses) === true) {
            return true
        } if (this.state.guesses.includes(btn)) {
            return true
        } else {
            return false
        }
    }

    restartGame(progress, word) {
        this.setState({ progress: 0, word: getRandomWord(), guesses: [] });
    }

    render() {
        const { word, guesses, progress } = this.state;
        const wordToRender = renderWord(word, guesses);
        const guessButtons = "abcdefghijklmnopqrstuvwxyz".split("")
        const buttons = guessButtons.map(button => {
            return <button ref="btn" key={button} disabled={this.disableBtn(button)} onClick={(e) => this.pushGuess(button, e)}>{button}</button>
        })
        const Layout = ({ children }) =>
            <div className="game">
                <h1>Are you ready to HANG (out)? <span role="img" aria-label="img">⚰️</span></h1>
                {children}
                <WordView renderWord={wordToRender} />
                {buttons}
                <button className="newGame" onClick={this.restartGame.bind(this)}>NEW GAME</button>
                <footer className="footer">
                    <p>Copyright by Sugarcube© powered by rainbows <span role="img" aria-label="img" >™🌈</span></p>
                </footer>
            </div>
        if (done(word, guesses)) {
            return <Layout><Hangman progress={progress} done={true} /></Layout>
        }
        else {
            return <Layout><Hangman progress={progress} done={false} /></Layout>
        }
    }

    componentDidMount() {
    }
}

function WordView(props) {
    return <p className='Word'>{props.renderWord}</p>;
}

export default App;
