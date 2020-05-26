import React from 'react';
import './App.css';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBSideNavNav, MDBListGroup, MDBListGroupItem } from "mdbreact"
import InputComponent from './components/InputComponent/InputComponent';
import VisualizerComponent from './components/Visualization';
import { Songs } from './songs';
import Modal from './components/modal';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {
      // Words
      words: [
        'hello, monkey eats banana',
        'monkey ,monkey',
        'world, monkey',
        'set on, fire',
        'write your name'
      ],
      per: ['perfect', 'amazing', 'flawless'],
      selectedNote: "",

      clickedReady: false,
      spans: "",
      inputWord: '',
      hideReady: false,
      hideReadys: true,
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
      showIntroduction: true,
      showReady: true,
      openNav: false,
      desktop: false,
      opacityOfContainer: 1,
      scroll: window.scrollY,
      modal: false,
      modalId: null,
      textToLearn: ''
    }
    this.handleInputWord = this.handleInputWord.bind(this);

  }

  handleClick = () => {
    setTimeout(() => {
      this.setState({
        clickedReady: true,
        selectedEnd: this.state.per[Math.floor(Math.random() *
          this.state.per.length)],
        inputHidden: false,
        hideReady: true,
        hideReadys: true,
        perfect: false,
        inputWord: '',
        showWord: true,
        timerOn: true,
        timerTime: this.state.timerTime,
        timerStart: Date.now() - this.state.timerTime,
      })
    }, 300)
    this.setState({
      showReady: false,
      showWord: false
    })
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
    const s = this.state.words.length
    if (s === this.state.in) {


    } else {
      this.setState({
        in: this.state.in + 1,
        selectedNote: this.state.words[Math.floor(this.state.in)],
      })
    }
  }

  componentDidUpdate() {
    if (this.state.words.length === this.state.in) {
      this.setState({
        in: 0
      })
    }
  }

  componentDidMount = () => {

    setTimeout(() => {
      this.setState({ showIntroduction: false });
    }, 13000)

    window.addEventListener('scroll', this.UpdateOpacity)
    window.addEventListener('resize', this.UpdateDesktop)
  }

  componentWillMount = () => {
    window.addEventListener('resize', this.UpdateDesktop)
    window.addEventListener('scroll', this.UpdateOpacity)

  }
  UpdateDesktop = () => {
    this.setState({ desktop: !this.state.desktop })
  }
  handleInputWord = (e) => {
        //Here is the color validaiton(don't touch anything here)

        let inputStyle = {
          color: 'black',
          borderBottomColor: 'black'
        };
        let inputText = this.state.inputWord.split(" ")
    
        for (var i = 0; i < inputText.length; i++) {
          if (this.state.selectedNote.includes(inputText[i]) === true) {
    
            if (this.state.inputWord.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])) {
              inputStyle = {
                color: 'blue',
                // borderBottomColor: 'blue'
              };
            } else {
              
              inputStyle = {
                color: 'yellow',
                // borderBottomColor: 'yellow'
              };
            }
          } else {
            inputStyle = {
              color: 'black',
              // borderBottomColor: 'black'
            };
          }
        }
    
    if (e.target.value === this.state.selectedNote) {
      this.setState({
        perfect: true,
        inputHidden: true,
        inputWord: e.target.value,
        inputStyle,
        timerOn: false
      })
      this.setState({ inputWord: e.target.value })
      clearInterval(this.timer);
    } else {
      this.setState({
        againHidden: false,
        inputStyle,
        inputWord: e.target.value
      })
    }
  }

  handleAgain = () => {
    //Here is the counter of flashes and length of the first flash logic
    var inc = 200 + this.state.countsec
    setTimeout(() => {
      this.setState({
        showWord: true,
        inputHidden: false
      })
    }, inc)
    this.setState({
      count: this.state.count + 1,
      countsec: this.state.countsec + 200,
      showWord: false,
      inputHidden: true
    })
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
      startLearning: false,
    })
  }

  routeToLearning = () => {
    this.setState({ startLearning: !this.state.startLearning });
    clearInterval(this.timer);
  }
  SideBar = () => {
    this.setState({ openNav: !this.state.openNav })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  addTextToLearn = (text) => {
    this.setState({ textToLearn: text })
  }
  modalId = (id) => {
    this.setState({ modalId: id })
  }
  render() {
    const { timerTime, startLearning, showIntroduction, showReady, inputStyle } = this.state;
    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let second = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minute = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hour = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <>
        {/* {!this.state.perfect ?
          <VisualizerComponent audio={'start'} fillColor={'#010b13'} />
          : (this.state.count === 1 ?
            <VisualizerComponent audio={'perfect'} fillColor={'orange'} />
            : <VisualizerComponent audio={'finish'} fillColor={'purple'} />)} */}

        {/* navbar */}
        <MDBNavbar color="#000000" dark expand="md" fixed >
          <MDBNavbarBrand>
            <strong className="dark-text">DO NOT BLINK</strong>
          </MDBNavbarBrand>
          <MDBNavbarNav right>
            {window.innerWidth > 800 ? <> <MDBNavLink to="/" >Home</MDBNavLink>
              <MDBNavLink to="/about" >About</MDBNavLink>
              {startLearning ? <MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }} onClick={() => this.routeToLearning()} >Back</MDBNavLink>
                : <MDBNavLink to="/" color="success" style={{ border: '2px solid #00c851', background: 'transparent', color: '#00c851', margin: '0px 8px', borderRadius: 3, padding: '8px 15px' }} onClick={() => this.routeToLearning()} >Learn It!</MDBNavLink>}
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
                borderBottom: '1px solid white'

              }}>
                DO NOT BLINK
                  {startLearning ? <MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }} onClick={() => {
                  this.routeToLearning()
                  this.SideBar()
                }} >Back</MDBNavLink>
                  : <MDBNavLink to="/" color="success" style={{ border: '2px solid #00c851', background: 'transparent', color: '#00c851', margin: '0px 8px', borderRadius: 3, padding: '8px 15px' }} onClick={() => {
                    this.routeToLearning()
                    this.SideBar()
                  }} >Learn It!</MDBNavLink>}
              </li>
              <li>
                <MDBNavLink to="/" onClick={this.SideBar}>
                  Home
                    </MDBNavLink>
              </li>
              <li >
                <MDBNavLink to="/about" onClick={this.SideBar}>
                  About
                    </MDBNavLink>
              </li>
            </MDBSideNav>
          </MDBContainer>
          : null}
        {/* nav and side bar ends here */}

        {/* Slider starts */}
        <div style={{ height: window.innerHeight }} >
          <div className="App-header" style={{ opacity: this.state.opacityOfContainer }} onClick={() => this.setState({ showIntroduction: false })}>
            {/* this is the animation of the logo */}
            {showIntroduction ?
              <div className="os-phrases" >
                <h2 hidden={this.state.hideReady}>learn anything</h2>
                <h2 hidden={this.state.hideReady}>focus on details</h2>
                <h2 hidden={this.state.hideReady}><span className="blinking">do not</span> blink</h2>
              </div> :
              (startLearning ?
                <InputComponent
                  textToLearn={this.state.textToLearn}
                  modalIdFunc={this.modalId}
                  move={this.routeToLearning}
                  modalId={this.state.modalId}
                  toggle={this.toggle}
                  modal={this.state.modal} />
                : <>
                  {showReady && <h2 className="ready" onClick={this.handleClick}>Ready?</h2>}
                  
                  <h1 className="pb-2"  hidden={this.state.showWord}>{this.state.selectedNote}</h1>
                  {!this.state.inputHidden && <>

                    {/* Here is the counter of flashes and length of the first flash view*/}
                    <h2 className="count"> {this.state.count} <small>{this.state.countsec / 1000}s</small></h2>
                    <MDBContainer>
                      <MDBRow>
                        <MDBCol size={window.innerWidth > 900 ? '6' : '12'} style={{ textAlign: 'center', marginBottom: 20 }}>
                          <MDBInput label={'write down what you see'} className="text-center" autoFocus style={inputStyle} value={this.state.inputWord} type="text" onChange={(e) => this.handleInputWord(e)} size="lg" />
                          <MDBBtn outline={true} color="black" className="text-center pt-2 mb-2" style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={this.handleAgain}>Again?</MDBBtn>
                        </MDBCol>
                        <MDBCol size={window.innerWidth > 900 ? '6' : '12'} style={{ textAlign: 'center' }} >

                          {/* Content Section Starts from here */}
                          <div className="content"
                          // style={{ background: 'black', position: 'fixed', zIndex: 9999, left: 0, right: 0, padding: 10 }}
                          >
                            <h1 style={{ textAlign: 'center', padding: '10px 0' }}>Learn one of these contents:</h1>
                            <MDBContainer>
                              <MDBListGroup style={{ width: '100%', cursor: 'pointer' }}>
                                {Songs.map(song => <MDBListGroupItem key={song.id} onClick={() => {
                                  this.toggle()
                                  this.modalId(song.id)
                                }} > {song.title} </MDBListGroupItem>)}
                              </MDBListGroup>
                            </MDBContainer>

                            {this.state.modal ? <Modal texttolearn={this.addTextToLearn} move={this.routeToLearning} modalId={this.state.modalId} toggle={this.toggle} modal={this.state.modal} /> : null}
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </>}
                  {this.state.perfect && <div className="text-center" >
                    <MDBInput type="text" className="text-center" style={inputStyle} value={this.state.inputWord} onChange={(e) => this.handleInputWord(e)} size="lg" />
                    <h2>{this.state.selectedEnd}</h2>
                    <MDBAnimation type="fadeIn" duration="1s" delay="2s" style={{ textAlign: 'center' }}>
                      {/* Here is the counter of flashes */}
                      <h2 className="p-2">{this.state.count} flashes, {minute}:{second} Seconds</h2>
                      <MDBBtn outline={true} color="black" style={{ cursor: "pointer", margin: '30px 0', borderRadius: 50 }} onClick={() => {
                        this.resetState()
                        this.handleClick()
                        }}>I want more</MDBBtn>
                    </MDBAnimation>
                  </div>}

                  {this.state.te && <div>
                    <h1>Thanks</h1>
                  </div>}
                </>
              )}
          </div>
        </div>
        {/* Slider ends */}

      </>
    );
  }
}
export default App;


