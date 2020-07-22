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
            <MDBNavbar dark expand="md" fixed="top" >
                <MDBNavbarBrand>
                    <Link to="/"><img src={require('../assets/icons/logo.jpg')} style={{width: '40%'}}/></Link>
                </MDBNavbarBrand>
                <MDBNavbarNav right>
                    {window.innerWidth > 800 ? <>
                        <MDBNavLink className="active_links" to="/about" >About</MDBNavLink>
                        <MDBNavLink to="/content" >Content</MDBNavLink>
                        <MDBNavLink to="/" color="success" style={{ border: '2px solid #00c851', background: 'transparent', color: '#00c851', margin: '0px 8px', borderRadius: 3, padding: '8px 15px' }} onClick={() => this.props.history.push('/')} >Learn</MDBNavLink>
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
                            <MDBNavLink to="/" color="success" style={{ border: '2px solid #00c851', background: 'transparent', color: '#00c851', margin: '0px 8px', borderRadius: 3, padding: '8px 15px' }} onClick={() => {
                                this.SideBar()
                                this.props.history.push('/')
                            }} >Learn It!</MDBNavLink>

                        </li>
                        <li className="active_links">
                            <MDBNavLink to="/about" onClick={this.SideBar}>About</MDBNavLink>
                        </li>
                        <li >
                            <MDBNavLink to="/content" onClick={this.SideBar}>Content</MDBNavLink>
                        </li>
                    </MDBSideNav>
                </MDBContainer>
                : null}


            <MDBContainer style={{ height: window.innerHeight - 200, marginTop: '20%' }}>
                <MDBRow>
                    <MDBCol size={2} md={4} lg={4}>
                        <h1>About</h1>
                    </MDBCol>
                    <MDBCol sm={12} md={8} lg={8} >
                        <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h5>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {/* <div className="header" style={{ height: 200, background: '#000000' }}>
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
            </div> */}
        </div>
    }
}