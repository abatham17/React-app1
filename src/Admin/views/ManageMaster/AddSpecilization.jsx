import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col,Form,FormGroup,ControlLabel,FormControl
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { addSpecializationAction } from 'Admin/actions/specialization';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');
let Validator = require('validatorjs');
let formArr = {};

let rules = {
    Name: 'required',
    description: 'required',
};
let mess = {
  required: 'This field is required',
  alpha: 'This field may only contain letters',
  numeric: 'This field must be a number',
  email: 'This field must be a valid email address.',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();






class AddSpecilization extends Component{

    constructor(props){
        super(props);
        this.state = {
          cardHidden: true,
          showModal: false,
          formArr:[],
          formData:{    
            Name: "",
            description: "",
            status:"active"  
          },
          isLogin:true,
        }
    }

    AddAction(evt){
        evt.preventDefault();
    
        if(this.allValidate(false)){
          
            this.props.addSpecializationAction(this.state.formData);
      
        }
      }
    allValidate(check){
        if(!check){
          formArr = []
          Object.keys(rules).forEach(function(key) {
              formArr[key]= "TT";
          });
          this.setState({
              formArr
          });
        }
        if(validation.passes()){
          return 1;
        }
    }

      handleChange(e) {
        e.preventDefault();
        let formData = this.state.formData; 
        formData[e.target.name] = e.target.value;

        this.setState({formData: formData});
      }
      componentDidMount(){
        //this.props.addSpecializationAction(this.state.formData);
    }

      componentWillReceiveProps(nextProps){
        if(nextProps.AddSpecilization && nextProps.AddSpecilization.status){ 
                this.props.handleClick('success',nextProps.AddSpecilization.status)
                this.props.history.push('/specialization-list')

        } 
    }
      render(){
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Add Specialization</legend>}
                                content={
                                    <Form horizontal>
                                        
                                        <fieldset>
                                            <FormGroup>
                                                <Col sm={12}>
                                                    <Row>
                                                        <Col md={6}>
                                                        <ControlLabel>Name<span className="star">*</span></ControlLabel>
                                                            <FormControl
                                                                type="text"
                                                                name="Name"
                                                                id="Name"
                                                                placeholder="Name"
                                                                onChange={e => { this.handleChange(e); }}
                                                            />
                                                            <span className="message">{this.state.formArr.Name && validation.errors.first('Name')}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <Col sm={12}>
                                                    <Row>
                                                        <Col md={6}> 
                                                        <ControlLabel>Description<span className="star">*</span></ControlLabel>
                                                            <FormControl
                                                                type="text"
                                                                name="description"
                                                                id="description"
                                                                placeholder="Description"
                                                                onChange={e => { this.handleChange(e); }}
                                                            />
                                                            <span className="message">{this.state.formArr.description && validation.errors.first('description')}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <Col sm={12}>
                                                    <Row>
                                                    <Col md={6}>
                                                    <ControlLabel>Status</ControlLabel>
                                                  <select className="form-control" name="status" value={this.state.formData.singleSelect} onChange={e => { this.handleChange(e); }}>
                                                    <option value="active">Enable</option>
                                                    <option value="inactive">Disable</option>
                                                   </select>
                                            </Col>
                                                    </Row>
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                </ControlLabel>
                                                <Col sm={12}>
                                                    <Row>
                                                    <Col md={6}>
                                                    <button type="button" onClick={this.AddAction.bind(this)} className="btn-fill btn-wd btn btn-info">Submit</button>
                                            </Col>
                                                    </Row>
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    msg: state.specilization.message,
    AddSpecilization:state.specilization.isAddSpeciliData, 
    isAddSpecilization: state.specilization.isAddSpecilizatio,
    isAddSpecilizationError: state.specilization.isAddSpecilizationError,

  }
}
export default withRouter(connect(mapStateToProps, { addSpecializationAction } )(AddSpecilization));
