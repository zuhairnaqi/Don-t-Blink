import React, { Component } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-erlang';
import 'prismjs/themes/prism-twilight.css';
import { connect } from 'react-redux';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import '../App.css';
import { setSentences } from '../store/sentences/action';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
class EditCode extends Component {
	constructor() {
		super();
		this.state = {
			code: 'Hello world \n yes bro \n',
            sentences: [],
            showEditor: true,
		};
	}
	componentDidMount() {
		const { sentences } = this.props;
		if (sentences.length > 0) {
            this.setState({showEditor: false})
			let code = '';
			for (const obj of sentences) {
				code += obj.sentence + '\n';
            }
            console.log(sentences, code);
			this.setState({ sentences, code, showEditor: true });
        }
	}

	splitSentences = () => {
		let { code } = this.state;
		if (code.length === 0) {
			this.setState({ alert: 'Please add some text or paste it' });
			setTimeout(() => this.setState({ alert: '' }), 1000);
			return;
		}
		let sentences = [];
		let signs = [ '\n', '?', '.', '!', ',' ];
		for (let j = 0; j < code.length; j++) {
			const letter = code[j];
			if (signs.includes(letter)) {
				const index = code.indexOf(letter) + 1;
				const newSentence = code.slice(0, index);
				let removeExtraSigns = newSentence;
				for (let i = index; i < code.length; i++) {
					if (signs.includes(code[i])) {
						removeExtraSigns += code[i];
					} else {
						break;
					}
				}
				j = 0;
				code = code.replace(removeExtraSigns, '');
				if (newSentence.trim()) {
					sentences.push({ sentence: newSentence.trim(), mastered: null, tried: false });
				}
			} else if (j === code.length - 1) {
				const newSentence = code.slice(0, code.length);
				if (newSentence.trim()) {
					sentences.push({ sentence: newSentence.trim(), mastered: null, tried: false });
				}
			}
		}
		// this.setState({ sentences });
		this.props.setSentences(sentences);
		this.props.history.push('learning-session');
    };
	render() {
        let options = {
			lineNumbers: true,
        };

		return (
			<MDBRow className="editor-container">
				<MDBCol
					size={window.innerWidth > 900 ? '8' : '12'}
					style={{ marginBottom: 20, minHeight: 220 }}
				>
                    {this.state.showEditor && <CodeMirror
                    className="editor"
                    value={this.state.code}
                    onChange={(code) => {
                        console.log('code', code);
                        this.setState({ code })
                    }}
                    options={options}
                    />}
                    <div style={{textAlign: 'center'}}>
                        <MDBBtn color="success" outline={true} onClick={() => this.splitSentences()}>
                            Start Learning
                        </MDBBtn>
                    </div>
				</MDBCol>
				<MDBCol size={window.innerWidth > 900 ? '4' : '12'} style={{ textAlign: 'center' }}>
					<div>
						<p>
							You will learn {this.props.sentences.length} portions of text. Make sure they are not too long. Hit enter if you want to
							add a line. Remove things you don't want to learn.
						</p>
						<p>Your job is to master this text. You must write all of the lines after the first flash.</p>
						<MDBBtn color="success" outline={true}>
							Share this set
						</MDBBtn>
					</div>
				</MDBCol>
			</MDBRow>
		);
	}
}

const mapStateToProps = (state) => ({
	sentences: state.sentences
});

const mapDispatchToProps = { setSentences };

export default connect(mapStateToProps, mapDispatchToProps)(EditCode);
