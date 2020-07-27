import React, { Component } from 'react';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBListGroup, MDBListGroupItem } from "mdbreact"
import ReactTooltip from "react-tooltip";
import { Link } from 'react-router-dom'
import './LearningSession.css';
import '../../App.css';
import AlertMessage from '../../components/Alert';
import { connect } from 'react-redux';
import CatScreaming from '../../Musics/cat-screaming.wav';
import GoodSound from '../../Musics/good.wav';
import MasteredSound from '../../Musics/mastered.wav';
import PurrrSound from '../../Musics/purrr.wav';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setSentences, setMode } from '../../store/sentences/action'
import { Instruction } from './instruction';
import { Navbar } from '../../components/navbar';

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
            countsec: 0,
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
            skipCount: 0,
            againSentenceMessage: false,
            flashBannerTiming: 2000, // Flash one don't blink text banner timing
            inputStyle: {
                color: 'black'
            },
            alert: '',
            textToLearn: '',
            enableColor: false,
            enableSound: false,
            startLearning: true,
            playSound: false,
            sentenceSkipped: 0,
            HideAll: false,
            spellCheck: false
        }
        this.CatScreaming = new Audio(CatScreaming); // This audio for black input
        this.PurrrSound = new Audio(PurrrSound); // This audio for blue input
        this.GoodSound = new Audio(GoodSound); // this for good
        this.MasteredSound = new Audio(MasteredSound); // this for mastered
    }

    componentDidMount() {
        const { sentences } = this.props;
        if (sentences && sentences.length > 0) {
            this.setState({ sentences });
        } else {
            this.props.history.push('/')
        }
        setTimeout(() => {
            this.setState({ startLearning: false });
        }, 6000)
    }
    checkInputColor = enableColor => {
        const { inputWord, selectedNote } = this.state;
        let inputStyle = {
            color: 'black'
        };
        if (enableColor && selectedNote.startsWith(inputWord)) {
            inputStyle.color = 'blue';
        }
        this.setState({ inputStyle })
    }
    play(musicName) {
        let { enableSound } = this.state
        if (!enableSound) {
            return;
        }
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
            countsec: 0,
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
            flashBannerTiming: 2000 // Flash one don't blink text banner timing
        })
    }


    splitSentences = () => {
        let { inputValue } = this.state;
        if (inputValue.length === 0) {
            this.setState({ alert: 'Please add some text or paste it' });
            setTimeout(() => this.setState({ alert: '' }), 2000)
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
        if (!this.state.hideReady) {
            this.setState({ hideReady: true });
        }
        setTimeout(() => {
            this.setState({ showSection: 2 });
            this.calculateFlashTiming();
        }, this.state.flashBannerTiming)
    }

    calculateFlashTiming = () => {
        const { sentences, sentenceIndex } = this.state;
        let time = sentences[sentenceIndex].sentence.length * 30;

        setTimeout(() => {
            this.setState({
                showSection: 3,
                clickedReady: true,
                selectedEnd: this.state.per[Math.floor(Math.random() *
                    this.state.per.length)],
                inputHidden: false,
                hideReady: true,
                perfect: false,
                inputWord: '',
                showWord: false,
                timerOn: true,
                countsec: time,
                timerTime: this.state.timerTime,
                timerStart: Date.now() - this.state.timerTime,
                in: this.state.in + 1,
                selectedNote: this.state.sentences[sentenceIndex].sentence,
            })
            this.timer = setInterval(() => {
                this.setState({
                    timerTime: Date.now() - this.state.timerStart
                });
            }, 10);
        }, time > 300 ? time : 300) // milliseconds on each word in flash 
    }

    handleInputWord = e => {
        const { sentences, sentenceIndex, selectedNote, count, enableColor } = this.state;
        //Here is the color validaiton(don't touch anything here)
        let inputStyle = {
            color: 'black',
        };
        let inputText = e.target.value;
        if (enableColor && selectedNote.startsWith(inputText)) {
            inputStyle = {
                color: 'blue'
            };
        } else {
            inputStyle = {
                color: 'black'
            };
        }

        if (inputStyle.color === 'blue') {
            this.play('PurrrSound');
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
                inputStyle,
            })
            clearInterval(this.timer);
            this.enableWindowKeyboardListener();
        } else {
            this.setState({
                againHidden: false,
                inputWord: e.target.value,
                inputStyle,
            })
        }
    }

    handleAgain = () => {
        this.setState({ showSection: 1, flashCount: this.state.flashCount + 1 })
        setTimeout(() => {
            //Here is the counter of flashes and length of the first flash logic
            var inc = this.state.countsec + 300;
            setTimeout(() => {
                this.setState({
                    showSection: 3,
                })
            }, inc)
            this.setState({
                count: this.state.count + 1,
                countsec: inc,
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
            countsec: 0,
            spans: [],
            showSection: 1,
            flashCount: 1,
            againSentenceMessage: false
        });
        this.readyLearningSession();
    }

    SkipSentence = () => {
        let { sentences, sentenceIndex } = this.state;
        if (sentenceIndex === sentences.length - 1) {
            this.setState({
                perfect: true,
                timerOn: false,
                showSection: 4,
                inputWord: '',
                sentenceIndex: sentenceIndex + 1
            })
            this.props.setSentences(sentences)
            this.props.history.push('result-page')
        } else {
            this.setState({ sentenceIndex: sentenceIndex + 1 })
            this.resetState();
        }

    }

    enableWindowKeyboardListener = () => {
        window.addEventListener('keydown', this.windowKeyboardListener)
    }
    windowKeyboardListener = event => {
        if (event.keyCode === 13) {
            const { sentences, sentenceIndex } = this.state;
            if (sentences[sentenceIndex] !== undefined) {
                this.nextSentence()
                return;
            }
            this.youLearnItButtonPressed()
        }
    }

    disableWindowKeyboardListener = () => {
        window.removeEventListener('keydown', this.windowKeyboardListener)
    }

    nextSentence = () => {
        if(this.props.mode == 'master'){
            this.resetState();
        }else if(this.props.mode == 'basic') {
            this.SkipSentence()    
        }
        this.disableWindowKeyboardListener();
    }
    youLearnItButtonPressed = () => {
        this.props.setSentences(this.state.sentences);
        this.props.history.push('result-page');
        this.disableWindowKeyboardListener();
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
            enableColor,
            enableSound,
            hideAll
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
            <>
                {/* navbar */}
                <Navbar quit={true} hideAll={hideAll || hideReady} />
                <MDBContainer className="main_container"
                    onMouseMove={() => {
                        if (this.state.hideAll) {
                            this.setState({ hideAll: false })
                        }
                    }}>
                    {this.state.alert.length > 0 ? <AlertMessage message={this.state.alert} /> : null}
                    
                    {this.state.startLearning ?
                        <div className="os-phrases" >
                            <h2 hidden={!this.state.startLearning}><span className="blinking">do not</span> blink</h2>
                        </div> :
                        <h2 className="ready" onClick={this.readyLearningSession} hidden={this.state.hideReady}>Ready?</h2>}
                    {/* First flash section */}
                    {showSection === 1 && hideReady && <div className="os-phrases">
                        <h2 style={{ fontSize: "2rem", textAlign: 'center', fontWeight: 400, cursor: "pointer" }}>flash {flashCount}</h2>
                    </div>}

                    {/* Question section */}
                    {showSection === 2 && hideReady &&
                        <h1 style={{ fontSize: "2rem", marginTop: 20, textAlign: 'center', fontWeight: 400 }}>{sentences[sentenceIndex] && sentences[sentenceIndex].sentence}</h1>}

                    {/* Count Section */}
                    {hideReady && <div style={(hideAll || hideReady) ? { position: 'absolute', top: 10, left: 0, right: 0 } : {}}>
                        <ReactTooltip place="bottom" type="dark" effect="solid" />
                        <div className="left_count"  >
                            <h2> <span data-tip={`This Was Flash ${this.state.count}`} >  {this.state.count} </span>  <span data-tip={`It Took ${(this.state.countsec / 1000).toFixed(1)} seconds`} > &nbsp;{(this.state.countsec / 1000).toFixed(1)}s</span> </h2>
                            <div className={(hideAll || hideReady) ? 'opa_hide custom-control custom-switch' : 'opa_show custom-control custom-switch'}>
                                <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    id='customSwitches'
                                    checked={enableColor}
                                    onChange={() => {
                                        this.setState({ enableColor: !enableColor })
                                        this.checkInputColor(!enableColor);
                                    }}
                                    readOnly
                                />
                                <label className='custom-control-label' htmlFor='customSwitches'>
                                    COLORS
                            </label>
                            </div>
                        </div>

                        <div className="right_count">
                            <h2 >
                                <span data-tip={`${notTriedSentencesCount} more new`} >
                                    {notTriedSentencesCount}
                                </span>
                                <span data-tip={`${notMasteredCount} to try again`}> &nbsp;{notMasteredCount} &nbsp; </span>
                                <span data-tip={`${masteredCount} out of ${sentences.length} mastered`} > {masteredCount}/{sentences.length}</span>
                            </h2>
                            <div className={(hideAll || hideReady) ? 'opa_hide custom-control custom-switch' : 'opa_show custom-control custom-switch'}>
                                <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    id='customSwitches1'
                                    checked={enableSound}
                                    onChange={() => this.setState({ enableSound: !enableSound })}
                                    readOnly
                                />
                                <label className='custom-control-label' htmlFor='customSwitches1'>
                                    SOUNDS
                            </label>
                            </div>
                        </div>
                    </div>}

                    {/* Answering section */}
                    {showSection === 3 && hideReady && <div >
                        <MDBInput
                            className="text-center input-container"
                            autoFocus
                            style={{ ...inputStyle, marginTop: '2em' }}
                            value={inputWord}
                            type="text"
                            spellCheck={this.state.spellCheck}
                            onChange={(e) => {
                                this.handleInputWord(e)
                                this.setState({ hideAll: true })
                            }}
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    this.handleAgain()
                                }
                            }}
                            size="lg"
                        />
                        <h3 className="text-center pt-2 mb-2" style={{ cursor: "pointer" }} onClick={this.handleAgain}>
                            <ReactTooltip place="bottom" type="dark" effect="solid" />
                            <i className="fa fa-repeat" data-tip={'one more flash'} ></i>
                        </h3>
                        {/* SKIP BUTTON */}
                        <MDBBtn outline={true} color="black" className={(hideAll || hideReady) ? 'opa_hide skip' : 'opa_show skip'} style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={this.SkipSentence}>Skip </MDBBtn>

                        {/* LEARNING SESSION BUTTONS */}
                        {!hideAll && <MDBAnimation className={'counter_container'} type="slideInUp" duration="500ms" delay="500ms">
                            <MDBRow>
                                <MDBCol size={'3'} >
                                    <MDBBtn onClick={() => {
                                        this.setState({ enableColor: !enableColor })
                                        this.checkInputColor(!enableColor);
                                        if (!enableColor) {
                                            this.setState({ alert: 'Hint Activated!!',spellCheck: true })
                                            setTimeout(() => this.setState({ alert: '' }), 2000)
                                        } else {
                                            this.setState({ alert: 'Hint Deactivated!!',spellCheck: false })
                                            setTimeout(() => this.setState({ alert: '' }), 2000)
                                        }
                                    }} color="black" outline style={{ borderRadius: 50 }}  >HINT</MDBBtn>
                                </MDBCol>
                                <MDBCol size={'3'} >
                                    <ReactTooltip place="bottom" type="dark" effect="solid" />
                                    <MDBBtn data-tip={Instruction} color="black" outline style={{ borderRadius: 50 }} >INFO</MDBBtn>
                                </MDBCol>
                                <MDBCol size={'3'} >
                                    <MDBBtn onClick={this.SkipSentence} color="black" outline style={{ borderRadius: 50 }} >SKIP</MDBBtn>
                                </MDBCol>
                                <MDBCol size={'3'} >
                                    <MDBNavLink to="/" color="black" outline style={{ borderRadius: 50 }}>QUIT</MDBNavLink>
                                </MDBCol>
                            </MDBRow>
                        </MDBAnimation>}
                    </div>}


                    {this.state.perfect && hideReady && <div className="text-center">
                        <MDBInput
                            type="text"
                            className="text-center input-container"
                            style={inputStyle}
                            value={this.state.inputWord}
                            onChange={(e) => this.handleInputWord(e)}
                            size="lg"
                        />
                        <div className="bottom_message">
                            {againSentenceMessage ? <>
                                <h2>Good</h2>
                                <h4>you will see this sentence again</h4>
                                <h4>rewrite it with only 1 flash to master it</h4>
                            </> : <h4>mastered!</h4>}
                        </div>
                        <MDBAnimation type="fadeIn" duration="1s" delay="1s">
                            {/* Here is the counter of flashes */}
                            {againSentenceMessage && <>
                                <h4 className="p-2">You needed {this.state.count} flashes</h4>
                                <h4 className="p-2">It took you {(minute * 60) + Number(second)} seconds</h4>
                            </>}
                            {/* :  */}
                            {sentences[sentenceIndex] !== undefined ? <>
                                <MDBBtn outline={true} color="black" style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={this.nextSentence}>Next Sentence</MDBBtn>
                            </> :
                                <div>
                                    <h4 style={{ cursor: "pointer" }}>you have learned {masteredCount} {masteredCount > 1 ? 'sentences' : 'sentence'}!</h4>
                                    <MDBBtn color="success" outline style={{ borderRadius: 50 }} onClick={this.youLearnItButtonPressed}>YOU LEARNT IT!</MDBBtn>
                                </div>}
                        </MDBAnimation>
                    </div>}

                </MDBContainer>
            </>)
    }
}


const mapStateToProps = state => ({
    sentences: state.sentences,
    mode: state.mode,
})

const mapDispatchToProps = { setSentences, setMode };

export default connect(mapStateToProps, mapDispatchToProps)(LearningSession);