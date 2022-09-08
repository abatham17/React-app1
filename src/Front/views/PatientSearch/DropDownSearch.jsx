import React, { Component } from 'react';
import {
     Row, Col, OverlayTrigger,
    Tooltip, Nav, NavDropdown, MenuItem,Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { addVisitAction } from 'Front/actions/patient';
import { confirmAlert } from 'react-confirm-alert'; 
import PatientRegistration from 'Front/views/Home/PatientRegistrationPopup.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

class DropDownSearch extends Component{

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
        
        if (nextProps.isAddVisitError === this.props.isAddVisitError && nextProps.addVisit && nextProps.addVisit.status === 'Success' && nextProps.addVisit.msg && this.state.formData.patient_id !== '') {  

            this.props.history.push(`/dashboard`)
        }

        if (nextProps.isAddVisitError !== this.props.isAddVisitError) { 
            if (nextProps.addVisit.errors) {
                nextProps.addVisit.errors.map((key, i) => {

                    return this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }

        }
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
            <OverlayTrigger placement="top" overlay={<Tooltip id="status">Change Status</Tooltip>}>
                <Button simple icon bsStyle="danger">
                    <i className="fa fa-ban"></i>
                </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                <a onClick={() => this.setState({ patientModal: true  })}><i className="fa fa-edit"></i></a>
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
                    

                    <MenuItem eventKey={4.4} onClick={this.props.dietBox.bind(this, this.props.patient)}><i className="fa fa-cutlery"></i> DIET</MenuItem>
                    
                    <MenuItem eventKey={4.2} onClick={this.props.knowledgeShare.bind(this, this.props.patient)}><i className="pe-7s-next-2"></i> SHARE</MenuItem>

                    <MenuItem eventKey={4.3} onClick={this.addVisit.bind(this, this.props.patient)}><i className="pe-7s-plus"></i> ADD VISIT</MenuItem>

                    <MenuItem eventKey={4.4} data-id={this.props.chatPatientId} onClick={this.props.chatBox.bind(this,this.props.chatPatientId,this.props.chatPatientDetails)}><i className="pe-7s-chat"></i> CHAT</MenuItem>
                </NavDropdown>
            </Nav>
            <Modal className="pa-patient-registration"  show={this.state.patientModal} onHide={() => this.setState({ patientModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Patient Registration</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="Knowledge-Share card">
                        <Row>
                            <Col md={12}>
                                       <PatientRegistration  onDismiss={this.onDismiss} patientData={this.props.patient}  />         
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

        addVisit: state.patient.addVisit,
        isAddVisit: state.patient.isAddVisit,
        isAddVisitError: state.patient.isAddVisitError,

    }
}
export default withRouter(connect(mapStateToProps, { addVisitAction })(DropDownSearch));

