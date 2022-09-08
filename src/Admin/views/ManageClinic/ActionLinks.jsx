import React, { Component } from 'react';
import {
     Row, Col, OverlayTrigger,
    Tooltip,  Nav,  NavDropdown, MenuItem,Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import SweetAlert from 'react-bootstrap-sweetalert';
import { LinkContainer } from 'react-router-bootstrap';
class ActionLinks extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            formData:{
                patient_id:"",
                height:"",
                weight:"",
                remark:"",
            }
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

    }

    componentWillReceiveProps(nextProps){

    }
    addVisit(patient){
        let field = this.state.formData;
        field['patient_id']  = patient.id;
        field['height']  = patient.height?patient.height:'';
        field['weight']  = patient.weight?patient.weight:'';
        field['remark']  = '';
        this.setState({formData:field});
        confirmAlert({
            title: 'Confirm to add visit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.addVisitAction(this.state.formData)
              },
              {
                label: 'No',
                onClick: () => this.resetFormData()
              }
            ]
          })
    }


    resetFormData(){
        let field = this.state.formData;
        field['patient_id']  = '';
        field['height']  = '';
        field['weight']  = '';
        field['remark']  = '';
        this.setState({formData:field});
    }

    onDismiss() {
        this.setState({ patientModal: false });
        this.successAlert('Patient Successfully Updated');
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

    render(){
        return (<div>
         {this.state.alert}
            <OverlayTrigger placement="top" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                <Link to={{ pathname: `/admin/update-clinic/`, state: this.props.clinicDetails }} ><i class="fa fa-pencil" aria-hidden="true"></i></Link>
            </OverlayTrigger>
            <Nav>
                <NavDropdown
                    eventKey={4}
                    title={(
                        <div>
                             More
                                <b className="caret"></b>
                        </div>
                    )} noCaret id="basic-nav-dropdown-3" bsClass="dropdown-with-icons dropdown">
                    <LinkContainer to={{ pathname: `update-clinic`, state: this.props.clinicDetails }}>
                        <MenuItem eventKey={4.1}><i className="fa fa-info-circle"></i> Clinic Details</MenuItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: `add-clinic-subscription`, state: this.props.clinicDetails }}>
                      <MenuItem eventKey={4.2}><i className="fa fa-bell"></i> Subscription</MenuItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: `add-clinic-calendar`, state: this.props.clinicDetails }}>
                      <MenuItem eventKey={4.4} data-id={this.props.chatPatientId} ><i className="fa fa-calendar"></i> Set Calender</MenuItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: `/admin/add-user`, state: this.props.clinicDetails }}>
                      <MenuItem eventKey={4.5} data-id={this.props.chatPatientId} ><i className="fa fa-user-circle"></i> Manage Users</MenuItem>
                    </LinkContainer>
                    <MenuItem eventKey={4.7} data-id={this.props.chatPatientId} ><i className="fa fa-times-circle"></i> Disable</MenuItem>
                </NavDropdown>
            </Nav>
            <Modal className="pa-patient-registration"  show={this.state.patientModal} onHide={() => this.setState({ patientModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Patient Registration</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="Knowledge-Share card">
                        <Row>
                            <Col md={12}>

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


    }
}
export default withRouter(connect(mapStateToProps, {  })(ActionLinks));
