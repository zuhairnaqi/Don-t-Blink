import React, { Component } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-erlang';
import 'prismjs/themes/prism-twilight.css';
import { connect } from 'react-redux';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBSideNavLink, MDBSideNavCat, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBSideNavNav } from 'mdbreact';
import '../App.css';
import { Link } from 'react-router-dom'
import { setSentences } from '../store/sentences/action';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AlertMessage from '../components/Alert'

class EditCode extends Component {
	constructor() {
		super();
		this.state = {
			code: '',
			sentences: [],
			showEditor: false,
			exceed: false,
			alert: '',
			sentencesLength: 0
		};
	}
	componentDidMount() {
		const { sentences } = this.props;

		if (sentences.length > 0) {
			let code = '';
			for (const obj of sentences) {
				code += obj.sentence + '\n';
				if (obj.sentence.length >= 40) {
					this.setState({ exceed: true })
				} else {
					this.setState({ exceed: false })
				}
			}
			this.setState({ sentences, code, showEditor: true });
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
			this.setState({ alert: 'Please add some text or paste it' });
			setTimeout(() => this.setState({ alert: '' }), 1000);
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

			this.state.sentences.forEach(Data => Data.length >= 40 ? this.setState({ exceed: true }) : null)

		} else if (code && !this.state.exceed) {
			code.split('\n').forEach(Data => Data.length >= 40 ? this.setState({ exceed: true }) : null)
			this.setState({ sentencesLength: code.split('\n').length })
		}
		if (this.state.exceed) {
			setTimeout(() => {
				this.setState({ exceed: false })
			}, 2000)
		}
	}

	render() {
		let options = {
			lineNumbers: true,
		};

		return (<div style={{ height: window.innerHeight }}>
			{this.state.copied ? <AlertMessage message={'COPIED TO CLIPBOARD!'} /> : null}
			{this.state.exceed ? <AlertMessage message={'One of your sentence is too long, try to make it short'} /> : null}
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
							<MDBNavLink to="/" onClick={this.SideBar}>

								DO NOT BLINK
                            </MDBNavLink>
						</li>
						<li style={{
							padding: '30px 20px',
							textAlign: 'center',
							margin: '0 auto',
						}}>
							<Link to="/" > DO NOT BLINK </Link>
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
							<MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }} onClick={() => this.props.history.push('/')} >
								Back
                    </MDBNavLink>
						</li>
					</MDBSideNav>
				</MDBContainer>
				: null}
			<MDBContainer >
				<MDBRow className="editor-container">
					<MDBCol
						size={'12'}
						style={{ marginBottom: 20, marginTop: 40, minHeight: 220 }}
					>
						<div style={{ textAlign: 'center' }}>
							<h6>
								You will learn {this.state.sentencesLength} portions of text. Make sure they are not too long. Hit enter if you want to
							add a line. Remove things you don't want to learn.
						</h6>
							<h6>Your job is to master this text. You must write all of the lines after the first flash.</h6>

						</div>
						{this.state.showEditor && <CodeMirror
							className="editor"
							value={this.state.code}
							onChange={(code) => {
								this.ExceedAlert(code)
								this.setState({ code, copied: false })
							}}
							options={options}
						/>}
						<div style={{ textAlign: 'center' }}>
							<MDBBtn color="success" outline={true} onClick={() => this.splitSentences()}>
								Start Learning
                        </MDBBtn>
							<CopyToClipboard text={this.state.code}
								onCopy={() => this.setState({ copied: true })}
							>
								<MDBBtn color="warning" outline={true}>
									Share this set
						</MDBBtn>
							</CopyToClipboard>
						</div>
					</MDBCol>

				</MDBRow>
			</MDBContainer>
		</div>);
	}
}

const mapStateToProps = (state) => ({
	sentences: state.sentences
});

const mapDispatchToProps = { setSentences };

export default connect(mapStateToProps, mapDispatchToProps)(EditCode);
