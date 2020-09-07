import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
    render() {
        return (<div className="content" style={{ background: '#333333', padding: '5% 0', position: 'absolute', left: 0, right: 0, color: 'white', zIndex: 9999 }} >
            <MDBContainer >
                <MDBRow >
                    {/* <MDBCol sm={12} md={6} lg={4} style={{textAlign: 'center'}}> */}
                        {/* <img src={require('../../assets/icons/logo2.png')} style={{width: '20%'}} /> */}
                        {/* <br /> */}
                        {/* <h3>Do Not Blink</h3>
                    </MDBCol> */}
                    <MDBCol sm={12} md={6} lg={6} style={{textAlign: 'center'}}>
                        <h4>Contact Us</h4>
                        <hr />
                        <p >
                            <span style={{marginTop: 10}}><i className="fa fa-location-arrow" ></i> {' '} Somewhere around </span> <br />
                            <span style={{marginTop: 10}}><i className="fa fa-phone" ></i> {' '}+9823 2378 2378</span> <br />
                            <span style={{marginTop: 10}}><i className="fa fa-envelope" ></i>{' '} asd@gmail.com</span>
                        </p>
                    </MDBCol>
                    <MDBCol sm={12} md={6} lg={6} style={{textAlign: 'center'}}>
                        <h4>Connect with us</h4>
                        <hr />
                        <MDBRow style={{marginTop: 35}}>
                            <MDBCol sm={4} md={4} lg={4} className="more_bottom">
                                    <Link to="#!" className="social_btn" ><i className='fab fa-facebook-f' ></i></Link>
                            </MDBCol>
                            <MDBCol sm={4} md={4} lg={4} className="more_bottom">
                                    <Link to="#!" className="social_btn"><i className='fab fa-twitter' ></i></Link>
                            </MDBCol>
                            <MDBCol sm={4} md={4} lg={4}>
                                    <Link to="#!" className="social_btn" ><i className='fab fa-instagram' ></i></Link>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>)
    }
}  