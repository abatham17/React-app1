import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { uploadFileAction } from 'Admin/actions/link';
import { addLinkAction } from 'Admin/actions/link';
import { clinicListAction } from 'Admin/actions/clinic';
import { specializationListAction } from 'Admin/actions/specialization';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
    title: 'required',
    file:'required'
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class AddLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicList: [],
            specializationList:[],
            specialization:null,
            category:null,
            cardHidden: true,
            formArr: [],            
            clinicError:null,
            specializationError:null,
            titleError:null,
            fileError:null,
            descriptionError:null,
            orderError:null,
            categoryError:null,
            statusError:null,
            formData: {
                title:"",
                clinic_name:"",
                clinic_id:"",
                description: "",
                order:"",
                link:"",
                status: "active",
                specializations:[],
                file:[]
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

        if (nextProps.isAddLinkError !== this.props.isAddLinkError) { 
            if (nextProps.AddLinkMessage.errors) {
                nextProps.AddLinkMessage.errors.map((key, i) => {

                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }

        }
        if(nextProps.isUploadFile !== this.props.isUploadFile){

            let uploaded_file = this.state.uploaded_file;
            let field = this.state.formData;
            field[uploaded_file]  = nextProps.uploadFile.file_name;
            this.setState({formData:field});
          }
  
          if(nextProps.isUploadFileError !== this.props.isUploadFileError){
            if(nextProps.uploadFile.errors){
              let uploaded_file = this.state.uploaded_file;
                nextProps.uploadFile.errors.map((key,i) => {
                    this.setState({[uploaded_file+"Error"]:key.msg})
                });
            }
          }debugger
        if(nextProps.addLinkAction && nextProps.isAddLink){ 
            this.props.handleClick('success',nextProps.msg)
            this.props.history.push('/admin/link-list')

        } 

          
    }    


    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;
  
        this.setState({formData:field});
         
    };

    handleClinic(event) {

        let index = event.target.selectedIndex;        
        this.state.formData.clinic_id = event.target.value
        this.state.formData.clinic_name = event.target[index].text

    }
    fileChangedHandler = (event,elename) => {
        event.preventDefault();
        this.setState({uploaded_file: elename});
        let reader = new FileReader();
        let file = event.target.files[0];
 
        /*if(elename==="file"){
          reader.onloadend = () => {
            this.setState({imagePreviewUrl: reader.result});
          }
        }*/
        this.props.uploadFileAction(file);
        reader.readAsDataURL(file);
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

    addLink(evt){ 
        
        evt.preventDefault();

        if (this.state.specialization != null) {
            var spArr = this.state.specialization.map((key, i) => {
                return { id: key.value, name: key.label };
            });
            this.state.formData.specializations = spArr;
        }
        const _this = this;   
        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.addLinkAction(this.state);   
        }
        validation.errors;
    }
    render() {
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        return (
            <div className="main-content" style={{padding: '15px 0px'}}>
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
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Title <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="text" name="title" id="title" onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.titleError}
                                                {this.state.formArr.title && validation.errors.first('title')}</span>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Link Url
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="text" name="link" id="link" onChange={e => { this.handleChange(e); }}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Link <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>
                                                <input type="file" name="file" onChange={e=>{this.fileChangedHandler(e,"file")}}></input>
                                                <span className="errorMsg">{this.state.formArr.file && validation.errors.first('file')}</span>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formControlsTextarea">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Description
                                        </Col>
                                            <Col sm={6}>
                                                <FormControl rows="2" componentClass="textarea" name="description" bsClass="form-control" defaultValue="" onChange={e => { this.handleChange(e); }} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Order
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="number" name="order" onChange={e => { this.handleChange(e); }}/>
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
                                            <button type="button" onClick={this.addLink.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
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
        msg: state.link.message,
        AddLink: state.link.AddLink,
        isAddLink: state.link.isAddLink,
        isAddLinkError: state.link.isAddLinkError,

        ClinicList: state.clinic.ClinicList,
        isClinicList: state.clinic.isClinicList,
        isClinicListError: state.clinic.isClinicListError,

        SpecializationList: state.specilization.SpecializationList,
        isSpecializationList: state.specilization.isSpecializationList,
        isSpecializationListError: state.specilization.isSpecializationListError,

        isUploadFile:state.link.isUploadFile,
        isUploadFileError: state.link.isUploadFileError,
        uploadFile: state.link.uploadFile,
    }
}
export default withRouter(connect(mapStateToProps, { addLinkAction, clinicListAction, specializationListAction, uploadFileAction })(AddLink));
