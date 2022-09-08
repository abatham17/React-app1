import React, { Component } from 'react';
import {
     OverlayTrigger,
    Tooltip, Nav, MenuItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { addVisitAction } from 'Front/actions/patient';
import { confirmAlert } from 'react-confirm-alert'; 

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
    
    render(){
        return (<div>
            <OverlayTrigger placement="top" overlay={<Tooltip id="status">Change Status</Tooltip>}>
                <Button simple icon bsStyle="danger">
                    <i className="fa fa-ban"></i>
                </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                <Link to={{ pathname: `/patient-edit`, state: this.props.patient }} bsStyle="success"><i className="fa fa-edit"></i></Link>
            </OverlayTrigger>
            <Nav>
                 <MenuItem eventKey={4.3} onClick={this.addVisit.bind(this, this.props.patient)}><i className="pe-7s-plus"></i> Add Visit</MenuItem>
            </Nav>
            
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

