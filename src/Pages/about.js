import React from 'react'
import '../App.css';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBSideNavLink, MDBSideNavCat, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBSideNavNav } from "mdbreact"
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openNav: false,
            desktop: false
        }
    }
    SideBar = () => {
        this.setState({ openNav: !this.state.openNav })
    }
    componentDidMount() {
        window.addEventListener('resize', this.UpdateDesktop)
    }
    componentWillMount() {
        window.addEventListener('resize', this.UpdateDesktop)
    }
    UpdateDesktop = () => {
        this.setState({ desktop: !this.state.desktop })
    }
    render() {

        return <div>
            {/* navbar */}
            <MDBNavbar dark expand="md" fixed >
                <MDBNavbarBrand>
                    <Link to="/"><strong className="dark-text">DO NOT BLINK</strong></Link>
                </MDBNavbarBrand>
                <MDBNavbarNav right>
                    {window.innerWidth > 800 ? <> <MDBNavLink to="/" >Home</MDBNavLink>
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
                            borderBottom: '1px solid white'

                        }}>
                            DO NOT BLINK
                 </li>
                        <li>
                            <MDBNavLink to="/" onClick={this.SideBar}>
                                Home
                    </MDBNavLink>
                        </li>
                        <li >
                            <MDBNavLink to="/content" onClick={this.SideBar}>Content</MDBNavLink>
                        </li>
                    </MDBSideNav>
                </MDBContainer>
                : null}
            <div className="header" style={{ height: 200, background: '#000000' }}>
            </div>

            <div className="fake-bg" >
                <div className="card-section" >
                    <div className="section-content section-content-page" >
                        <MDBContainer >
                            <article >
                                <header className="entry-header">
                                    <h1 className="entry-title entry-title-cover-empty">About</h1>
                                    <div className="post-letter">A</div>
                                </header>
                                <div className="entry-content clearfix" >
                                    <p>write content here...     </p>
                                </div>
                            </article>
                        </MDBContainer>
                    </div>
                </div>
            </div>
        </div>
    }
}