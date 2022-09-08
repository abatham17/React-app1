import React, { Component } from 'react';

import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { updateEducatorAction } from 'Admin/actions/educator';
import { clinicListAction } from 'Admin/actions/clinic';
import { specializationListAction } from 'Admin/actions/specialization';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
    message: 'required'
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class UpdateEducator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicList: [],
            specializationList: [],
            cardHidden: true,
            formArr: [],
            oldspecializations:this.props.location.state.row,
            formData: {
                message: this.props.location.state.row.message,
                description: this.props.location.state.row.description,
                clinicId: this.props.location.state.row.clinicId,
                clinicName: this.props.location.state.row.clinicName,
                status: this.props.location.state.row.status,
                specialization: [],
                id: this.props.location.state.row._id,
            },
            isLogin: true,
            showProcessing: false,
        }

    }

    componentDidMount() {

        this.props.clinicListAction(this.state)
        this.props.specializationListAction(this.state)

    }

    componentWillMount(){
        var oldspecializations=this.state.oldspecializations.specializations;
        debugger
        var x =null
        let Spec=[];
        if(oldspecializations){
            for (x in oldspecializations){
                let obj={};
                obj.label=oldspecializations[x].name;
                obj.value=oldspecializations[x].id;
                Spec.push(obj);
            }debugger
            //this.state.specialization
            this.setState({specialization:Spec})
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.isClinicList !== this.props.isClinicList) {

            this.setState({
                clinicList: nextProps.ClinicList.data.data
            });
        }

        if (nextProps.isSpecializationList && nextProps.isSpecializationList !== this.props.isSpecializationList) {
            this.state.specializationList = nextProps.SpecializationList.data.map((key, i) => {
                return { value: key._id, label: key.name };
            });
        }

        if (nextProps.isUpdateEducatorError !== this.props.isUpdateEducatorError) { 
            if (nextProps.UpdateEducatorMessage.errors) {
                nextProps.UpdateEducatorMessage.errors.map((key, i) => {

                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }

        }debugger
        if(nextProps.updateEducatorAction && nextProps.isUpdateEducator){ 
            this.props.handleClick('success',nextProps.msg)
            this.props.history.push('/admin/educator-list')

        }

          
    } 
    handleSpecialization(field) {

        let entry = [];
        let data = this.state.formData;
        field.map((key, index) =>
            entry.push({
                "id": key.value,
                "name": key.label
            })
        );
        data["specialization"] = entry;
        this.setState({ formData: data });
    }

    addEducator(evt) {
        evt.preventDefault();
        if (this.state.specialization != null) {
            var spArr = this.state.specialization.map((key, i) => {
                return { id: key.value, name: key.label };
            });
            this.state.formData.specializations = spArr;
        }

        if (this.allValidate(false)) {

            this.props.updateEducatorAction(this.state.formData);

        }
    }
    allValidate(check) {
        if (!check) {
            formArr = []
            Object.keys(rules).forEach(function (key) {
                formArr[key] = "TT";
            });
            this.setState({
                formArr
            });
        }
        if (validation.passes()) {
            return 1;
        }
    }
    handleClinicChange(event) {
        let formData = this.state.formData;
        formData["clinicName"] = event.target[event.target.selectedIndex].text;
        formData["clinicId"] = event.target.value;
        this.setState({ formData: formData });
    }
    handleChange(e) {
        e.preventDefault();
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;

        this.setState({ formData: formData });
    }

    render() {
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        return (
            <div className="main-content" style={{ padding: '15px 0px' }}>
                <Grid fluid>
                    <Row>

                        <Col md={12}>
                            <Card
                                content={
                                    <Form horizontal>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Message <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="text" name="message" value={this.state.formData.message} onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">{this.state.formArr.message && validation.errors.first('message')}</span>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Description
                                        </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" bsClass="form-control" name="description" value={this.state.formData.description} onChange={e => { this.handleChange(e); }} defaultValue="" />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Status <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <select className="form-control" name="status" value={this.state.formData.status} onChange={(event) => this.handleChange(event)}>
                                                    <option value="1">Enabled</option>
                                                    <option value="0">Disbled</option>
                                                </select>
                                                {this.state.statusError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Clinic:
                                        </Col>
                                            <Col sm={6}>
                                                <FormControl componentClass="select" name="clinicId" value={this.state.formData.clinicId} onChange={e => { this.handleChange(e); this.handleClinicChange(e); }}>
                                                    <option value="">Please select</option>
                                                    {this.state.clinicList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.short_name}</option>
                                                    })}
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Specialization:
                                        </Col>
                                            <Col sm={6}>
                                                <Select
                                                    placeholder="Select Specialization"
                                                    name="specialization"
                                                    id="specialization"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    value={this.state.specialization}
                                                    options={this.state.specializationList}
                                                    onChange={(value) => { this.setState({ specialization: value }); this.handleSpecialization(value) }}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}></Col>
                                            <Col sm={6}>
                                                <button type="button" onClick={this.addEducator.bind(this)} className="btn-fill btn-wd btn btn-info">Submit</button>
                                            </Col>
                                        </FormGroup>
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
        UpdateEducator: state.educator.UpdateEducator,
        isUpdateEducator: state.educator.isUpdateEducator,
        isUpdateEducatorError: state.educator.isUpdateEducatorError,

        ClinicList: state.clinic.ClinicList,
        isClinicList: state.clinic.isClinicList,
        isClinicListError: state.clinic.isClinicListError,

        SpecializationList: state.specilization.SpecializationList,
        isSpecializationList: state.specilization.isSpecializationList,
        isSpecializationListError: state.specilization.isSpecializationListError,
    }
}
export default withRouter(connect(mapStateToProps, { updateEducatorAction, clinicListAction, specializationListAction })(UpdateEducator));
