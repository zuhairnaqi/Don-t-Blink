import React, { Component } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import ReactTooltip from "react-tooltip";
import 'prismjs/components/prism-erlang';
import 'prismjs/themes/prism-twilight.css';
import { connect } from 'react-redux';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import '../App.css';
import { setSentences, setMode } from '../store/sentences/action';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import { AlertMessage } from '../components/Alert'
import firebase from '../Config/firebaseConfig';
import baseURL from '../Config/baseURL';
import { Navbar } from '../components/navbar';
import Switch from '../components/switchSelector'
import { Loader } from '../components/loader'
import FullScreenMode from '../components/FullScreen'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditCode extends Component {
	constructor() {
		super();
		this.state = {
			code: '',
			sentences: [],
			showEditor: false,
			exceed: false,
			sentencesLength: 0,
			isShareLink: false,
			shareUrl: '',
			URLload: false,
			mode: 'basic',
			hideMessage: true,
			loader: false,
			hideAll: false
		};
	}

	componentDidMount() {
		const { sentences } = this.props;

		if (sentences.length > 0) {
			let code = '', exceed = false;
			for (const obj of sentences) {
				code += obj.sentence + '\n';
				if (obj.sentence.length >= 40) {
					exceed = true;
				} else {
					exceed = false
				}
			}
			this.setState({ sentences, code, showEditor: true, exceed });
		} else if (this.props.match.params.id) {
			this.setState({ loader: true })
			firebase.firestore().collection('sentences').doc(this.props.match.params.id).get()
				.then(response => {
					const data = response.data();
					let code = '', exceed = false;
					for (const obj of data.sentences) {
						code += obj.sentence + '\n';
						if (obj.sentence.length >= 40) {
							exceed = true;
						} else {
							exceed = false;
						}
					}
					this.setState({ sentences, code, showEditor: true, exceed, isShareLink: true, loader: false });
				})
		} else {
			this.setState({ showEditor: true });
			this.props.history.push('/')
		}
		this.setState({ sentencesLength: sentences.length })
		this.ExceedAlert()
	}

	splitSentences = () => {
		let { code } = this.state;
		if (code.trim().length === 0) {
			AlertMessage({ message: 'Please add some text or paste it' });
			return;
		}

		let sentences = [];
		let signs = ['\n', '?', '.', '!'];
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
					sentences.push({ sentence: newSentence.replace(/\s{2,}/g, ' ').trim(), mastered: null, tried: false });
				}
			} else if (j === code.length - 1) {
				const newSentence = code.slice(0, code.length);
				if (newSentence.trim()) {
					sentences.push({ sentence: newSentence.replace(/\s{2,}/g, ' ').trim(), mastered: null, tried: false });
				}
			}
		}


		this.props.setSentences(sentences);
		this.props.history.push('learning-session');

	};

	ExceedAlert = (code) => {
		if (!code && !this.state.exceed) {

			this.state.sentences.forEach(Data => Data.length >= 60 ? this.setState({ exceed: true }) : null)

		} else if (code && !this.state.exceed) {
			code.split('\n').forEach(Data => Data.length >= 60 ? this.setState({ exceed: true }) : null)
			this.setState({ sentencesLength: code.split('\n').length })
		}
		// AlertMessage({ message: 'One of your sentence is too long, try to make it short' })

	}

	shareSet = () => {
		this.setState({ URLload: true })
		let newSentence = []
		let sentence = this.state.code.split('\n');
		sentence = sentence.filter(data => data.length !== 0)

		sentence.forEach(data => {
			if (data.length !== 0) {
				newSentence.push({ sentence: data })
			}
		})
		if (!this.state.shareUrl) {
			firebase.firestore().collection('sentences').add({
				sentences: newSentence
			}).then(resp => {
				this.setState({ shareUrl: baseURL + '/editCode' + resp.id, URLload: false })
				AlertMessage({ message: "Share this link:", link: true, href: baseURL + '/editCode' + resp.id })
			})
		}
		this.ChangeMode(this.state.mode);
	}
	ChangeMode = (mode) => {
		if (mode === 'basic') {
			this.setState({ mode: 'memory' })
		} else if (mode === 'memory') {
			this.setState({ mode: 'basic' })
		}
		this.props.setMode(this.state.mode)
	}

	render() {
		let options = {
			lineNumbers: true,
		};
		const { isShareLink, shareUrl, URLload } = this.state;
		const { mode } = this.props;

		return (<div style={{ height: window.innerHeight }}>
			{this.state.loader && <Loader />}
			{/* navbar */}
			<Navbar quit={false} />
			<MDBContainer >
				<MDBRow className="editor-container" style={{ marginTop: 40 }} >
					<MDBCol size={'12'}>
						<div style={{ textAlign: 'center' }}>
							<ReactTooltip place="bottom" type="dark" effect="solid" />
							{isShareLink ?
								<>
									<br />
									<h6>You will learn {this.state.sentencesLength} sentences. <i
										data-tip="Make sure they are not too long. Hit enter if you want to	add a line. Remove things you don't want to learn.Each sentence from the box will blink very quickly. Your job is to remember it and write it down perfectly. Your job is to master this text. You must write all of the lines after the first flash."
										className="fa fa-info-circle"
									></i></h6>
									<h6>Someone wants you to learn the text from this box. Make them proud. It is simple but very effective way to learn how to write and memorize text. <br />
								Good luck!</h6>
								</> :
								<>
									<br />
									<h6 >You will learn {this.state.sentencesLength} sentences. <i
										data-tip="Make sure they are not too long. Hit enter if you want to add a line. Remove things you don't want to learn."
										className="fa fa-info-circle"
									></i> <br />
								Your job is to master this text. You must write all of the lines after the first flash.
								</h6>
								</>}
						</div>
						<MDBRow style={{ marginTop: 20 }}>
							<MDBCol size={'12'} style={{ textAlign: 'center' }}>
								<Switch />
							</MDBCol>
						</MDBRow>
						<div style={{ textAlign: 'center' }}>
							<MDBBtn color="success" outline={true} onClick={() => this.splitSentences()}>
								Start Learning
                        </MDBBtn>
						</div>
						{this.state.showEditor && <CodeMirror
							className="editor"
							value={this.state.code}
							onChange={(code) => {
								this.ExceedAlert(code)
								this.setState({ code })
							}}
							options={options}
						/>}
						{this.state.exceed && <p
							style={{
								textAlign: 'center',
								fontWeight: 'bolder',
								border: '1px dashed black',
								marginTop: 10,
								letterSpacing: 3
							}}
						><small>One of your sentence is too long, try to make it short</small></p>}
						
						{this.state.hideMessage && <div style={{
							textAlign: 'center',
							margin: '10px 0',
							background: 'rgb(51 51 51 / 79%)',
							color: 'white',
							padding: '7px 20px',
							borderRadius: '10px',
							position: 'relative',
							fontSize: '1rem',
							minHeight: 70
						}}>
							{mode === 'basic' ?
								'Your job is to rewrite the sentence that will flash for a very short time. Train your focus, good luck!'
								: 'You have to master every sentence now. Rewrite it using only one flash. If you use more than one flash for a sentence, you will see this sentence again. This helps you train your memory, too.'
							}
						</div>}
						<div style={{ textAlign: 'center' }}>
							<ReactTooltip place="bottom" type="dark" effect="solid" />
							{URLload ?
								<MDBBtn color="warning" outline={true} >{'  '}<i className="fa fa-spinner fa-spin" style={{ padding: '0 30px' }}></i>{'  '}</MDBBtn>
								: <>
									{this.state.shareUrl !== '' ?
										<CopyToClipboard text={this.state.shareUrl} onCopy={() => {
											AlertMessage({ message: 'Link has been copied to clpboard' })
										}} >
											<MDBBtn color="danger" outline={true} data-tip="Copy the link to clipboard">
												Copy To Clipboard
										</MDBBtn>
										</CopyToClipboard>
										:
										<MDBBtn color="warning" outline={true} onClick={this.shareSet} data-tip="Send the link to anyone">
											Share this set
									</MDBBtn>}
								</>}
						</div>
					</MDBCol>

				</MDBRow>
			</MDBContainer>
			<FullScreenMode />

		</div >);
	}
}

const mapStateToProps = (state) => ({
	sentences: state.sentences,
	mode: state.mode
});

const mapDispatchToProps = { setSentences, setMode };

export default connect(mapStateToProps, mapDispatchToProps)(EditCode);
