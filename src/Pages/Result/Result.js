import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBAnimation, MDBContainer } from "mdbreact"
import './style.css';

export default class extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="container">
                <div>
                    <h4 style={{ cursor: "pointer" }}>You learnt it!</h4>
                    <h4 style={{ cursor: "pointer" }}>Don’t leave your friends stupid!</h4>
                    <MDBBtn color="success" outline={true}>Share it!</MDBBtn>
                    <MDBBtn outline={true} color="warning" onClick={() => this.props.history.push("/")}>
                        Keep Learning
                        </MDBBtn>
                </div>
            </div>
        )
    }
}