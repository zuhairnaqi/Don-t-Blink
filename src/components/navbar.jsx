import React, { useState } from 'react';
import { MDBAnimation, MDBInput, MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSideNav, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavLink, MDBListGroup, MDBListGroupItem } from "mdbreact"
import { Link } from 'react-router-dom'

export const Navbar = (props) => {
    let { hideAll, quit } = props;
    let [openNav, setNav] = useState(false);

    const SideBar = () => {
        setNav(!openNav);
    }

    return (<>
        <MDBNavbar dark expand="md" fixed="top" className={hideAll ? 'opa_hide' : 'opa_show'}>
            <MDBNavbarBrand>
                <Link to="/"><img src={require('../assets/icons/logo.jpg')} style={{ width: '40%' }} /></Link>
            </MDBNavbarBrand>
            <MDBNavbarNav right>
                {window.innerWidth > 900 ? <>
                    <MDBNavLink to="/about" >About</MDBNavLink>
                    <MDBNavLink to="/content" >Content</MDBNavLink>
                    {quit && <MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }} >Quit</MDBNavLink>}

                </> : <MDBBtn outline={true} color="black" id="hamburgher" onClick={() => SideBar()}>
                        <MDBIcon size="md" icon="bars" />
                    </MDBBtn>}
            </MDBNavbarNav>
        </MDBNavbar>
        {/* side navbar */}
        {openNav ?
            <MDBContainer>
                <MDBSideNav
                    fixed={true}
                    slim={true}
                    hidden
                    triggerOpening={openNav}
                    breakWidth={1500}
                >
                    <li style={{
                        padding: '30px 20px',
                        textAlign: 'center',
                        margin: '0 auto',
                    }}>
                        <Link to="/" onClick={SideBar}> DO NOT BLINK </Link>
                    </li>
                    <li >
                        <MDBNavLink to="/about" onClick={SideBar}>
                            About
    </MDBNavLink>
                    </li>
                    <li >
                        <MDBNavLink to="/content" onClick={SideBar}>
                            Content
    </MDBNavLink>
                    </li>
                    {quit && <li >
                        <MDBNavLink to="/" color={'danger'} outline={true} style={{ border: '2px solid #ff3547', background: 'transparent', color: '#ff3547', margin: '0px 8px', borderRadius: 3, padding: '8px 20px' }}  >Quit</MDBNavLink>
                    </li>}

                </MDBSideNav>
            </MDBContainer>
            : null}
    </>)
}