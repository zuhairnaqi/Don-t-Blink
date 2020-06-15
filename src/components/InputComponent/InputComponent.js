import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBAnimation, MDBRow, MDBContainer, MDBCol, MDBAlert, MDBListGroupItem, MDBListGroup } from "mdbreact"
import './input.css';
import '../../App.css';
import AlertMessage from '../Alert';
import VisualizerComponent from '../Visualization';
import { Songs } from '../../songs';
import Modal from '../modal';
import { connect } from 'react-redux';
import { setSentences } from '../../store/sentences/action';

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'Paste any text that you want to learn', // Paragraph input in which user add paragrah to learn
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
            flashBannerTiming: 3800, // Flash one don't blink text banner timing
            inputStyle: {
                color: 'black'
            },
            alert: '',
            textToLearn: ''
        }
    }

    componentDidMount() {
        let { textToLearn } = this.props;

        if (textToLearn) {
            this.setState({ inputValue: textToLearn })
        }
    }
    // learnAgain = () => {
    //     this.setState({
    //         inputValue: '', // Paragraph input in which user add paragrah to learn
    //         sentences: [], // separated sentences
    //         showSection: 0, // show respective containers
    //         hideReady: true, // Show Ready text
    //         sentenceIndex: 0, // Sentence index shows the current sentence
    //         inputWord: '', // the input which user is answering while learning

    //         per: ['perfect', 'amazing', 'flawless'],
    //         selectedNote: "",

    //         //Here is the counter of flashes and length of the first flash states
    //         count: 1,
    //         countsec: 200,
    //         perfect: false,
    //         inputHidden: true,
    //         againHidden: true,
    //         showWord: false,
    //         timerOn: false,
    //         timerStart: 0,
    //         timerTime: 0,
    //         color: "white",
    //         tryAgain: false,
    //         in: 0,
    //         te: false,
    //         flashCount: 1,

    //         againSentenceMessage: false,
    //         flashBannerTiming: 3800 // Flash one don't blink text banner timing
    //     })
    // }

    splitSentences = () => {
        let { inputValue } = this.state;
        if (inputValue.length === 0) {
            this.setState({ alert: 'Please add some text or paste it' });
            setTimeout(() => this.setState({ alert: '' }), 1000)
            return;
        }
        let sentences = [];
        let signs = ['\n', '?', '.', '!'];
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
                    sentences.push({ sentence: newSentence.replace(/\s{2,}/g, ' ').trim(), mastered: null, tried: false });
                }
            } else if (j === inputValue.length - 1) {
                const newSentence = inputValue.slice(0, inputValue.length);
                // j = 0;
                // inputValue = inputValue.replace(newSentence, '');
                if (newSentence.trim()) {
                    sentences.push({ sentence: newSentence.replace(/\s{2,}/g, ' ').trim(), mastered: null, tried: false });
                }
            }
        }
        // this.setState({ sentences });
        this.props.setSentences(sentences);
        this.props.navigate("editCode");
    }

    // startLearning = () => {
    //     if (this.state.inputValue.length === 0) {
    //         this.setState({ alert: 'Please add some text or paste it' });
    //         setTimeout(() => this.setState({ alert: '' }), 1000)
    //     } else {
    //         if (this.state.sentences.length === 0) {
    //             this.setState({ alert: 'Please learn first' });
    //             setTimeout(() => this.setState({ alert: '' }), 1000)
    //         } else {
    //             this.setState({ showSection: 1, hideReady: false })
    //         }
    //     }
    // }

    // readyLearningSession = () => {
    //     this.setState({ hideReady: true });
    //     setTimeout(() => {
    //         this.setState({ showSection: 2 });
    //         this.calculateFlashTiming();
    //     }, this.state.flashBannerTiming)
    // }

    // calculateFlashTiming = () => {
    //     const { sentences, sentenceIndex } = this.state;
    //     setTimeout(() => {
    //         this.setState({ showSection: 3 });
    //         this.setState({
    //             clickedReady: true,
    //             selectedEnd: this.state.per[Math.floor(Math.random() *
    //                 this.state.per.length)],
    //             inputHidden: false,
    //             hideReady: true,
    //             hideReadys: true,
    //             perfect: false,
    //             inputWord: '',
    //             showWord: false,
    //             timerOn: true,
    //             timerTime: this.state.timerTime,
    //             timerStart: Date.now() - this.state.timerTime

    //         })
    //         this.timer = setInterval(() => {
    //             this.setState({
    //                 timerTime: Date.now() - this.state.timerStart
    //             });
    //         }, 10);
    //         // const s = this.state.sentences.length
    //         // if (s === this.state.in) {

    //         // } else {
    //         this.setState({
    //             in: this.state.in + 1,
    //             selectedNote: this.state.sentences[sentenceIndex].sentence,
    //             // selectedNote: this.state.sentences[Math.floor(this.state.in)],
    //         })
    //         // }
    //     }, sentences[sentenceIndex].sentence.length * 20)
    // }

    // handleInputWord = e => {
    //     const { sentences, sentenceIndex, selectedNote, count } = this.state;
    //     //Here is the color validaiton(don't touch anything here)
    //     let inputStyle = {
    //         color: 'black',
    //     };
    //     let inputText = e.target.value.trim().split(" ");

    //     for (var i = 0; i < inputText.length; i++) {
    //         if (this.state.selectedNote.includes(inputText[i]) === true) {
    //             if (e.target.value.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])) {
    //                 inputStyle = {
    //                     color: 'blue'
    //                 };
    //             } else {
    //                 inputStyle = {
    //                     color: 'yellow'
    //                 };
    //             }
    //         } else {
    //             inputStyle = {
    //                 color: 'black'
    //             };
    //         }
    //     }
    //     if (e.target.value === selectedNote) {
    //         let index = sentenceIndex + 1;
    //         let isFlashUsed = count > 1;
    //         if (isFlashUsed) {
    //             const repeatSentence = sentences.splice(sentenceIndex, 1)[0];
    //             repeatSentence.mastered = false;
    //             repeatSentence.tried = true;
    //             sentences.push(repeatSentence);
    //             index -= 1;
    //         } else if (sentences[sentenceIndex]) {
    //             sentences[sentenceIndex].mastered = true;
    //             sentences[sentenceIndex].tried = true;
    //         }
    //         this.setState({
    //             perfect: true,
    //             inputWord: e.target.value,
    //             timerOn: false,
    //             showSection: 4,
    //             sentences,
    //             sentenceIndex: index,
    //             againSentenceMessage: isFlashUsed,
    //             inputStyle
    //         })
    //         clearInterval(this.timer);
    //     } else {
    //         this.setState({
    //             againHidden: false,
    //             inputWord: e.target.value,
    //             inputStyle
    //         })
    //     }
    // }

    // handleAgain = () => {
    //     this.setState({ showSection: 1, flashCount: this.state.flashCount + 1 })
    //     setTimeout(() => {
    //         //Here is the counter of flashes and length of the first flash logic
    //         var inc = 200 + this.state.countsec
    //         setTimeout(() => {
    //             this.setState({
    //                 showSection: 3,
    //             })
    //         }, inc)
    //         this.setState({
    //             count: this.state.count + 1,
    //             countsec: this.state.countsec + 300,
    //             showSection: 2,
    //         })
    //     }, this.state.flashBannerTiming)
    // }

    // resetState = () => {
    //     this.setState({
    //         selectedNote: "",
    //         clickedReady: false,
    //         inputWord: '',
    //         hideReadys: false,
    //         count: 1,
    //         perfect: false,
    //         inputHidden: true,
    //         againHidden: true,
    //         showWord: false,
    //         timerOn: false,
    //         timerStart: 0,
    //         timerTime: 0,
    //         countsec: 200,
    //         spans: [],
    //         showSection: 1,
    //         hideReady: false,
    //         flashCount: 1,
    //         againSentenceMessage: false
    //     })
    // }

    addTextToLearn = (text) => {
        this.setState({ inputValue: text })
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
            inputStyle,
            againSentenceMessage
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
            <MDBContainer>
                {this.state.alert.length > 0 ? <AlertMessage message={this.state.alert} /> : null}
                <br />
                
                {showSection === 0 && <>
                    <MDBRow>
                        <MDBCol sm={12} lg={8} md={6} className="textarea_container" style={{ textAlign: 'center'}}>
                            {showSection === 0 &&
                                <MDBInput
                                    type="textarea"
                                    size="lg"
                                    rows={10}
                                    className="text-center"
                                    onFocus={(e) => e.currentTarget.value === 'Paste any text that you want to learn' ? this.setState({ inputValue: '' }) : null}
                                    onBlur={(e) => e.currentTarget.value.length == 0 ? this.setState({ inputValue: 'Paste any text that you want to learn' }) : null}
                                    value={inputValue}
                                    onChange={event => this.setState({ inputValue: event.target.value })}
                                />}

                            {showSection === 0 && <MDBRow>
                                <MDBCol size={'12'}>
                                    <MDBBtn color="success" outline={true}
                                        onClick={() => this.splitSentences()}
                                        style={{ borderRadius: 50 }}>
                                        Learn it!
                                </MDBBtn>
                                </MDBCol>
                            </MDBRow>}
                        </MDBCol>
                        <MDBCol sm={12} lg={4} md={6} style={{ textAlign: 'center' }} >

                            {/* Content Section Starts from here */}
                       <h4 style={{ textAlign: 'center', padding: '10px 0' }}>Learn one of these contents:</h4>

                            <div className="content"
                            // style={{ background: 'black', position: 'fixed', zIndex: 9999, left: 0, right: 0, padding: 10 }}
                            >
                                <MDBContainer>
                                    <MDBListGroup style={{ width: '100%', cursor: 'pointer', fontSize: '.6em' }}>
                                        {Songs.map(song =>  song.id < 10 && <MDBListGroupItem key={song.id} onClick={() => {
                                            this.setState({inputValue: song.song})
                                            this.setState({ alert: `"${song.title}" has been added `})
                                            // this.props.toggle()
                                            // this.props.modalIdFunc(song.id)
                                        }} > {song.title} </MDBListGroupItem>)}
                                    </MDBListGroup>
                                </MDBContainer>
                                {/* {this.props.modal ? <Modal texttolearn={this.addTextToLearn} move={false} modalId={this.props.modalId} toggle={this.props.toggle} modal={this.props.modal} /> : null} */}
                            </div>
                        </MDBCol>
                    </MDBRow>
                    {/* {sentences.length > 0 && <MDBRow>
                    <MDBCol size={'12'} style={{ textAlign: 'center', marginBottom: 20, marginTop: 20 }}>
                        <div className="border_container">
                            <ol>
                                {sentences.map((obj, i) => <li key={i}>{obj.sentence}</li>)}
                            </ol>
                        </div>

                        <MDBBtn color="success" outline={true} onClick={() => this.startLearning()}>
                            Start Learning
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>} */}
                </>}

            </MDBContainer>
        )
    }
}


const mapDispatchToProps = { setSentences }

export default connect(null, mapDispatchToProps)(InputComponent);