import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Songs } from '../songs';


export default class Modal extends Component {

    render() {
        const { modalId, modal, toggle, move, texttolearn } = this.props;

        return (<>
            {modal ?
                <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        {Songs[modalId].title}
                    </MDBModalHeader>
                    <MDBModalBody>
                        {Songs[modalId].song}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="success" outline onClick={() => {
                            if (move !== false) {
                                move()
                            }
                            toggle()
                            texttolearn(Songs[modalId].song)
                        }} >Learn It!</MDBBtn>
                        <MDBBtn color="black" outline onClick={toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal> : null}
        </>)
    }
}