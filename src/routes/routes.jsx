import React, { Component } from 'react'
import App from '../App'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import About from '../Pages/about'
import EditCode from '../Pages/editPage'

export default class Routes extends Component {
    render() {
        return (<BrowserRouter>
            <Switch>
                
                <Route exact path="/" component={App} />
                <Route exact path="/About" component={About} />
                <Route exact path="/editCode" component={EditCode} />
                {/* <Route exact path="*" component={} /> */}
            </Switch>
        </BrowserRouter>)
    }
}