import React from 'react';
import './App.css';
import { MDBAnimation, MDBInput } from "mdbreact"
import InputComponent from './components/InputComponent/InputComponent';

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
      te: false
    }
    this.handleInputWord = this.handleInputWord.bind(this);

  }

  handleClick = () => {
    setTimeout(() => {
      this.setState({
        showWord: true
      })
    }, 300)
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
    // if(this.state.words.length===this.state.in){
    //   this.setState({
    //     in:0
    //   })
    // }
  }

  handleInputWord = (e) => {

    if (e.target.value === this.state.selectedNote) {
      this.setState({
        perfect: true,
        inputHidden: true,
        inputWord: e.target.value,
        timerOn: false

      })
      this.setState({ inputWord: e.target.value })
      clearInterval(this.timer);
    } else {
      this.setState({
        againHidden: false,
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
  handleTime = (hours, minutes, seconds) => {
    console.log(hours, minutes, seconds)
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
      spans: []
    })
  }

  render() {
    // console.log(this.state.selectedNote);
    // const { timerTime } = this.state;
    // // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    // let second = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    // let minute = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // // let hour = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    // //Here is the color validaiton(don't touch anything here)

    // let inputStyle = {
    //   color: 'white',
    //   width:'1000px'
    // };
    // let inputText=this.state.inputWord.split(" ")

    // for(var i =0; i < inputText.length; i++){
    //   if(this.state.selectedNote.includes(inputText[i])===true){ 

    //     if(this.state.inputWord.indexOf(inputText[i]) === this.state.selectedNote.indexOf(inputText[i])){

    //     inputStyle = {
    //       color: 'blue'
    //     };
    //     }else{

    //     inputStyle = {
    //       color: 'yellow'
    //     };
    //     }
    // }else{

    //   inputStyle = {
    //     color: 'white'
    //   };
    // }
    // }

    return (
      <>

        <div className="App-header">
          {/* this is the animation of the logo */}
          {/* <div className="os-phrases">
            <h2 hidden={this.state.hideReady}><span className="blinking">don't</span> blink</h2>
            <h2 hidden={this.state.hideReady}>you have one job</h2>
            <h2 hidden={this.state.hideReady}>write down what you see</h2>
            <h2 style={{ cursor: "pointer" }} onClick={this.handleClick} hidden={this.state.hideReady}>Ready?</h2>
          </div> */}

          <InputComponent />
        </div>
      </>
    );
  }
}
export default App;



// {/* <h2 style={{cursor:"pointer"}} onClick={this.handleClick} hidden={this.state.hideReadys}>Ready?</h2>
// <h1 className="pb-2" style={{position:"absolute" , fontSize: "3.35rem"}}  hidden={this.state.showWord}>{this.state.selectedNote}</h1>
// {
//   this.state.inputHidden?
//   (
//     <></>
//   ):
//   (
//     < >
//     {/* Here is the counter of flashes and length of the first flash view*/}
//     <h2 className="count"> {this.state.count} <small>{this.state.countsec/1000}s</small></h2>
//     <MDBInput className="text-center" autoFocus style={inputStyle}  value={this.state.inputWord} type="text" onChange={(e)=>this.handleInputWord(e)} size="lg" />
//     <h2 className="text-center pt-2 mb-2" style={{cursor:"pointer", position:"absolute", bottom:"170px"}} onClick={this.handleAgain}>Again?</h2>
//     </>
//   )
// }

// {
//     this.state.perfect?
//     (
      
//         <div className="text-center" style={{position:"absolute"}}>
//           <MDBInput type="text" className="text-center" style={inputStyle} value={this.state.inputWord} onChange={(e)=>this.handleInputWord(e)} size="lg" />
//           <h2>{this.state.selectedEnd}</h2>
//           <MDBAnimation type="fadeIn" duration="1s" delay="2s">
//           {/* Here is the counter of flashes */}
//           <h2 className="p-2">{this.state.count} flashes, {minute}:{second} Seconds</h2>
//           <h2 style={{cursor:"pointer"}} onClick={this.resetState}>I want more</h2>
//           </MDBAnimation>
//         </div>
//     ):
//     (
//         <></>
//     )
// }

// {
//   this.state.te?
//   (
//     <div>
//       <h1>Thanks</h1>
//     </div>
//   ):
//   (
//     <></>
//   )
// }
// </div> */}