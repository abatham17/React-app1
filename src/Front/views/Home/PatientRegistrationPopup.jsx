import React, { Component } from 'react';
import {
    Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { patientRegistrationAction, patientEditAction } from 'Front/actions/home';
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import{
    titleOptions
} from 'Front/variables/Variables.jsx';
import { appConstants } from 'Front/_constants/app.constants.js';
let Validator = require('validatorjs');
let formArr = {}
let rules = {
    title: 'required',
    first_name: 'required',
    last_name: 'required',
    gender: 'required',
    height: 'required|numeric|min:1',
    weight: 'required|numeric|min:1',
    city: 'required',
    dob: 'date',
    email:'email',
    age:'numeric'
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

let editApi = false;

class PatientRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            patientInfo:this.props.patientData,
            patient_idError:null,
            titleError:null,
            first_nameError:null,
            last_nameError:null,
            genderError:"",
            dobError:null,
            ageError:null,
            emailError:null,
            heightError:null,
            weightError:null,
            cityError:null,
            remarkError:null,
            alert:null,
            formData: {
                patientId:this.props.patientData?this.props.patientData.patientId:'',
                patientEditId:this.props.patientData?this.props.patientData._id:'',
                title:this.props.patientData?this.props.patientData.title:'',
                first_name:this.props.patientData?this.props.patientData.firstName:'',
                last_name:this.props.patientData?this.props.patientData.lastName:'',
                gender:this.props.patientData?this.props.patientData.gender:'',
                dob:'',
                age:this.props.patientData?this.props.patientData.age:'',
                email:this.props.patientData?this.props.patientData.email:'',
                height:this.props.patientData?this.props.patientData.height:'',
                weight:this.props.patientData?this.props.patientData.weight:'',
                city:this.props.patientData?this.props.patientData.city:'',
                remark:this.props.patientData?this.props.patientData.remark:'',
                dobd:'',
            },
            showProcessing: false,
        };
        
        this.handleDob = this.handleDob.bind(this);
        if(this.props.patientData){ 
            this.handleDob(this.props.patientData.dob);
        }
        
    }
    
    componentDidMount() {

        //this.props.handleClick('success', 'this is testing')
       //this.props.history.push(`/dashboard`)
       //this.props.handleClick('success', 'testing')
        
    }
    
    componentWillReceiveProps(nextProps){ 
        
       
         if ((nextProps.isPatientEdit !== this.props.isPatientEdit) && editApi) { 
             editApi = false;

             setTimeout(function(){

                     let params = {
                       clinicId:localStorage.getItem('clinicId'),
                   } 

                   appConstants.socket.emit('addPatient', params);

                },1000);

             let formData = this.state.formData;
             let formArr = [];
             formData['patientId'] = "";
             formData['patientEditId'] = "";
             formData['title'] = "";
             formData['first_name'] = "";
             formData['last_name'] = "";
             formData['gender'] = "";
             formData['dob'] = "";
             formData['age'] = "";
             formData['email'] = "";
             formData['height'] = "";
             formData['weight'] = "";
             formData['city'] = "";
             formData['remark'] = "";
             formData['dobd'] = "";
             this.setState({formData:formData});
             this.setState({ formArr });
             this.props.onDismiss();

        }

        if ((nextProps.isPatientRegistration !== this.props.isPatientRegistration) && editApi) { 
            editApi = false; 
            setTimeout(function(){ 

                     let params = {
                       clinicId:localStorage.getItem('clinicId'),
                   } 
                   
                   appConstants.socket.emit('addPatient', params);

                },1000);
          
               
             let formData = this.state.formData;
             let formArr = [];
             formData['patientId'] = "";
             formData['patientEditId'] = "";
             formData['title'] = "";
             formData['first_name'] = "";
             formData['last_name'] = "";
             formData['gender'] = "";
             formData['dob'] = "";
             formData['age'] = "";
             formData['email'] = "";
             formData['height'] = "";
             formData['weight'] = "";
             formData['city'] = "";
             formData['remark'] = "";
             formData['dobd'] = "";
             this.setState({formData:formData});
             this.setState({ formArr });
             this.props.onDismiss();
              

        }
        
    }

    successAlert(msg, link) {  
        
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

    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;        

        if(e.target.name === 'age'){ 
           // var today = new Date();
            field['dob']  = moment().subtract(e.target.value, 'years');//(today.getFullYear()-e.target.value) + '-' + (today.getMonth() + 1) + '-' + today.getDate();   
                  
        }

        this.setState({formData:field});
         
    };

    handleDob(date){ 
        //date = new Date(date);
        let field = this.state.formData;        
        field['dob'] = moment(date).format('YYYY-MM-DD');
        field['dobd'] = moment(date).format('MM/DD/YYYY');
        field['age'] = ''; 
        this.setState({formData:field});
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
           if( this.state.formData['dob'] === '' && this.state.formData['age'] === ''){             
            this.setState({dobError:"The DOB or Age is required"});
           }else{   return 1;   }            
        }
    }

    patientRegistration(evt){ 
        
        evt.preventDefault();
          
        if(this.allValidate(false)){
            this.setState({ showProcessing: true });
            if(this.state.formData.patientEditId && this.state.formData.patientEditId !== ''){
                this.props.patientEditAction(this.state);
            }else{
                this.props.patientRegistrationAction(this.state); 
            }  

            editApi = true;
        }
        return validation.errors;
    }
   

    render() {

        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        let title = this.state.formData.title;
        return (
            <Row>
                    <Col md={12}>
            {this.state.alert}
                <Form horizontal>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Patient Id
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="patient_id" id="patient_id" defaultValue={this.state.formData.patientId} readOnly={this.state.formData.patientId?true:false} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.patient_idError}
                                                {this.state.formArr.patient_id && validation.errors.first('patient_id')}</span>
                                            </Col>
                                            </FormGroup>
                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Title <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>
                                            <select className="form-control" name="title" onChange={(event) => this.handleChange(event)}>
                                                        <option value="">Select title</option>
                                                        {
                                                            
                                                            titleOptions.map(function (item) { 
                                                                let selected = false;
                                                                if(title === item.label){
                                                                    selected = true;
                                                                }
                                                            return <option key={item.value} value={item.label} selected={selected}>{item.label}</option>
                                                        })
                                                        }
                                                    </select>
                                                <span className="errorMsg">
                                                {this.state.titleError}
                                                {this.state.formArr.title && validation.errors.first('title')}</span>
                                            </Col>
                                            </FormGroup>
                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                First Name <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="first_name" id="first_name" defaultValue={this.state.formData.first_name} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.first_nameError}
                                                {this.state.formArr.first_name && validation.errors.first('first_name')}</span>
                                            </Col>
                                            </FormGroup>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Last Name <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="last_name" id="last_name" defaultValue={this.state.formData.last_name} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.last_nameError}
                                                {this.state.formArr.last_name && validation.errors.first('last_name')}</span>
                                            </Col>
                                            </FormGroup>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Gender <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                            <select className="form-control" name="gender" onChange={e => { this.handleChange(e); }}>
                                                    <option value="">-- Select Gender --</option>
                                                    <option value="Female" selected={this.state.formData.gender==='Female'?true:false}>Female</option>
                                                    <option value="Male" selected={this.state.formData.gender==='Male'?true:false}>Male</option>
                                                </select>
                                                <span className="errorMsg">
                                                {this.state.genderError}
                                                {this.state.formArr.gender && validation.errors.first('gender')}</span>
                                            </Col>
                                            </FormGroup>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                DOB/Age <span className="star">*</span>
                                            </Col>
                                            <Col sm={4}>

                                                <Datetime
                                                    timeFormat={false}
                                                    inputProps={{placeholder:"mm/dd/yyyy"}}
                                                    maxDate={new Date()}
                                                    name={"dob"}
                                                    defaultValue={this.state.formData.dobd}
                                                    onChange={this.handleDob}
                                                />
                                                <span className="errorMsg">
                                                {this.state.dobError}
                                                {this.state.formArr.dob && validation.errors.first('dob')}</span>
                                            </Col>
                                            <Col sm={4}>

                                                <FormControl type="text" name="age" id="age" defaultValue={this.state.formData.age} placeholder="Age: Eg-30" onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.gaeError}
                                                {this.state.formArr.age && validation.errors.first('age')}</span>
                                            </Col>
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col sm={6}>
                                        {
                                            localStorage.getItem('isEmailFacility') === 'yes'?(<FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Email 
                                                </Col>
                                                <Col sm={8}>
    
                                                    <FormControl type="email" name="email" id="email" defaultValue={this.state.formData.email} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.emailError}
                                                    {this.state.formArr.email && validation.errors.first('email')}</span>
                                                </Col>
                                            </FormGroup>):''
                                        }             
                                        
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Height(CM) <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="height" id="height" defaultValue={this.state.formData.height} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.heightError}
                                                {this.state.formArr.height && validation.errors.first('height')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Weight(KG) <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="weight" id="weight" defaultValue={this.state.formData.weight} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.weightError}
                                                {this.state.formArr.weight && validation.errors.first('weight')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                City <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="city" id="city" defaultValue={this.state.formData.city} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.cityError}
                                                {this.state.formArr.city && validation.errors.first('city')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                            Remark
                                            </Col>
                                            <Col sm={8}>

                                            <FormControl rows="4" componentClass="textarea" name="remark" bsClass="form-control" defaultValue={this.state.formData.remark} onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                {this.state.remarkError}
                                                {this.state.formArr.remark && validation.errors.first('remark')}</span>
                                            </Col>
                                        </FormGroup>

                                        </Col>
                                        
                                        

                                                                                  
                                            <Col smOffset={2} sm={6}>
                                            <button type="button" onClick={this.patientRegistration.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
                                            </Col>
                                        
                                        
                                    </Form>
                        </Col>
                    </Row>
        );
    }
}

function mapStateToProps(state) {
    
    return {

        PatientRegistrationMessage: state.home.PatientRegistration,
        isPatientRegistration: state.home.isPatientRegistration,
        isPatientRegistrationError: state.home.isPatientRegistrationError,

        PatientEditMessage: state.home.PatientEdit,
        isPatientEdit: state.home.isPatientEdit,
        isPatientEditError: state.home.isPatientEditError,

    }
}
export default withRouter(connect(mapStateToProps, { patientRegistrationAction, patientEditAction })(PatientRegistration));