import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBAnimation, MDBContainer, MDBSwitch } from "mdbreact"
import './LearningSession.css';
import '../../App.css';
import AlertMessage from '../../components/Alert';
import VisualizerComponent from '../../components/Visualization';
import { Songs } from '../../songs';
import Modal from '../../components/modal';
import { connect } from 'react-redux';
import CatScreaming from '../../Musics/cat-screaming.wav';
import GoodSound from '../../Musics/good.wav';
import MasteredSound from '../../Musics/mastered.wav';
import PurrrSound from '../../Musics/purrr.wav';

class LearningSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentences: [], // separated sentences
            showSection: 1, // show respective containers
            hideReady: false, // Show Ready text
            sentenceIndex: 0, // Sentence index shows the current sentence
            inputWord: '', // the input which user is answering while learning

            per: ['perfect', 'amazing', 'flawless'],
            selectedNote: "",

            //Here is the counter of flashes and length of the first flash states
            count: 1,
            countsec: 200,
            perfect: false,
            inputHidden: true,
            againHidden: true,
            showWord: false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            color: "white",
            tryAgain: false,
            in: 0,
            te: false,
            flashCount: 1,

            againSentenceMessage: false,
            flashBannerTiming: 3000, // Flash one don't blink text banner timing
            inputStyle: {
                color: 'black'
            },
            alert: '',
            textToLearn: '',
            hardMode: false,

            playSound: false,
        }
        this.CatScreaming = new Audio(CatScreaming); // This audio for black input
        this.PurrrSound = new Audio(PurrrSound); // This audio for blue input
        this.GoodSound = new Audio(GoodSound); // this for good
        this.MasteredSound = new Audio(MasteredSound); // this for mastered
    }

    componentDidMount() {
        const { sentences } = this.props;
        this.setState({ sentences });
    }
    play(musicName){
        this[musicName].play();
        setTimeout(() => {
            this[musicName].pause();
            this[musicName].currentTime = 0;
        }, 1200)
      }

    learnAgain = () => {

        this.setState({
            sentences: this.props.sentences || [], // separated sentences
            showSection: 1, // show respective containers
            hideReady: true, // Show Ready text
            sentenceIndex: 0, // Sentence index shows the current sentence
            inputWord: '', // the input which user is answering while learning

            per: ['perfect', 'amazing', 'flawless'],
            selectedNote: "",

            //Here is the counter of flashes and length of the first flash states
            count: 1,
            countsec: 200,
            perfect: false,
            inputHidden: true,
            againHidden: true,
            showWord: false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            color: "white",
            tryAgain: false,
            in: 0,
            te: false,
            flashCount: 1,

            againSentenceMessage: false,
            flashBannerTiming: 3000 // Flash one don't blink text banner timing
        })
    }

    splitSentences = () => {
        let { inputValue } = this.state;
        if (inputValue.length === 0) {
            this.setState({ alert: 'Please add some text or paste it' });
            setTimeout(() => this.setState({ alert: '' }), 1000)
            return;
        }
        let sentences = [];
        let signs = ['\n', '?', '.', '!', ','];
        for (let j = 0; j < inputValue.length; j++) {
            const letter = inputValue[j];
            if (signs.includes(letter)) {
                const index = inputValue.indexOf(letter) + 1;
                const newSentence = inputValue.slice(0, index);
                let removeExtraSigns = newSentence;
                for (let i = index; i < inputValue.length; i++) {
                    if (signs.includes(inputValue[i])) {
                        removeExtraSigns += inputValue[i]
                    } else {
                        break;
                    }
                }
                j = 0;
                inputValue = inputValue.replace(removeExtraSigns, '');
                if (newSentence.trim()) {
                    sentences.push({ sentence: newSentence.trim(), mastered: null, tried: false });
                }
            } else if (j === inputValue.length - 1) {
                const newSentence = inputValue.slice(0, inputValue.length);
                if (newSentence.trim()) {
                    sentences.push({ sentence: newSentence.trim(), mastered: null, tried: false });
                }
            }
        }
        this.setState({ sentences });
        this.props.setSentences(sentences);
    }

    readyLearningSession = () => {
        this.setState({ hideReady: true });
        setTimeout(() => {
            this.setState({ showSection: 2 });
            this.calculateFlashTiming();
        }, this.state.flashBannerTiming)
    }

    calculateFlashTiming = () => {
        const { sentences, sentenceIndex } = this.state;
        setTimeout(() => {
            this.setState({ showSection: 3 });
            this.setState({
                clickedReady: true,
                selectedEnd: this.state.per[Math.floor(Math.random() *
                    this.state.per.length)],
                inputHidden: false,
                hideReady: true,
                perfect: false,
                inputWord: '',
                showWord: false,
                timerOn: true,
                timerTime: this.state.timerTime,
                timerStart: Date.now() - this.state.timerTime

            })
            this.timer = setInterval(() => {
                this.setState({
                    timerTime: Date.now() - this.state.timerStart
                });
            }, 10);
            // const s = this.state.sentences.length
            // if (s === this.state.in) {

            // } else {
            this.setState({
                in: this.state.in + 1,
                selectedNote: this.state.sentences[sentenceIndex].sentence,
                // selectedNote: this.state.sentences[Math.floor(this.state.in)],
            })
            // }
        }, sentences[sentenceIndex].sentence.length * 30) // milliseconds on each word in flash 
    }

    handleInputWord = e => {
        const { sentences, sentenceIndex, selectedNote, count, hardMode } = this.state;
        //Here is the color validaiton(don't touch anything here)
        let inputStyle = {
            color: 'black',
        };
        let inputText = e.target.value; //.trim().split(" ");
        let yellowColorExist = false;

        for (var i = 0; i < inputText.length; i++) {
            // if (this.state.selectedNote.toLowerCase().includes(inputText[i].toLowerCase()) === true) {
                // if (e.target.value.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])) {
                if (inputText[i] === this.state.selectedNote[i]) {
                    if (!yellowColorExist) {
                        inputStyle = {
                            color: 'blue'
                        };
                    }
                } else if (inputText[i].toLowerCase() === this.state.selectedNote[i].toLowerCase()) {
                    inputStyle = {
                        color: hardMode ? 'blue' : 'yellow'
                    };
                    yellowColorExist = true;
                } else {
                    inputStyle = {
                        color: 'black'
                    };
                    break;
                }
            // } else {
            //     inputStyle = {
            //         color: 'black'
            //     };
            //     break;
            // }
        }
        if (inputStyle.color === 'blue') {
            this.play('PurrrSound');
        // } else if (inputStyle.color === 'yellow') {
        //     this.play();
        } else {
            this.play('CatScreaming');
        }
        if (e.target.value === selectedNote) {
            let index = sentenceIndex + 1;
            let isFlashUsed = count > 1;
            if (isFlashUsed) {
                const repeatSentence = sentences.splice(sentenceIndex, 1)[0];
                repeatSentence.mastered = false;
                repeatSentence.tried = true;
                sentences.push(repeatSentence);
                index -= 1;
                this.play('GoodSound');
            } else if (sentences[sentenceIndex]) {
                sentences[sentenceIndex].mastered = true;
                sentences[sentenceIndex].tried = true;
                this.play('MasteredSound');
            }
            this.setState({
                perfect: true,
                inputWord: e.target.value,
                timerOn: false,
                showSection: 4,
                sentences,
                sentenceIndex: index,
                againSentenceMessage: isFlashUsed,
                inputStyle
            })
            clearInterval(this.timer);
            if (sentences[index] === undefined) {
                setTimeout(() => {
                    this.props.history.push('result-page');
                }, 4000)
            }
        } else {
            this.setState({
                againHidden: false,
                inputWord: e.target.value,
                inputStyle
            })
        }
    }

    handleAgain = () => {
        this.setState({ showSection: 1, flashCount: this.state.flashCount + 1 })
        setTimeout(() => {
            //Here is the counter of flashes and length of the first flash logic
            var inc = 200 + this.state.countsec
            setTimeout(() => {
                this.setState({
                    showSection: 3,
                })
            }, inc)
            this.setState({
                count: this.state.count + 1,
                countsec: this.state.countsec + 300,
                showSection: 2,
            })
        }, this.state.flashBannerTiming)
    }

    resetState = () => {
        this.setState({
            selectedNote: "",
            clickedReady: false,
            inputWord: '',
            count: 1,
            perfect: false,
            inputHidden: true,
            againHidden: true,
            showWord: false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            countsec: 200,
            spans: [],
            showSection: 1,
            hideReady: false,
            flashCount: 1,
            againSentenceMessage: false
        })
    }

    render() {
        const {
            showSection,
            hideReady,
            sentences,
            sentenceIndex,
            inputWord,
            timerTime,
            flashCount,
            inputStyle,
            againSentenceMessage,
            hardMode
        } = this.state;

        // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let second = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minute = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        // let hour = ("0" + Math.floor(timerTime / 3600000)).slice(-2);


        let [notTriedSentencesCount, notMasteredCount, masteredCount] = [0, 0, 0];
        sentences.forEach(obj => {
            if (!obj.tried) {
                ++notTriedSentencesCount;
            } else {
                if (obj.mastered) {
                    ++masteredCount;
                } else if (obj.mastered === false) {
                    ++notMasteredCount;
                }
            }
        })

        return (
            <MDBContainer className="main_container">
                {this.state.alert.length > 0 ? <AlertMessage message={this.state.alert} /> : null}

                <h2 className="ready" onClick={this.readyLearningSession} hidden={this.state.hideReady}>Ready?</h2>

                {/* First flash section */}
                {showSection === 1 && hideReady && <div className="os-phrases">
                    <h2 style={{ cursor: "pointer" }}>flash {flashCount}</h2>
                </div>}

                {/* Question section */}
                {showSection === 2 && hideReady && <div>
                    {/* <h1 className="pb-2" style={{ position: "fixed", left: '0', right: 0, top: '15rem', bottom: 0, textAlign: 'center', margin: '0 auto', zIndex: 9999, fontSize: "2rem" }}>{sentences[sentenceIndex].sentence}</h1> */}
                    <h1 className="pb-2" style={{ fontSize: "2rem", textAlign: 'center' }}>{sentences[sentenceIndex].sentence}</h1>
                </div>}

                {/* Count Section */}
                {showSection !== 2 && showSection !== 1 && <>
                    <h2 className="left_count"> {this.state.count} &nbsp;<small>{this.state.countsec / 1000}s</small></h2>
                    <div className="right_count">
                        <h2>{notTriedSentencesCount} &nbsp;{notMasteredCount} &nbsp;{masteredCount}/{sentences.length}</h2>
                        <div className='custom-control custom-switch'>
                            <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitches'
                                checked={hardMode}
                                onChange={() => this.setState({hardMode: !hardMode})}
                                readOnly
                            />
                            <label className='custom-control-label' htmlFor='customSwitches'>
                                Hard Mode
                            </label>
                        </div>
                    </div>
                </>}

                {/* Answering section */}
                {showSection === 3 && hideReady && <div>
                    {/* <h2 className="count"> {this.state.count} &nbsp; &nbsp; <small>{this.state.countsec / 1000}s</small></h2> */}
                    <MDBInput className="text-center input-container" autoFocus style={inputStyle} value={inputWord} type="text" onChange={(e) => this.handleInputWord(e)} size="lg" />
                    <h3 className="text-center pt-2 mb-2" style={{ cursor: "pointer" }} onClick={this.handleAgain}>one more flash</h3>
                </div>}

                {this.state.perfect && hideReady && <div className="text-center">
                    {/* <div className="count">
                        <h2>
                            {notTriedSentencesCount} {notMasteredCount} {masteredCount}/{sentences.length}
                        </h2>
                    </div> */}
                    <MDBInput type="text" className="text-center input-container" style={inputStyle} value={this.state.inputWord} onChange={(e) => this.handleInputWord(e)} size="lg" />
                    <h2>Good</h2>
                    {/* <h2>{this.state.selectedEnd}</h2>
                    {againSentenceMessage && <h2>but you'll see it again soon</h2>} */}
                    <div className="bottom_message">
                        {againSentenceMessage ? <>
                            <h4>you will see this sentence again</h4>
                            <h4>rewrite it with only 1 flash to master it</h4>
                        </> : <h4>mastered!</h4>}
                    </div>

                    <MDBAnimation type="fadeIn" duration="1s" delay="2s">
                        {/* Here is the counter of flashes */}
                        <h4 className="p-2">You needed {this.state.count} flashes</h4>
                        <h4 className="p-2">It took you {(minute * 60) + Number(second)} seconds</h4>
                        {sentences[sentenceIndex] !== undefined ? <>
                            {/* <h2>{notTriedSentencesCount} new more sentences, {notMasteredCount} to repeat, {masteredCount} out of {sentences.length} mastered”</h2> */}
                            <MDBBtn outline={true} color="black" style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={this.resetState}>Next Sentence</MDBBtn>
                        </> :
                            <div>
                                {/* <h4 style={{ cursor: "pointer" }}>Good Job</h4> */}
                                <h4 style={{ cursor: "pointer" }}>you have learned {sentences.length} {sentences.length > 0 ? 'sentences' : 'sentence'}!</h4>
                                <MDBBtn color="success" outline={true} onClick={() => this.learnAgain()}>Learn it!</MDBBtn>
                            </div>}
                    </MDBAnimation>
                </div>}

            </MDBContainer>
        )
    }
}


const mapStateToProps = state => ({
    sentences: state.sentences
})


export default connect(mapStateToProps)(LearningSession);