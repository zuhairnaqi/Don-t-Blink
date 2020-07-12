import React from 'react'
import { MDBAlert, MDBContainer } from 'mdbreact'

export default class AlertMessage extends React.Component {

    render() {
        return <MDBContainer style={{ position: 'fixed', zIndex: 9999, bottom: 0, left: 0, width: window.innerWidth > 700 ? 'auto' : '100%' }}> {this.props.message && this.props.message.length > 0 ? <MDBAlert dismiss color="dark" style={{ padding: 5 }} >{this.props.message}</MDBAlert> : null} </MDBContainer>
    }
}   