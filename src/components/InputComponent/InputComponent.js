import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBAnimation } from "mdbreact"
import './input.css';
import '../../App.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '', // Paragraph input in which user add paragrah to learn
            sentences: [], // separated sentences
            showSection: 0, // show respective containers
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
            flashBannerTiming: 3800 // Flash one don't blink text banner timing
        }
    }

    learnIt = () => {
        const { inputValue } = this.state;
        const arrayOfSentences = inputValue.split('\n');
        let sentences = [];
        arrayOfSentences.forEach(val => {
            const sentence = val.trim();
            if (sentence) {
                sentences.push(sentence);
            }
        });
        this.setState({ sentences });
        console.log(sentences);
    }

    detectSign = () => {
        const { sentences } = this.state;
        if (sentences.length === 0) {
            alert('Please split it first');
            return;
        }
        let createMultipleSentences = [...sentences];
        let signs = ['?', '.', '!'];
        signs.forEach(sign => {
            createMultipleSentences.forEach((sentence, index) => {
                if (sentence.includes(sign)) {
                    let sentenceList = sentence.split(sign);
                    let sentencesToAdd = [];
                    if (sentenceList.length > 1) {
                        sentenceList.forEach((sent, i) => {
                            if (sent.trim() && sent.trim().length > 2) {
                                if (i === sentenceList.length - 1) {
                                    sentencesToAdd.push(sent.trim());
                                } else {
                                    sentencesToAdd.push(sent.trim() + sign);
                                }
                            }
                        })
                        console.log(sentencesToAdd, sign);
                        createMultipleSentences.splice(index, 1);
                        sentencesToAdd.forEach(value => createMultipleSentences.splice(index, 0, value))
                    }
                }
            })
        })
        console.log(createMultipleSentences);
        this.setState({ sentences: createMultipleSentences })
    }

    startLearning = () => {
        if (this.state.sentences.length === 0) {
            alert('Please split it first');
        } else {
            this.setState({ showSection: 1, hideReady: false })
        }
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
                hideReadys: true,
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
            const s = this.state.sentences.length
            if (s === this.state.in) {

            } else {
                this.setState({
                    in: this.state.in + 1,
                    selectedNote: this.state.sentences[sentenceIndex],
                    // selectedNote: this.state.sentences[Math.floor(this.state.in)],
                })
            }
        }, sentences[sentenceIndex].length * 20)
    }

    handleInputWord = e => {
        const { sentences, sentenceIndex, selectedNote, count } = this.state;
        if (e.target.value === selectedNote) {
            let index = sentenceIndex + 1;
            let isFlashUsed = count > 1;
            if (isFlashUsed) {
                const repeatSentence = sentences.splice(sentenceIndex, 1);
                sentences.push(...repeatSentence);
                index -= 1;
            }
            console.log(index, sentences);
            this.setState({
                perfect: true,
                inputWord: e.target.value,
                timerOn: false,
                showSection: 4,
                sentences,
                sentenceIndex: index,
                againSentenceMessage: isFlashUsed,
            })
            clearInterval(this.timer);
        } else {
            this.setState({
                againHidden: false,
                inputWord: e.target.value
            })
        }
    }

    handleAgain = () => {
        console.log(this.state.sentenceIndex);
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
            hideReadys: false,
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
            inputValue,
            showSection,
            hideReady,
            sentences,
            sentenceIndex,
            inputWord,
            timerTime,
            flashCount,
            againSentenceMessage
        } = this.state;
        // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let second = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minute = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        // let hour = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

        //Here is the color validaiton(don't touch anything here)

        let inputStyle = {
            color: 'white',
            width: '1000px'
        };
        let inputText = this.state.inputWord.split(" ")

        for (var i = 0; i < inputText.length; i++) {
            if (this.state.selectedNote.includes(inputText[i]) === true) {

                if (this.state.inputWord.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])) {
                    inputStyle = {
                        color: 'blue'
                    };
                } else {
                    inputStyle = {
                        color: 'yellow'
                    };
                }
            } else {
                inputStyle = {
                    color: 'white'
                };
            }
        }
        return (
            <div>
                {showSection === 0 && <div>
                    <MDBInput
                        type="textarea"
                        autoFocus
                        size="lg"
                        className="text-center inputStyle"
                        value={inputValue}
                        placeholder="Paste your text you want to learn. Press “split” and then “learn it!”"
                        onChange={event => this.setState({ inputValue: event.target.value })}
                    />
                    <div className="buttonsContainer">
                        <MDBBtn color="primary" outline onClick={() => this.detectSign()}>Detect Sign</MDBBtn>
                        <MDBBtn color="primary" outline onClick={() => this.learnIt()}>Split</MDBBtn>
                    </div>
                    <div className="success_btn">
                        <MDBBtn color="success" outline onClick={() => this.startLearning()}>Learn it!</MDBBtn>
                    </div>
                </div>}
                <h2 style={{ cursor: "pointer" }} onClick={this.readyLearningSession} hidden={this.state.hideReady}>Ready?</h2>

                {/* First flash section */}
                {showSection === 1 && hideReady && <div className="os-phrases">
                    <h2 style={{ cursor: "pointer" }}>flash {flashCount} do not blink</h2>
                </div>}

                {/* Question section */}
                {showSection === 2 && hideReady && <div>
                    <h2 style={{ cursor: "pointer" }}>{sentences[sentenceIndex]}</h2>
                </div>}

                {/* Answering section */}
                {showSection === 3 && hideReady && <div>
                    <h2 className="count"> {this.state.count} <small>{this.state.countsec / 1000}s</small></h2>
                    <MDBInput className="text-center" autoFocus style={inputStyle} value={inputWord} type="text" onChange={(e) => this.handleInputWord(e)} size="lg" />
                    <h2 className="text-center pt-2 mb-2" style={{ cursor: "pointer" }} onClick={this.handleAgain}>one more flash?</h2>
                </div>}

                {this.state.perfect && <div className="text-center">
                    <MDBInput type="text" className="text-center" style={inputStyle} value={this.state.inputWord} onChange={(e) => this.handleInputWord(e)} size="lg" />
                    <h2>{this.state.selectedEnd}</h2>
                    {againSentenceMessage && <h2>but you'll see it again soon</h2>}
                    <MDBAnimation type="fadeIn" duration="1s" delay="2s">
                        {/* Here is the counter of flashes */}
                        <h2 className="p-2">{this.state.count} flashes, {minute}:{second} Seconds</h2>
                        {sentences[sentenceIndex] !== undefined ?
                            <h2 style={{ cursor: "pointer" }} onClick={this.resetState}>I want more</h2> :
                            <div>
                                <h2 style={{ cursor: "pointer" }}>Good Job</h2>
                                <h2 style={{ cursor: "pointer" }}>you learnt {sentences.length} sentences!</h2>
                            </div>}
                    </MDBAnimation>
                </div>}
            </div>
        )
    }
}

