import React, { Component } from 'react';
import { MDBInput, MDBBtn } from "mdbreact"
import './input.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            sentences: [],

        }
    }

    learnIt = () => {
        const { inputValue } = this.state;
        console.log(inputValue);
        const arrayOfSentences = inputValue.split('\n');
        let sentences = [];
        arrayOfSentences.forEach(val => {
            const sentence = val.trim();
            if (sentence) {
                sentences.push(sentence);
            }
        });
        this.setState({ sentences });
        console.log(arrayOfSentences, sentences);
    }

    detectSign = () => {
        const { sentences } = this.state;
        let createMultipleSentences = [...sentences];
        let signs = ['?', '.', '!'];
        signs.forEach(sign => {
            createMultipleSentences.forEach((sentence, index) => {
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
            })
        })

        console.log('createMultipleSentences', createMultipleSentences);
        // for (const sentence of sentences) {





        //     if (sentence.includes('?')) {
        //         sign = '?';
        //     } else if (sentence.includes('!')) {
        //         sign = '!';
        //     } else if (sentence.includes('.')) {
        //         sign = '.';
        //     }
        //     console.log(sign);
        //     if (sign) {
        //         let signIndex = sentence.indexOf(sign);
        //         if (sentence.length > signIndex + 1) {
        //             let separateSentences = sentence.split(sign);
        //             separateSentences.forEach(sent => {
        //                 if(sent.trim()) {
        //                     createMultipleSentences.push(sent.trim() + sign);
        //                 }
        //             })
        //         } else {
        //             createMultipleSentences.push(sentence.trim())
        //         }
        //     } else {
        //         createMultipleSentences.push(sentence.trim())
        //     }
        // }
        this.setState({ sentences: createMultipleSentences })
        console.log('sentences', createMultipleSentences);
    }

    render() {
        const { inputValue } = this.state;
        let inputStyle = {
            color: 'white',
        };
        return (
            <div>
                <MDBInput
                    type="textarea"
                    autoFocus
                    size="lg"
                    className="text-center inputStyle"
                    value={inputValue}
                    style={inputStyle}
                    onChange={event => this.setState({ inputValue: event.target.value })}
                />
                <div className="buttonsContainer">
                    <MDBBtn color="primary" rounded outline onClick={this.detectSign}>Detect Sign</MDBBtn>
                    <MDBBtn color="primary" rounded outline onClick={this.learnIt}>Learn it!</MDBBtn>
                </div>
            </div>
        )
    }
}

