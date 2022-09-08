import React, { Component } from 'react';
import {
    FormGroup, ControlLabel, FormControl,
    Grid, Row, Col
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { addUserAction } from 'Admin/actions/user';
import { uploadFileAction } from 'Admin/actions/user';
import { clinicListAction } from 'Admin/actions/clinic';
import { specializationListAction } from 'Admin/actions/specialization';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            clinicList: [],
            isEditing: false,
            user_nameError: null,
            emailError:null,
            fileError: null,
            passwordError:null,
            confirm_passwordError:null,
            groupError:null,
            clinicError:null,
            statusError:null,
            first_nameError:null,
            last_nameError:null,
            phoneError:null,
            specialization:null,
            specialization2:null,
            specializationError:null,
            degreeError:null,
            formData: {
                file: ""
            },
            tempFile:''
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(event.target.value) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }) : this.setState({ emailError: null });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
        event.target.value.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ passwordError: null });
    }
    handleCfPasswordChange(event) {
        this.setState({
            confirm_password: event.target.value
        });
        event.target.value !== this.state.password ? this.setState({ confirm_passwordError: (<small className="text-danger">Passwords do not match.</small>) }) : this.setState({ confirm_passwordError: null });
    }

    handleSelect(event) {
        this.setState({
            group: event.target.value
        });
        event.target.value === "" ? this.setState({ groupError: (<small className="text-danger">Group is required</small>) }) : this.setState({ groupError: null });
    }
    handleClinic(event) {

        let index = event.target.selectedIndex;

        this.setState({
            clinic: event.target.value,
            clinic_name: event.target[index].text
        });
        event.target.value === "" ? this.setState({ clinicError: (<small className="text-danger">Clinic is required</small>) }) : this.setState({ clinicError: null });
    }
    handleStatus(event) {
        this.setState({
            status: event.target.value
        });
        event.target.value === "" ? this.setState({ statusError: (<small className="text-danger">Status is required</small>) }) : this.setState({ statusError: null });
    }

    handlePhone(event){
        this.setState({
            phone: event.target.value
        });
        var digitRex = /^\d+$/;

        digitRex.test(event.target.value) === false ? this.setState({ phoneError: (<small className="text-danger">Phone number has to be a number.</small>) }) : (event.target.value.length !== 10) ? this.setState({ phoneError: (<small className="text-danger">Phone number at 10 digit.</small>) }) : this.setState({ phoneError: null });
    }
    handleTypeValidation(event) {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        emailRex.test(this.state.email) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }) : this.setState({ emailError: null });

        this.state.user_name === "" ? this.setState({ user_nameError: (<small className="text-danger">Username is required.</small>) }) : this.setState({ type_textError: null });

        this.state.password.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ type_textError: null });

        this.state.confirm_password !== this.state.password ? this.setState({ confirm_passwordError: (<small className="text-danger">Passwords do not match.</small>) }) : this.setState({ confirm_passwordError: null });

        this.state.group === "" ? this.setState({ groupError: (<small className="text-danger">Group is required.</small>) }) : this.setState({ groupError: null });

        this.state.clinic === "" ? this.setState({ clinicError: (<small className="text-danger">Clinic is required</small>) }) : this.setState({ clinicError: null });

        this.state.status === "" ? this.setState({ statusError: (<small className="text-danger">Status is required</small>) }) : this.setState({ statusError: null });

        this.state.first_name === "" ? this.setState({ first_nameError: (<small className="text-danger">First name is required.</small>) }) : this.setState({ first_nameError: null });

        this.state.last_name === "" ? this.setState({ last_nameError: (<small className="text-danger">Last name is required.</small>) }) : this.setState({ last_nameError: null });

        var digitRex = /^\d+$/;

        digitRex.test(this.state.phone) === false ? this.setState({ phoneError: (<small className="text-danger">Phone number has to be a number.</small>) }) : (this.state.phone.length != 10) ? this.setState({ phoneError: (<small className="text-danger">Phone number at 10 digit.</small>) }) : this.setState({ phoneError: null });

        this.state.degree === "" ? this.setState({ degreeError: (<small className="text-danger">Degree is required.</small>) }):this.setState({ degreeError: null });

        if(this.state.user_name != '' && this.state.user_nameError == null && this.state.emailError == null && this.state.passwordError == null && this.state.confirm_passwordError == null && this.state.groupError == null && this.state.clinicError == null && this.state.statusError == null && this.state.first_nameError == null && this.state.last_nameError == null && this.state.phoneError == null && this.state.specializationError == null && this.state.degreeError == null){

            //this.addUserHandler();

            this.props.uploadFileAction(this.state.tempFile);


        }
    }

    fileChangedHandler = (event, elename) => {
        let file = event.target.files[0];

        let formData = this.state.formData;
        formData['file'] = file.name;
        this.setState({tempFile:file,formData:formData});
    }
    handleChange = e => {

        e.preventDefault();

        let field = this.state.formData;

        field[e.target.name] = e.target.value;

        this.setState({ formData: field });

    };
    addUserHandler() {

        if (this.state.specialization != null) {
            this.state.specialization = this.state.specialization.map((key, i) => {
                return { id: key.value, name: key.label };
            });
        }

        this.props.addUserAction(this.state);

    }

    componentDidMount() {

      if(typeof this.props.location.state !== 'undefined'){
        this.setState({
            clinic: this.props.location.state._id,
            clinic_name: this.props.location.state.name,
            value: this.props.location.state._id
        });
      }
        this.props.clinicListAction(this.state)
        this.props.specializationListAction(this.state)

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isAddUserError !== this.props.isAddUserError) {
            if (nextProps.addUserMessage.errors) {
                nextProps.addUserMessage.errors.map((key, i) => {

                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }
        }
        if (nextProps.isUploadFile !== this.props.isUploadFile) {
            const _this = this;
            let field = this.state.formData;
            field['file'] = nextProps.uploadFile.file_name;

            this.setState({ formData: field });

            this.addUserHandler(field);
        }

        if (nextProps.isUploadFileError !== this.props.isUploadFileError) {
            if (nextProps.uploadFile.errors) {
                let uploaded_file = this.state.uploaded_file;
                nextProps.uploadFile.errors.map((key, i) => {
                    this.setState({ [uploaded_file + "Error"]: key.msg })
                });
            }
        }

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

        if (nextProps.isAddUserError === this.props.isAddUserError && nextProps.AddUserData && nextProps.AddUserData.status === 'Success' && nextProps.AddUserData.msg && this.state.user_name != '') {

            this.props.handleClick('success', nextProps.AddUserData.msg)
            this.props.history.push(`/admin/user-list`)
        }

    }

    render() {
        return (
            <div className="main-content" style={{ padding: '15px 0px' }}>

                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Add/Edit User"
                                content={
                                    <form>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Username: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="user_name" onChange={(event) => {
                                                        this.setState({ user_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ user_nameError: (<small className="text-danger">Username is required.</small>) }) : this.setState({ user_nameError: null });
                                                    }} />
                                                    {this.state.user_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Email adress: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="email" onChange={(event) => this.handleEmail(event)} />
                                                    {this.state.emailError}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Password: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="password" name="password" onChange={(event) => this.handlePasswordChange(event)} />
                                                    {this.state.passwordError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Confirm password: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="password" name="confirm_password" onChange={(event) => this.handleCfPasswordChange(event)} />
                                                    {this.state.confirm_passwordError}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <ControlLabel>Group: <span className="star">*</span></ControlLabel>
                                                    <select className="form-control" name="group" value={this.state.value} onChange={(event) => this.handleSelect(event)}>
                                                        <option value="">Select Group</option>
                                                        <option value="Educator">Educator</option>
                                                        <option value="Doctor">Doctor</option>
                                                        <option value="Receptionist">Receptionist</option>
                                                    </select>
                                                    {this.state.groupError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={5}>
                                                <FormGroup>
                                                    <ControlLabel>Clinic: <span className="star">*</span></ControlLabel>
                                                    <select className="form-control" name="clinic" value={this.state.clinic} onChange={(event) => this.handleClinic(event)} >
                                                        <option value="">Select Clinic</option>
                                                        {this.state.clinicList.map(function (item) {
                                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                                        })}
                                                    </select>
                                                    {this.state.clinicError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <ControlLabel>Status: <span className="star">*</span></ControlLabel>
                                                    <select className="form-control" name="status" value={this.state.status} onChange={(event) => this.handleStatus(event)}>
                                                        <option value="1">Enabled</option>
                                                        <option value="0">Disbled</option>
                                                    </select>
                                                    {this.state.statusError}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <ControlLabel>First Name: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="first_name" onChange={(event) => {
                                                        this.setState({ first_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ first_nameError: (<small className="text-danger">First name is required.</small>) }) : this.setState({ first_nameError: null });
                                                    }} />
                                                    {this.state.first_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <ControlLabel>Last Name: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="last_name" onChange={(event) => {
                                                        this.setState({ last_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ last_nameError: (<small className="text-danger">Last name is required.</small>) }) : this.setState({ last_nameError: null });
                                                    }} />
                                                    {this.state.last_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <ControlLabel>Phone: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="phone" onChange={(event) => this.handlePhone(event)} />
                                                    {this.state.phoneError}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <label className="control-label">Specialization</label>
                                                    <Select
                                                        placeholder="Select Specialization"
                                                        name="specialization"
                                                        id="specialization"
                                                        closeOnSelect={false}
                                                        multi={true}
                                                        value={this.state.specialization}
                                                        options={this.state.specializationList}
                                                        onChange={(value) => this.setState({ specialization: value })}
                                                    />
                                                    {this.state.specialization2Error}
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <ControlLabel>Degree: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="degree" onChange={(event) => {
                                                        this.setState({ degree: event.target.value });
                                                        event.target.value === "" ? this.setState({ degreeError: (<small className="text-danger">Degree is required.</small>) }) : this.setState({ degreeError: null });
                                                    }} />
                                                    {this.state.degreeError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <ControlLabel>Profile Photo:</ControlLabel>
                                                    <input type="file" name="file" onChange={e => { this.fileChangedHandler(e) }}></input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button type="button" bsStyle="info" fill pullRight onClick={this.handleTypeValidation.bind(this)}>
                                            Save
                                            </Button>
                                        <div className="clearfix"></div>
                                    </form>
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
        addUserMessage: state.user.message,
        isAddUser: state.user.isAddUser,
        AddUserData: state.user.AddUserData,
        isAddUserError: state.user.isAddUserError,

        ClinicList: state.clinic.ClinicList,
        isClinicList: state.clinic.isClinicList,
        isClinicListError: state.clinic.isClinicListError,

        SpecializationList: state.specilization.SpecializationList,
        isSpecializationList: state.specilization.isSpecializationList,
        isSpecializationListError: state.specilization.isSpecializationListError,

        isUploadFile: state.user.isUploadFile,
        isUploadFileError: state.user.isUploadFileError,
        uploadFile: state.user.uploadFile,

    }
}
export default withRouter(connect(mapStateToProps, { addUserAction, clinicListAction, specializationListAction, uploadFileAction })(AddUser));
