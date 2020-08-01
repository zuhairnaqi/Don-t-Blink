import React from 'react'
import { MDBAlert, MDBContainer } from 'mdbreact'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
export default class AlertMessage extends React.Component {

    render() {
        return <MDBContainer style={{ position: 'fixed', bottom: 0, left: 0, width: window.innerWidth > 700 ? 'auto' : '100%' }}> {this.props.message && this.props.message.length > 0 ?
            <MDBAlert color="dark" style={{ padding: 5 }} >{this.props.message} {this.props.link ? <CopyToClipboard text={this.props.href}
            onCopy={() => this.props.setAlert()}
            >
                <a href="#!" >{this.props.href}</a></CopyToClipboard> : null}</MDBAlert>
            : null} </MDBContainer>
    }
}   