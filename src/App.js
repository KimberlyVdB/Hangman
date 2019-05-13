import './style.css';
import React from 'react';
import Hangman from './Hangman'
import { renderWord, getRandomWord, done } from './words';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { word: getRandomWord(), guesses: [], progress: 0, done: false, };
        //     this.state = {
        //         disabled: false
        //     };
    }

    pushGuess(button, e, word) {
        e.preventDefault();
        // done(this.state.word, this.state.guesses);
        const guesses = [...this.state.guesses];
        guesses.push(button);
        this.setState({ guesses });
        if (!this.state.word.includes(button)) {
            return this.setState({ progress: this.state.progress + 1 });
        }
        // this.youWon()
    }

    // disableButton(btn){
    // 	document.getElementById(btn.id).disabled = true;
    // }

    restartGame(progress, word) {
        this.setState({ progress: 0, word: getRandomWord(), guesses: [], done: false });
    }

    // disabled={!enabled} ???

    render() {
        const { word, guesses, progress } = this.state;
        const wordToRender = renderWord(word, guesses);
        const guessButtons = "abcdefghijklmnopqrstuvwxyz".split("")
        const buttons = guessButtons.map(button => {
            return <button ref="btn" key={button} onClick={(e) => this.pushGuess(button, e)}>{button}</button>
        })
        const Layout = ({ children }) => // destructured assignment
            <div className="game">
                <h1>Are you ready to HANG (out)? <span role="img" aria-label="img">⚰️</span></h1>
                <Hangman progress={this.state.progress} />
                <WordView renderWord={wordToRender} />
                {buttons}
                <button className="newGame" onClick={this.restartGame.bind(this)}>NEW GAME</button>
                <footer className="footer">
                    <p>Copyright by Sugarcube© powered by rainbows <span role="img" aria-label="img" >™🌈</span></p>
                </footer>
            </div>
        if (done(word, guesses)) {
            return <Layout><Hangman progress={this.state.progress} done={true} /></Layout>
        } if (progress > 5) {
            return <Layout><Hangman progress={this.state.progress} /></Layout>
        } else {
            return <Layout><Hangman progress={this.state.progress} /></Layout>
        }

        //     const wordToRender = renderWord(word, guesses);
        //     const guessButtons = "abcdefghijklmnopqrstuvwxyz".split("")
        //     const buttons = guessButtons.map(button => {
        //         return <button ref="btn" key={button} onClick={(e) => this.pushGuess(button, e)}>{button}</button>
        //     })

        //     return <div className="game">
        //         <h1>Are you ready to HANG (out)? <span role="img" aria-label="img">⚰️</span></h1>
        //         <Hangman progress={this.state.progress} win={this.state.win} />
        //         <WordView renderWord={wordToRender} />
        //         {buttons}
        //         <br></br>
        // <button className="newGame" onClick={this.restartGame.bind(this)}>NEW GAME</button>
        // <footer className="footer">
        //             <p>Copyright by Sugarcube© powered by rainbows <span role="img" aria-label="img" >™🌈</span></p>
        //         </footer>
        //     </div>;
    }

    componentDidMount() {

    }
}

function WordView(props) {
    return <p className='Word'>{props.renderWord}</p>;
}

export default App;
