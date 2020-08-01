import React, { Component } from 'react'
import App from '../App';
import '../App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import About from '../Pages/about'
import EditCode from '../Pages/editPage'
import Content from '../Pages/content';
import LearningSession from '../Pages/LearningSession/LearningSession';
import ResultPage from '../Pages/Result/Result';
import EditPage from '../Pages/editPage';
import FullScreenMode from '../components/FullScreen';

export default class Routes extends Component {

    render() {
        return (<BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/about" component={About} />
                <Route exact path="/content" component={Content} />
                <Route exact path="/editCode/" component={EditPage} />
                <Route exact path="/editCode:id" component={EditPage} />
                <Route exact path="/learning-session" component={LearningSession} />
                <Route exact path="/result-page" component={ResultPage} />
                {/* <Route exact path="*" component={} /> */}
            </Switch>
        </BrowserRouter>)
    }
}