import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import loadingImg from 'Admin/assets/img/loading.gif';
import { addEducatorAction } from 'Admin/actions/educator';
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

class AddEducator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicList: [],
            specializationList: [],
            cardHidden: true,
            formArr: [],
            formData: {
                message: "",
                description: "",
                clinicId: "",
                clinicName: "",
                status: "active",
                specialization: [],
            },
            isLogin: true,
            showProcessing: false,
        }

    }

    componentDidMount() {

        this.props.clinicListAction(this.state)
        this.props.specializationListAction(this.state)

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
        if (nextProps.AddEducator && nextProps.AddEducator.status) {
            this.props.handleClick('success', nextProps.AddEducator.status)
            this.props.history.push('/educator-list')

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

        if (this.allValidate(false)) {

            this.props.addEducatorAction(this.state.formData);

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
                                                <FormControl type="text" name="message" onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">{this.state.formArr.message && validation.errors.first('message')}</span>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Description
                                        </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" bsClass="form-control" name="description" onChange={e => { this.handleChange(e); }} defaultValue="" />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Status <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <select className="form-control" name="status" value={this.state.value} onChange={(event) => this.handleStatus(event)}>
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
                                                <FormControl componentClass="select" name="clinicId" onChange={e => { this.handleChange(e); this.handleClinicChange(e); }}>
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
        AddEducator: state.educator.AddEducator,
        isAddEducator: state.educator.isAddEducator,
        isAddEducatorError: state.educator.isAddEducatorError,

        ClinicList: state.clinic.ClinicList,
        isClinicList: state.clinic.isClinicList,
        isClinicListError: state.clinic.isClinicListError,

        SpecializationList: state.specilization.SpecializationList,
        isSpecializationList: state.specilization.isSpecializationList,
        isSpecializationListError: state.specilization.isSpecializationListError,
    }
}
export default withRouter(connect(mapStateToProps, { addEducatorAction, clinicListAction, specializationListAction })(AddEducator));
