import React, { Component } from 'react';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBListGroup, MDBListGroupItem } from "mdbreact"
import ReactTooltip from "react-tooltip";
import { Link } from 'react-router-dom'
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
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
            openNav: false,

            againSentenceMessage: false,
            flashBannerTiming: 3000, // Flash one don't blink text banner timing
            inputStyle: {
                color: 'black'
            },
            alert: '',
            textToLearn: '',
            hardMode: false,
            startLearning: true,
            playSound: false,
        }
        this.CatScreaming = new Audio(CatScreaming); // This audio for black input
        this.PurrrSound = new Audio(PurrrSound); // This audio for blue input
        this.GoodSound = new Audio(GoodSound); // this for good
        this.MasteredSound = new Audio(MasteredSound); // this for mastered
    }

    componentDidMount() {
        const { sentences } = this.props;

        setTimeout(() => this.setState({ startLearning: false }), 4000)
        if (sentences.length !== 0) {
            this.setState({ sentences });
        } else {
            this.props.history.push('/')
        }
    }
    play(musicName) {
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
    SideBar = () => {
        this.setState({ openNav: !this.state.openNav })
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
        let time = sentences[sentenceIndex].sentence.length * 30;

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
        }, time > 300 ? time : 300) // milliseconds on each word in flash 
    }

    handleInputWord = e => {
        const { sentences, sentenceIndex, selectedNote, count, hardMode } = this.state;
        //Here is the color validaiton(don't touch anything here)
        let inputStyle = {
            color: 'black',
        };
        let inputText = e.target.value; //.trim().split(" ");
        if (!hardMode && selectedNote.startsWith(inputText)) {
            inputStyle = {
                color: 'blue'
            };
        } else {
            inputStyle = {
                color: 'black'
            };
        }

        // for (var i = 0; i < inputText.length; i++) {
        //     // if (this.state.selectedNote.toLowerCase().includes(inputText[i].toLowerCase()) === true) {
        //     // if (e.target.value.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])) {
        //     if (inputText[i] === selectedNote[i]) {
        //         inputStyle = {
        //             color: 'blue'
        //         };

        //     } else {
        //         inputStyle = {
        //             color: 'black'
        //         };
        //         break;
        //     }
        //     // } else {
        //     //     inputStyle = {
        //     //         color: 'black'
        //     //     };
        //     //     break;
        //     // }
        // }
        if (!hardMode) {

            if (inputStyle.color === 'blue') {
                this.play('PurrrSound');
                // } else if (inputStyle.color === 'yellow') {
                //     this.play();
            } else {
                this.play('CatScreaming');
            }
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

    SkipSentence = () => {
        let { sentences, sentenceIndex } = this.state
        sentences.splice(sentenceIndex, 1);
        if(sentenceIndex === sentences.length) {
            this.setState({
                perfect: true,
                timerOn: false,
                showSection: 4,
                inputWord: sentences[sentenceIndex - 1].sentence || '',
            })
        } else {
            this.resetState();
        }
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
            <>
                {/* navbar */}
                <MDBNavbar dark expand="md" fixed="top" >
                    <MDBNavbarBrand>
                        <Link to="/"><strong className="dark-text">DO NOT BLINK</strong></Link>
                    </MDBNavbarBrand>
                    <MDBNavbarNav right>
                        {window.innerWidth > 800 ? <>
                            <MDBNavLink to="/about" >About</MDBNavLink>
                            <MDBNavLink to="/content" >Content</MDBNavLink>
                            <MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }} onClick={() => this.props.history.goBack()} >Quit</MDBNavLink>

                        </> : <MDBBtn outline={true} color="black" id="hamburgher" onClick={() => this.SideBar()}>
                                <MDBIcon size="md" icon="bars" />
                            </MDBBtn>}
                    </MDBNavbarNav>
                </MDBNavbar>
                {/* side navbar */}
                {this.state.openNav ?
                    <MDBContainer>
                        <MDBSideNav
                            fixed={true}
                            slim={true}
                            hidden
                            triggerOpening={this.state.openNav}
                            breakWidth={1500}
                        >
                            <li style={{
                                padding: '30px 20px',
                                textAlign: 'center',
                                margin: '0 auto',
                            }}>
                                <Link to="/" onClick={this.SideBar}> DO NOT BLINK </Link>
                            </li>
                            <li >
                                <MDBNavLink to="/about" onClick={this.SideBar}>
                                    About
                    </MDBNavLink>
                            </li>
                            <li >
                                <MDBNavLink to="/content" onClick={this.SideBar}>
                                    Content
                    </MDBNavLink>
                            </li>
                            <li >
                               <MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }} onClick={() => this.props.history.goBack()} >Quit</MDBNavLink>
                            </li>

                        </MDBSideNav>
                    </MDBContainer>
                    : null}

                <MDBContainer className="main_container">
                    {this.state.alert.length > 0 ? <AlertMessage message={this.state.alert} /> : null}
                    {this.state.startLearning ?
                        <div className="os-phrases" >
                            <h2 hidden={!this.state.startLearning}><span className="blinking">do not</span> blink</h2>
                        </div> :
                        <h2 className="ready" onClick={this.readyLearningSession} hidden={this.state.startLearning || this.state.hideReady}>Ready?</h2>}

                    {/* First flash section */}
                    {showSection === 1 && hideReady && <div className="os-phrases">
                        <h2 style={{ fontSize: "2rem", textAlign: 'center', fontWeight: 400, cursor: "pointer" }}>flash {flashCount}</h2>
                    </div>}

                    {/* Question section */}
                    {showSection === 2 && hideReady && <div>
                        <h1 style={{ fontSize: "2rem", marginTop: 40, textAlign: 'center', fontWeight: 400 }}>{sentences[sentenceIndex].sentence}</h1>
                    </div>}

                    {/* Count Section */}
                    {hideReady && <>
                        <ReactTooltip place="bottom" type="dark" effect="solid" />
                        <h2 className="left_count"  > <span data-tip={`This Was Flash ${this.state.count}`} >  {this.state.count} </span>  <span data-tip={`It Took ${this.state.countsec / 1000} seconds`} > &nbsp;{this.state.countsec / 1000}s</span> </h2>

                        <div className="right_count">
                            <h2 >
                                <span data-tip={`${notTriedSentencesCount} more new`} >
                                    {notTriedSentencesCount}
                                </span>
                                <span data-tip={`${notMasteredCount} to try again`}> &nbsp;{notMasteredCount} &nbsp; </span>
                                <span data-tip={`${masteredCount} out of ${sentences.length} mastered`} > {masteredCount}/{sentences.length}</span>
                            </h2>

                            <div className='custom-control custom-switch'>
                                <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    id='customSwitches'
                                    checked={hardMode}
                                    onChange={() => this.setState({ hardMode: !hardMode, inputStyle: { color: hardMode ? inputStyle.color : 'black' } })}
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
                        <MDBInput className="text-center input-container" autoFocus style={{ ...inputStyle, marginTop: '2em' }} value={inputWord} type="text" onChange={(e) => {
                            this.handleInputWord(e)
                            // if (!this.state.skipBtn && inputWord.length > 1) {
                            //     this.setState({ skipBtn: true })
                            // }
                        }} size="lg" />
                        <h3 className="text-center pt-2 mb-2" style={{ cursor: "pointer" }} onClick={this.handleAgain}>one more flash</h3>
                        <MDBBtn outline={true} color="black" className="skip" style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={this.SkipSentence}>Skip </MDBBtn>
                    </div>}

                    {this.state.perfect && hideReady && <div className="text-center">
                        <MDBInput type="text" className="text-center input-container" style={inputStyle} value={this.state.inputWord} onChange={(e) => this.handleInputWord(e)} size="lg" />
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
                                <MDBBtn outline={true} color="black" style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={this.resetState}>Next Sentence</MDBBtn>
                            </> :
                                <div>
                                    <h4 style={{ cursor: "pointer" }}>you have learned {sentences.length} {sentences.length > 0 ? 'sentences' : 'sentence'}!</h4>
                                    <MDBBtn color="success" outline style={{ borderRadius: 50 }} onClick={() => this.props.history.push('result-page')}>YOU LEARNT IT!</MDBBtn>
                                </div>}
                        </MDBAnimation>
                    </div>}

                </MDBContainer>
            </>)
    }
}


const mapStateToProps = state => ({
    sentences: state.sentences
})


export default connect(mapStateToProps)(LearningSession);