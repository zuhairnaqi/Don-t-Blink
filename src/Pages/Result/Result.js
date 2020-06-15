import React, { Component } from 'react';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBListGroup, MDBListGroupItem } from "mdbreact"
import { Link } from 'react-router-dom'
import './style.css';
import { connect } from 'react-redux';
import AlertMessage from '../../components/Alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNav: false,
            copied: false
        }
    }
    SideBar = () => {
        this.setState({ openNav: !this.state.openNav })
    }
    componentWillMount() {
        this.props.sentences.length == 0 && this.props.history.push('/')
    }
    render() {
        
        return (<>
            {this.state.copied && <AlertMessage message={'Copy To Clipboard!!'} />}
            {/* navbar */}
            <MDBNavbar dark expand="md" fixed="top" >
                <MDBNavbarBrand>
                    <Link to="/"><strong className="dark-text">DO NOT BLINK</strong></Link>
                </MDBNavbarBrand>
                <MDBNavbarNav right>
                    {window.innerWidth > 800 ? <>
                        <MDBNavLink to="/about" >About</MDBNavLink>
                        <MDBNavLink to="/content" >Content</MDBNavLink>
                    </> : <MDBBtn outline={true} color="black" id="hamburgher" onClick={() => this.SideBar()}>
                            <MDBIcon size="md" icon="bars" />
                        </MDBBtn>}
                </MDBNavbarNav>
            </MDBNavbar>
            {/* side navbar */}
            {this.state.openNav ?
                <MDBContainer>
                    <MDBSideNav
                        fixed={true}
                        slim={true}
                        hidden
                        triggerOpening={this.state.openNav}
                        breakWidth={1500}
                    >
                        <li style={{
                            padding: '30px 20px',
                            textAlign: 'center',
                            margin: '0 auto',
                        }}>
                            <Link to="/" onClick={this.SideBar}> DO NOT BLINK </Link>
                        </li>
                        <li >
                            <MDBNavLink to="/about" onClick={this.SideBar}>
                                About
                    </MDBNavLink>
                        </li>
                        <li>
                            <MDBNavLink to="/content" onClick={this.SideBar}>
                                Content
                    </MDBNavLink>
                        </li>
                    </MDBSideNav>
                </MDBContainer>
                : null}

            <div className="result_container">
                <div>
                    <h4 style={{ cursor: "pointer" }}>You learnt it!</h4>
                    <MDBBtn outline={true} color="warning" onClick={() => this.props.history.push("/")} style={{borderRadius: 50}}>
                        Start a new set
                        </MDBBtn>
                    <h4 style={{ cursor: "pointer" }}>Don’t leave your friends stupid!</h4>
                    <CopyToClipboard text={this.props.sentences.map(data => data.sentence).join('\n')}
                        onCopy={() => {
                            this.setState({ copied: true })
                            setTimeout(() => this.setState({ copied: false }), 2000)
                        }}
                    >
                        <MDBBtn style={{borderRadius: 50}} color="success" outline={true}>Share this set!</MDBBtn>
                    </CopyToClipboard>
                </div>
            </div>
        </>)
    }
}




const mapStateToProps = state => ({
    sentences: state.sentences
})


export default connect(mapStateToProps)(Result);