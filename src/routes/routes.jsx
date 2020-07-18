import React, { Component } from 'react'
import App from '../App';
import '../App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import About from '../Pages/about'
import EditCode from '../Pages/editPage'
import Content from '../Pages/content';
import LearningSession from '../Pages/LearningSession/LearningSession';
import FullScreen from '../assets/icons/fullscreen.png'
import ExitFullScreen from '../assets/icons/exit-fullscreen.png';
import ResultPage from '../Pages/Result/Result';
import EditPage from '../Pages/editPage';

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreenMode: false,
        }
    }
    componentDidMount() {
        document.onfullscreenchange = event => {
            console.log('event', event);
            if (document.fullscreenElement) {
                this.setState({ fullscreenMode: true });
            } else {
                this.setState({ fullscreenMode: false });
            }
        }
    }

    disableFullScreen = () => {
        document.exitFullscreen();
      }
      enableFullScreen = () => {
        document.getElementById('root').requestFullscreen();
      }
    render() {
        const { fullscreenMode } = this.state;
        return (<BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/about" component={About} />
                <Route exact path="/content" component={Content} />
                <Route exact path="/editCode/" component={EditPage} />
                <Route exact path="/editCode/:id" component={EditPage} />
                <Route exact path="/learning-session" component={LearningSession} />
                <Route exact path="/result-page" component={ResultPage} />
                {/* <Route exact path="*" component={} /> */}
            </Switch>
            {fullscreenMode ? 
            <img src={ExitFullScreen} alt="ExitFullScreen" className="fullscreen opacity_anim" onClick={this.disableFullScreen} /> :
            <img src={FullScreen} alt="FullScreen" className="fullscreen opacity_anim"  onClick={this.enableFullScreen} />}
        </BrowserRouter>)
    }
}