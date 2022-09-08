import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { uploadFileAction } from 'Admin/actions/faq';
import { addFaqAction } from 'Admin/actions/faq';
import { clinicListAction } from 'Admin/actions/clinic';
import { specializationListAction } from 'Admin/actions/specialization';

var googleTranslate = require('google-translate')(process.env.REACT_APP_GOOGLE_KEY);


let Validator = require('validatorjs');
let formArr = {}
let rules = {
    question_english: 'required',
    question_hindi: 'required',
    answer_english: 'required',
    answer_hindi: 'required',
    file: 'required'
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class AddFaq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicList: [],
            specializationList: [],
            specialization: null,
            category: null,
            cardHidden: true,
            formArr: [],
            clinicError: null,
            specializationError: null,
            question_englishError: null,
            fileError: null,
            descriptionError: null,
            orderError: null,
            categoryError: null,
            statusError: null,
            formData: {
                clinicName: "",
                clinicId: "",
                order: "",
                question_english: "",
                question_hindi: "",
                answer_english: "",
                answer_hindi: "",
                status: "active",
                specializations: [],
                file: []
            },
            isLogin: true,
            showProcessing: false,
        }
        this.saveComment = this.saveComment.bind(this);



        //this.ssss=this.ssss.bind();

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

        if (nextProps.isAddFaqError !== this.props.isAddFaqError) {
            
            if (nextProps.AddFaqMessage.errors) {
                nextProps.AddFaqMessage.errors.map((key, i) => {

                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }

        }
        if (nextProps.isUploadFile !== this.props.isUploadFile) {

            let uploaded_file = this.state.uploaded_file;
            let field = this.state.formData;
            field[uploaded_file] = nextProps.uploadFile.file_name;
            this.setState({ formData: field });
        }

        if (nextProps.isUploadFileError !== this.props.isUploadFileError) {
            if (nextProps.uploadFile.errors) {
                let uploaded_file = this.state.uploaded_file;
                nextProps.uploadFile.errors.map((key, i) => {
                    this.setState({ [uploaded_file + "Error"]: key.msg })
                });
            }
        }
        if (nextProps.addFaqAction && nextProps.isAddFaq) {
            this.props.handleClick('success', nextProps.msg)
            this.props.history.push('/admin/faq-list')

        }


    }
    saveComment(e) {
        if(e.keyCode == 13){
        let _this = this;
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
       
         googleTranslate.translate(e.target.value, 'en' , 'hi', function(err, translation) {
       
             let field = _this.state.formData;
             field[fieldName] = translation.translatedText;
            _this.setState({ formData: field });
          
         });

        }
    }
     
    handleChange = e => {
      
        e.preventDefault();

        let field = this.state.formData;

        field[e.target.name] = e.target.value;

        this.setState({ formData: field });

    };

    handleClinic(event) {

        let index = event.target.selectedIndex;
        this.state.formData.clinicId = event.target.value
        this.state.formData.clinicName = event.target[index].text

    }
    fileChangedHandler = (event, elename) => {
        event.preventDefault();
        this.setState({ uploaded_file: elename });
        let reader = new FileReader();
        let file = event.target.files[0];
        this.props.uploadFileAction(file);
        reader.readAsDataURL(file);
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
   

    addFaq(evt) {

        evt.preventDefault();

        if (this.state.specialization != null) {
            var spArr = this.state.specialization.map((key, i) => {
                return { id: key.value, name: key.label };
            });
            this.state.formData.specializations = spArr;
        }
        const _this = this;
        if (this.allValidate(false)) {
            _this.setState({ showProcessing: true });
            _this.props.addFaqAction(this.state);
        }
        validation.errors;
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
                                                Clinic:
                                        </Col>
                                            <Col sm={6}>
                                                <select className="form-control" name="clinic" value={this.state.value} onChange={(event) => this.handleClinic(event)}>
                                                    <option value="">Select Clinic</option>
                                                    {this.state.clinicList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.name}</option>
                                                    })}
                                                </select>
                                                {this.state.clinicError}
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
                                                    onChange={(value) => this.setState({ specialization: value })}
                                                />
                                                {this.state.specializationError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Question English <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" name="question_english" bsClass="form-control"  defaultValue="" onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                    {this.state.question_englishError}
                                                    {this.state.formArr.question_english && validation.errors.first('question_english')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Question Hindi <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" name="question_hindi" bsClass="form-control" value={this.state.formData.question_hindi} defaultValue="" onKeyDown={e => { this.saveComment(e); }}  onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                    {this.state.question_hindiError}
                                                    {this.state.formArr.question_hindi && validation.errors.first('question_hindi')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Answer English <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" name="answer_english" bsClass="form-control" defaultValue="" onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                    {this.state.answer_englishError}
                                                    {this.state.formArr.answer_english && validation.errors.first('answer_english')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Answer Hindi <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" name="answer_hindi" value={this.state.formData.answer_hindi}  bsClass="form-control" defaultValue=""onKeyDown={e => { this.saveComment(e); }}  onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                    {this.state.answer_hindiError}
                                                    {this.state.formArr.answer_hindi && validation.errors.first('answer_hindi')}</span>
                                            </Col>
                                        </FormGroup>




                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Upload File <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <input type="file" name="file" onChange={e => { this.fileChangedHandler(e, "file") }}></input>
                                                <span className="errorMsg">{this.state.formArr.file && validation.errors.first('file')}</span>
                                            </Col>
                                        </FormGroup>


                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Order
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="number" name="order" onChange={e => { this.handleChange(e); }} />
                                                {this.state.orderError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Status <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <select className="form-control" name="status" value={this.state.value} onChange={e => { this.handleChange(e); }}>
                                                    <option value="1">Enabled</option>
                                                    <option value="0">Disbled</option>
                                                </select>
                                                {this.state.statusError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}></Col>
                                            <Col sm={6}>
                                                <button type="button" onClick={this.addFaq.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
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
    console.log(state)
    return {
        msg: state.faq.message,
        AddFaq: state.faq.AddFaq,
        isAddFaq: state.faq.isAddFaq,
        isAddFaqError: state.faq.isAddFaqError,

        ClinicList: state.clinic.ClinicList,
        isClinicList: state.clinic.isClinicList,
        isClinicListError: state.clinic.isClinicListError,

        SpecializationList: state.specilization.SpecializationList,
        isSpecializationList: state.specilization.isSpecializationList,
        isSpecializationListError: state.specilization.isSpecializationListError,

        isUploadFile: state.faq.isUploadFile,
        isUploadFileError: state.faq.isUploadFileError,
        uploadFile: state.faq.uploadFile,
    }
}
export default withRouter(connect(mapStateToProps, { addFaqAction, clinicListAction, specializationListAction, uploadFileAction })(AddFaq));
