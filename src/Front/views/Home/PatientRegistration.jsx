import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import { patientRegistrationAction, patientEditAction } from 'Front/actions/home';
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import{
    titleOptions
} from 'Front/variables/Variables.jsx';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
    title: 'required',
    first_name: 'required|alpha',
    last_name: 'required|alpha',
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

class PatientRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            patientInfo:this.props.location.state,
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
                patientId:this.props.location.state?this.props.location.state.patientId:'',
                patientEditId:this.props.location.state?this.props.location.state._id:'',
                title:this.props.location.state?this.props.location.state.title:'',
                first_name:this.props.location.state?this.props.location.state.firstName:'',
                last_name:this.props.location.state?this.props.location.state.lastName:'',
                gender:this.props.location.state?this.props.location.state.gender:'',
                dob:'',
                age:this.props.location.state?this.props.location.state.age:'',
                email:this.props.location.state?this.props.location.state.email:'',
                height:this.props.location.state?this.props.location.state.height:'',
                weight:this.props.location.state?this.props.location.state.weight:'',
                city:this.props.location.state?this.props.location.state.city:'',
                remark:this.props.location.state?this.props.location.state.remark:'',
                dobd:'',
            },
            showProcessing: false,
        };
        
        this.handleDob = this.handleDob.bind(this);
        if(this.props.location.state){ 
            this.handleDob(this.props.location.state.dob);
        }
        
    }
    
    componentDidMount() {

        //this.props.handleClick('success', 'this is testing')
       //this.props.history.push(`/dashboard`)
       //this.props.handleClick('success', 'testing')
        
    }
    
    componentWillReceiveProps(nextProps){ 
        
        if (nextProps.isPatientRegistrationError === this.props.isPatientRegistrationError && nextProps.PatientRegistrationMessage && nextProps.PatientRegistrationMessage.status === 'Success' && nextProps.PatientRegistrationMessage.msg && this.state.formData.first_name !== '') { 
            
            this.successAlert(nextProps.PatientRegistrationMessage.msg, '/dashboard');
        }

        if (nextProps.isPatientEditError === this.props.isPatientEditError && nextProps.PatientEditMessage && nextProps.PatientEditMessage.status === 'Success' && nextProps.PatientEditMessage.msg && this.state.formData.first_name !== '') {  debugger
            
            this.successAlert(nextProps.PatientEditMessage.msg, '/patient-search');
        }

        if (nextProps.isPatientRegistrationError !== this.props.isPatientRegistrationError) { 
            if (nextProps.PatientRegistrationMessage.errors) {
                nextProps.PatientRegistrationMessage.errors.map((key, i) => {
                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                    return '';
                });
            }
        }

        if (nextProps.isPatientEditError !== this.props.isPatientEditError) { 
            if (nextProps.PatientEditMessage.errors) {
                nextProps.PatientEditMessage.errors.map((key, i) => {
                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                    return '';
                });
            }
        }
        
    }

    successAlert(msg, link) {  debugger
        
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Success"
                    onConfirm={() => this.hideAlert(link)}
                    onCancel={() => this.hideAlert(link)}
                    confirmBtnBsStyle="info"
                >
                    {msg}
                </SweetAlert>
            )
        });
    }

    hideAlert(link) { debugger
        this.setState({
            alert: null
        });
        this.props.history.push(link);
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
         
    }

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
        }
        validation.errors;
    }
   

    render() {
        console.log(this.props.location.state);
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        let title = this.state.formData.title;
        return (
            <div className="main-content" style={{ padding: '15px 15px' }}>
            {this.state.alert}
                <Grid fluid>
                    <Row>
                    <Col md={12}>
                            <Card
                                title="Patient Registration"
                                content={
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
                                            <select className="form-control" name="title" value={this.state.value} onChange={(event) => this.handleChange(event)}>
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

                                            <select className="form-control" name="gender" value={this.state.value} onChange={e => { this.handleChange(e); }}>
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
                                        
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}></Col>
                                            <Col sm={6}>
                                            <button type="button" onClick={this.patientRegistration.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
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

        PatientRegistrationMessage: state.home.PatientRegistration,
        isPatientRegistration: state.home.isPatientRegistration,
        isPatientRegistrationError: state.home.isPatientRegistrationError,

        PatientEditMessage: state.home.PatientEdit,
        isPatientEdit: state.home.isPatientEdit,
        isPatientEditError: state.home.isPatientEditError,

    }
}
export default withRouter(connect(mapStateToProps, { patientRegistrationAction, patientEditAction })(PatientRegistration));