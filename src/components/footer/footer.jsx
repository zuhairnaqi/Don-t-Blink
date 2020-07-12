import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'

export default class Footer extends React.Component {
    render() {
        return (<div className="content" style={{ background: '#333333', padding: '5% 0', position: 'absolute', left: 0, right: 0, color: 'white', zIndex: 9999 }} >
            <MDBContainer >
                <MDBRow >
                    <MDBCol sm={12} md={6} lg={4}>
                        lorem ipsome Lorem Ipsom <br />
                                    lorem ipsome Lorem Ipsom <br />
                                    lorem ipsome Lorem Ipsom
                            </MDBCol>
                    <MDBCol sm={12} md={6} lg={4}>
                        lorem ipsome Lorem Ipsom <br />
                                    lorem ipsome Lorem Ipsom <br />
                                    lorem ipsome Lorem Ipsom
                            </MDBCol>
                    <MDBCol sm={12} md={12} lg={4}>
                        lorem ipsome Lorem Ipsom <br />
                                    lorem ipsome Lorem Ipsom <br />
                                    lorem ipsome Lorem Ipsom
                            </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>)
    }
}  