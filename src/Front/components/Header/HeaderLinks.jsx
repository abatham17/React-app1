import React, { Component } from 'react';
import {
    Nav, NavItem, NavDropdown, MenuItem,
    Col, Row, Modal
} from 'react-bootstrap';
import * as PF from "Front/views/Home/PublicFunction.jsx"
import history from '../../routes/history';
import Chat from './Chat';
import PatientRegistration from 'Front/views/Home/PatientRegistrationPopup.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import { LinkContainer } from 'react-router-bootstrap';
import { getChatCountAction } from 'Front/actions/master';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class HeaderLinks extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            chatModal: false,
        }
        this.onDismiss = this.onDismiss.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.openChatModel = this.openChatModel.bind(this);
        this.hideChatModel = this.hideChatModel.bind(this);
    }

    componentDidMount(){
        this.props.getChatCountAction();
    }

     componentWillReceiveProps(nextProps){

         if(nextProps.isGetChatCount !== this.props.isGetChatCount){           
            let chatCounts = nextProps.GetChatCount.chatCounts;
            let totalCount = 0;
            let AllChatCount = 0;
            let forwardedChatCount = 0;
            let byEducatorChatCount = 0;
            for(let i in chatCounts){
                if(chatCounts[i]._id === 'chat'){   
                  totalCount = totalCount + chatCounts[i].count;
                  AllChatCount = chatCounts[i].count;
                }
                else if(chatCounts[i]._id === 'forwarded'){ 
                  totalCount = totalCount + chatCounts[i].count; 
                  forwardedChatCount = chatCounts[i].count;
                }
                else if(chatCounts[i]._id === 'byEducator'){
                  totalCount = totalCount + chatCounts[i].count;  
                  byEducatorChatCount = chatCounts[i].count;
                }
            }
            localStorage.setItem('AllChatCount',AllChatCount)  
            localStorage.setItem('forwardedChatCount',forwardedChatCount)  
            localStorage.setItem('byEducatorChatCount',byEducatorChatCount)   
            localStorage.setItem('AllCount',totalCount)   
         }
    }


    Logout() {
        localStorage.removeItem('_id')
        localStorage.removeItem('userName')
        localStorage.removeItem('userType')
        localStorage.removeItem('email')
        localStorage.removeItem('status')
        localStorage.removeItem('token')
        localStorage.removeItem('degree')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        history.push({ pathname: '/login' });
        window.location.reload(true);
    }
    navigateTo(page) {
        history.push({ pathname: page });
    }

    refreshPage(e) {
        e.preventDefault();

        window.location.reload(true);
    }

    onDismiss() {
        this.setState({ patientModal: false });
        this.successAlert('Patient Successfully Registered');
    }

    successAlert(msg) {

        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Success"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    {msg}
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: false
        });
    }

    openChatModel(){
      
       this.setState({ chatModal: true });

       this.props.chatModel(true);

    }

    hideChatModel(){
      
       this.setState({ chatModal: false });

       this.props.chatModel(false);

    }

    render() {

        
        return (
            <div className="front-nav">
                {this.state.alert}
                <Nav pullRight>

                    <NavItem eventKey={3} onClick={this.refreshPage.bind(this)}>
                        <i className="pe-7s-refresh-2"></i>
                        <br />
                        <span>Refresh</span>
                    </NavItem>
                    <LinkContainer to="/dashboard">
                        <NavItem eventKey={4}>
                            <i className="pe-7s-home"></i><br />
                            <span>Home</span>
                        </NavItem>
                    </LinkContainer>  

                    <LinkContainer to="/patient-search">
                        <NavItem eventKey={5}>
                            <i className="pe-7s-search"></i><br />
                            <span>Pt Search</span>
                        </NavItem>
                    </LinkContainer>                                 

                    {localStorage.getItem('userType') !== 'receptionist' &&
                        <NavItem eventKey={6} onClick={() => this.setState({ patientModal: true })} >
                            <i className="pe-7s-note2"></i><br />
                            <span>Registration</span>
                        </NavItem>
                    }

                    {localStorage.getItem('userType') !== 'receptionist' &&
                        <NavItem eventKey={7} onClick={this.openChatModel.bind(this)}>
                            <i className="pe-7s-chat"></i><br />
                            <span>Chat</span>
                            {((this.props && this.props.AllCount!==0) || (localStorage.getItem('AllCount') && localStorage.getItem('AllCount') !== 0)) &&
                            <span className="chatCount">{localStorage.getItem('AllCount')}</span>
                            }
                        </NavItem>
                    }


                    <NavDropdown
                        eventKey={2}
                        title={(
                            <div>
                                <i className="pe-7s-config"></i><br />Settings & Requests
                                <p className="hidden-md hidden-lg">
                                    Actions
                                    <b className="caret"></b>
                                </p>
                            </div>
                        )} noCaret id="basic-nav-dropdown-1">

                        <MenuItem onClick={this.navigateTo.bind(this, 'clinic-calenders')} eventKey={2.1}>Calendar</MenuItem>
                        <MenuItem onClick={this.navigateTo.bind(this, 'change-password')} eventKey={2.2}>Change Password</MenuItem>
                        {localStorage.getItem('userType') !== 'receptionist' &&
                            <MenuItem onClick={this.navigateTo.bind(this, 'manage-request')} eventKey={2.3}>Manage Request</MenuItem>
                        }
                        {localStorage.getItem('userType') !== 'receptionist' &&
                            <MenuItem onClick={this.navigateTo.bind(this, 'user-list')} eventKey={2.4}>Users</MenuItem>
                        }
                    </NavDropdown>
                    {localStorage.getItem('userType') !== 'receptionist' &&
                        <NavItem eventKey={3} onClick={this.navigateTo.bind(this, 'color-notations')}>
                            <i className="pe-7s-help2"></i><br />
                            <span>Color Notations</span>
                        </NavItem>
                    }
                    <NavItem eventKey={3} onClick={this.Logout.bind(this)}>
                        <i className="pe-7s-back"></i><br />
                        <span>Logout</span>
                    </NavItem>

                    <NavItem eventKey={3} >
                        <Row>
                            <Col md={9} className="doctor-info">
                                <span>{localStorage.getItem('degree')} {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</span><br />
                                <span>Clinic ID: {localStorage.getItem('clinicNumber')}</span>
                            </Col>
                            <Col md={3} className="doctor-icon">
                                <img style={{ width: '30px', margin: '4px' }} src={localStorage.getItem('profilePhoto')!==''?PF.baseUrl("public/uploads/"+localStorage.getItem('profilePhoto')):"../../../images/dr-img.png"} alt="Dr Img" />

                                
                            </Col>
                        </Row>
                    </NavItem>

                </Nav>

                <Modal className="pa-chat-md" show={this.state.chatModal} onHide={this.hideChatModel.bind(this)} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Chat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Knowledge-Share">
                        <Row>
                            <Col md={12}>
                                <Chat activeAllChat={true} />
                            </Col>
                        </Row>
                    </Modal.Body>

                </Modal>
                <Modal className="pa-patient-registration" show={this.state.patientModal} onHide={() => this.setState({ patientModal: false })} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Patient Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Knowledge-Share card">
                        <Row>
                            <Col md={12}>
                                <PatientRegistration onDismiss={this.onDismiss} />
                            </Col>
                        </Row>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {      
          isGetChatCount: state.master.isGetChatCount,
          isGetChatCountError: state.master.isGetChatCountError,
          GetChatCount: state.master.GetChatCount,    
    }

  }
  export default withRouter(connect(mapStateToProps, { getChatCountAction } )(HeaderLinks));