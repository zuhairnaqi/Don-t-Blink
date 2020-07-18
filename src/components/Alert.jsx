import React from 'react'
import { MDBAlert, MDBContainer } from 'mdbreact'
import {Link} from 'react-router-dom'
export default class AlertMessage extends React.Component {

    render() {
        return <MDBContainer style={{ position: 'fixed', zIndex: 9999, bottom: 0, left: 0, width: window.innerWidth > 700 ? 'auto' : '100%' }}> {this.props.message && this.props.message.length > 0 ?
            <MDBAlert color="dark" style={{ padding: 5 }} >{this.props.message} {this.props.link ? <a href={this.props.href} target='_blank' rel="shareable link">{this.props.href}</a> : null}</MDBAlert>
            : null} </MDBContainer>
    }
}   