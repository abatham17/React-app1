import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col,Form,FormGroup,ControlLabel,FormControl,Select
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { addSpecializationAction } from 'Admin/actions/addspecialization';
import {selectAddSpecilization} from 'Admin/variables/Variables.jsx';
// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');
class AddSpecilization extends Component{

    constructor(props){
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      render(){
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
                                                <ControlLabel className="col-sm-2">
                                                </ControlLabel>
                                                <Col sm={12}>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormControl
                                                                type="text"
                                                                placeholder="Name"
                                                            />
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
                                                            <FormControl
                                                                type="text"
                                                                placeholder="Description"
                                                            />
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
                                                <Select
                                                    placeholder="Single Select"
                                                    name="singleSelect"
                                                    value={this.state.singleSelect}
                                                    options={selectAddSpecilization}
                                                    onChange={(value) => this.setState({ singleSelect: value})}
                                                />
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
                                                    <button type="button" class="btn-fill btn-wd btn btn-info">Submit</button>
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

    ClinicList: state.clinic.ClinicList, 
    isClinicList: state.clinic.isClinicList,
    isClinicListError: state.clinic.isClinicListError,

  }
}
export default withRouter(connect(mapStateToProps, { addSpecializationAction } )(AddSpecilization));
