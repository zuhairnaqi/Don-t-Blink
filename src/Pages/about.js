import React from 'react'
import '../App.css';
import { MDBCol, MDBContainer, MDBRow } from "mdbreact"
import {Navbar} from '../components/navbar';
import FullScreenMode from '../components/FullScreen';

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
           <Navbar quit={false} />

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
           <FullScreenMode />
        </div>
    }
}