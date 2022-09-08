import React, { Component } from 'react';
import {Grid, Row, Col,Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Datetime from 'react-datetime';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {patternOptions} from 'Admin/variables/Variables.jsx';
import {weekOptions} from 'Admin/variables/Variables.jsx';
import { uploadFileAction } from 'Admin/actions/master';
import { countryListAction } from 'Admin/actions/master';
import { stateListAction } from 'Admin/actions/master';
import { specializationListAction } from 'Admin/actions/specialization';
import { updateClinicAction } from 'Admin/actions/clinic';
import loadingImg from 'Admin/assets/img/loading.gif';
import moment from 'moment';
import $ from "jquery";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
    clinic_name: 'required',
    short_name: 'required',
    address: 'required',
    city: 'required',
    state: 'required',
    country: 'required',
    pin_code: 'required|numeric',
    email: 'required|email',
    phoneno: 'required|numeric',
    pattern: 'required',
};
let mess = {
    required: 'This field is required',
    email:'Invalid Email',
    numeric:'Enter numeric digits'
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class UpdateClinic extends Component{
    constructor(props){
      
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            formArr:[],
            isLogin:true,
            showProcessing:false,
            send_email:'',
            specialization:[],
            week_off : [],            
            imagePreviewUrl:'',           
            selectedDays: [],
            // Elements
            formData:{},

            //Lists
            stateList :[],
            countryList :[],
            SpecializationList :[],
            country_id:'',
            uploaded_file:'',
            multiInput:false,
          
        }

        // this.props.stateListAction(this.state.formData.country_id);
        this.handleCountryChange=this.handleCountryChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.selectMultiData = this.selectMultiData.bind(this);
        let _this = this;
        $(document).mouseup(function(e) 
        {
            var container = $(".multiDateP");

            
            if (!container.is(e.target) && container.has(e.target).length === 0) 
            {
                _this.setState({multiInput: false});  
            }
        });

    }

    handleDayClick(day, { selected }) {
      const { selectedDays } = this.state;
      if (selected) {
        const selectedIndex = selectedDays.findIndex(selectedDay =>
          DateUtils.isSameDay(selectedDay, day)
        );
        selectedDays.splice(selectedIndex, 1);
      } else {
        selectedDays.push(day);
      }
      this.setState({ selectedDays });
      
      let days = '';
     

      for(let i in selectedDays){
       // var d1 = new Date(selectedDays[i]);
        var s1 =  [selectedDays[i].getMonth()+1, selectedDays[i].getDate(), selectedDays[i].getFullYear()].join('-');
         if(i != 0)
         days += ','+s1;
         else
         days += s1; 
      }

      let formData = this.state.formData;
      formData['holiday_date'] = days; 

      this.setState({ formData : formData });
    }
    componentDidMount(){

      let holiday_date = this.props.location.state.holiday_date;
      
      
      let holiday_dt;
      let dates = [];
      if(this.props && holiday_date){       
           for(let i in holiday_date){

              let date = new Date(holiday_date[i]);



               var s1 =  [date.getMonth()+1, date.getDate(), date.getFullYear()].join('-'); 

               dates.push(s1);         
               
           }
      }

      var formData = {
          'id': this.props.location.state._id,
          'clinic_name': this.props.location.state.name,
          'short_name': this.props.location.state.short_name,
          'clinic_website':this.props.location.state.web,
          'address': this.props.location.state.address,
          'city': this.props.location.state.city,
          'state': this.props.location.state.state,
          'state_id': this.props.location.state.stateId,
          'country': this.props.location.state.country,
          'country_id': this.props.location.state.countryId,
          'pin_code': this.props.location.state.pin_code,
          'phoneno': this.props.location.state.phone,
          'mobile_no':this.props.location.state.mobile,
          'appointment_no':this.props.location.state.appointmentno,
          'emergency_no':this.props.location.state.emergency,
          'email': this.props.location.state.email,
          'start_time':this.props.location.state.start_time,
          'end_time':this.props.location.state.end_time,
          'start_time2':this.props.location.state.start_time2,
          'end_time2':this.props.location.state.end_time2,
          'pattern': this.props.location.state.pattern,
          'email_facility':this.props.location.state.is_email_facility,
          'data_updated':this.props.location.state.data_updated,
          'status':this.props.location.state.status,
          'appointment_notification':this.props.location.state.appointment_reminder,
          'latitude':this.props.location.state.lat,
          'longitude':this.props.location.state.long,
          'diet_print_format':this.props.location.state.diet_print_format,
          'margin_top':this.props.location.state.print_header_margin,
          'margin_bottom':this.props.location.state.bottom_margin,
          'margin_left':this.props.location.state.left_margin,
          'margin_right':this.props.location.state.right_margin,
          'week_off':this.props.location.state.week_off,
          'specialization':this.props.location.state.specializations,
          'holiday_date':dates.toString(),
          'background_image':this.props.location.state.background_image,
          'contact_image':this.props.location.state.contact_image,
          'logo_image':this.props.location.state.logo_image,
          'logo':this.props.location.state.web,
      }
      this.setState({formData: formData});
      let speSel = this.state.specialization;
      this.props.location.state.specializations.map((key, index) =>
        speSel.push({  "value":key.id,
                  "label":key.name})
      );
      this.setState({specialization: speSel});

      let week_off = this.state.week_off;
      this.props.location.state.week_off.map((key, index) =>
        week_off.push({"value":key.day,
                  "label":key.name})
      );
      this.setState({week_off: week_off});

      let holiday = this.state.holiday_date;

      this.props.location.state.holiday_date.map((key, index) =>{
        }
      );
      this.setState({holiday_date: new Date('2019-02-14')});
      this.props.stateListAction(this.props.location.state.country_id);
        this.props.countryListAction(this.state)
        this.props.specializationListAction(this.state)
    }
    componentWillReceiveProps(nextProps){


        if(nextProps.isCountryList !== this.props.isCountryList){
            this.setState({
                countryList: nextProps.countryList.data.data
            });
        }
        if(nextProps.isStateList !== this.props.isStateList){
            this.setState({
                stateList: nextProps.stateList.data.data
            });
        }
        if(nextProps.isSpecializationList !== this.props.isSpecializationList){
        let entry = [];
          nextProps.SpecializationList.data.map((key, index) =>

      		  entry.push({  "value":key._id,
              				"label":key.name})
      		);
          this.setState({SpecializationList:entry});
     	  }

        if(nextProps.isUpdateClinicError !== this.props.isUpdateClinicError){
          this.setState({ showProcessing: false });
          if(nextProps.updateClinicResponse.errors){
              nextProps.updateClinicResponse.errors.map((key,i) => {

                  this.setState({[(key.param)+"Error"]:key.msg})
              });
          }
        }
        
        if (nextProps.isUpdateClinic !== this.props.isUpdateClinic && nextProps.updateClinicResponse.status === 'Success' && this.state.formData.clinic_name !== '') {

            this.props.handleClick('success', nextProps.updateClinicResponse.msg)
            this.props.history.push(`/admin/clinic-list`)
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
        }
    }

    updateClinic(evt){

        evt.preventDefault();
        const _this = this;
        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.updateClinicAction(this.state);
        }
        validation.errors;
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

    handleChange = e => {
        e.preventDefault();
        let field = this.state.formData;
        field[e.target.name]  = e.target.value;
        this.setState({formData:field});

    };
    handleCountryChange(event) {
        let data = this.state.formData;
        data["country"]  = event.target[event.target.selectedIndex].text;
        data["country_id"]  = event.target.value;
        this.setState({formData: data});
        this.props.stateListAction(event.target.value);
    }

    handleStateChange(event) {
        let data = this.state.formData;
        data["state"]  = event.target[event.target.selectedIndex].text;
        data["state_id"]  = event.target.value;
        this.setState({formData: data});
    }

    handlepatternChange(event){
      let data = this.state.formData;
      data["pattern"]  = event.value;
      this.setState({formData: data});
    }

    handleChangeTime(data,elename){
       let mytime = moment(new Date(data)).format('h:mm A');
       let data1 = this.state.formData;
       data1[elename]  = mytime;
       this.setState({formData: data1});
    }



     handleWeekOff(field){

       let multipleSelect = this.state.week_off;
       multipleSelect = field;
       this.setState({ week_off: multipleSelect});

    		let entry = [];
        let data = this.state.formData;
        field.map((key, index) =>
    		  entry.push({  "day":key.value,
            				"name":key.label})
    		);
        data["week_off"]  = entry;
        this.setState({formData: data});
     }

     handleSpecialization(value){
        let multipleSelect = this.state.specialization;
        multipleSelect = value;
        this.setState({ specialization: multipleSelect});

        let formData = this.state.formData;
        let catArr = [];
        if(value && value.length){
            value.map((key, i) => {
                catArr.push({ id: key.value, name: key.label })
             });
        }
        formData.specialization = catArr;
        this.setState({formData:formData});
     }

     fileChangedHandler = (event,elename) => {
       event.preventDefault();
       this.setState({uploaded_file: elename});
       let reader = new FileReader();
       let file = event.target.files[0];

       if(elename==="logo_image"){
         reader.onloadend = () => {
           this.setState({imagePreviewUrl: reader.result});
         }
       }
       this.props.uploadFileAction(file);
       reader.readAsDataURL(file);
     }

     selectMultiData(){      
      if(this.state.multiInput == false)
      this.setState({multiInput: true});
      else
      this.setState({multiInput: false});  
     }

    render(){
      // console.log(this.state.selectedDays)
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                        
                            <Form horizontal>
                            <div className="actionProcess"  style={{display: this.state.showProcessing ? 'block' : 'none' }}>
                                <img src={loadingImg} alt="Loading" width="40px" />
                                <center>Logging In - Please Wait</center>
                            </div>
                                <Card
                                    title={
                                        <legend>Clinic Details</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        Logo
                                                    </Col>
                                                    <img src={this.state.imagePreviewUrl} alt="Logo"  width="140px" height="140px" />
                                                    <FormControl type="file" name="logo_image" accept=".png" onChange={e=>{this.fileChangedHandler(e,"logo_image")}}/>
                                                    <span className="errorMsg">{this.state.logo_imageError}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel} >
                                                        Clinic Name
                                                    </Col>
                                                    <FormControl type="text" name="clinic_name" onChange={e => { this.handleChange(e); }} value={this.state.formData.clinic_name}/>
                                                    <span className="errorMsg">{this.state.clinic_nameError}{this.state.formArr.clinic_name && validation.errors.first('clinic_name')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel} >
                                                        Clinic Short Name
                                                    </Col>
                                                    <FormControl type="text" name="short_name" onChange={e => { this.handleChange(e); }} value={this.state.formData.short_name}/>
                                                    <span className="errorMsg" refs="short_name">{this.state.short_nameError}{this.state.formArr.short_name && validation.errors.first('short_name')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Clinic Website
                                                    </Col>
                                                    <FormControl type="text" name="clinic_website" onChange={e => { this.handleChange(e); }} value={this.state.formData.clinic_website}/>
                                                </Col>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                       Sepcialization
                                                    </Col>
                                                    <Select
                                                    placeholder="Choose"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="specialization"
                                                    value={this.state.specialization}
                                                    options={this.state.SpecializationList}
                                                    onChange={(value) => { this.handleSpecialization(value)}}
                                                    >
                                                    </Select>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                            <Col sm={4}>
                                                    <Col componentClass={ControlLabel}>
                                                        Address
                                                    </Col>
                                                    <FormControl componentClass="textarea" name="address" onChange={e => { this.handleChange(e); }} value={this.state.formData.address}/>
                                                    <span className="errorMsg">{this.state.addressError}{this.state.formArr.address && validation.errors.first('address')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        City
                                                    </Col>
                                                    <FormControl type="text" name="city" onChange={e => { this.handleChange(e); }}  value={this.state.formData.city}/>
                                                    <span className="errorMsg">{this.state.cityError}{this.state.formArr.city && validation.errors.first('city')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Country
                                                    </Col>
                                                    <FormControl  componentClass="select" name="country" onChange={e => { this.handleChange(e);this.handleCountryChange(e); }}  value={this.state.formData.country_id}>
                                                    <option value="">Please select</option>
                                                    {this.state.countryList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.short_name}</option>
                                                    })}</FormControl>
                                                    <span className="errorMsg">{this.state.countryError}{this.state.formArr.country && validation.errors.first('country')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        State
                                                    </Col>
                                                    <FormControl  componentClass="select" name="state" onChange={e => { this.handleChange(e);this.handleStateChange(e); }} value={this.state.formData.state_id}>
                                                    <option value="">Please select</option>
                                                    {this.state.stateList.map(function (item) {
                                                        return <option key={item._id} value={item._id} >{item.name}</option>
                                                    })}</FormControl>
                                                    <span className="errorMsg">{this.state.stateError}{this.state.formArr.state && validation.errors.first('state')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Pin Code
                                                    </Col>
                                                    <FormControl type="text" name="pin_code" onChange={e => { this.handleChange(e); }} value={this.state.formData.pin_code}/>
                                                    <span className="errorMsg">{this.state.pin_codeError}{this.state.formArr.pin_code && validation.errors.first('pin_code')}</span>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                />
                                <Card
                                    title={
                                        <legend>Contact Info</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Phone No
                                                    </Col>
                                                    <FormControl type="text" name="phoneno" onChange={e => { this.handleChange(e); }} value={this.state.formData.phoneno}/>
                                                    <span className="errorMsg">{this.state.phonenoError}{this.state.formArr.phoneno && validation.errors.first('phoneno')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Mobile No
                                                    </Col>
                                                    <FormControl type="text" name="mobile_no" onChange={e => { this.handleChange(e); }} value={this.state.formData.mobile_no}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Appointment No
                                                    </Col>
                                                    <FormControl type="text" name="appointment_no" onChange={e => { this.handleChange(e); }} value={this.state.formData.appointment_no}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Emergency No
                                                    </Col>
                                                    <FormControl type="text" name="emergency_no" onChange={e => { this.handleChange(e); }} value={this.state.formData.emergency_no}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Clinic Email
                                                    </Col>
                                                    <FormControl type="text" name="email" onChange={e => { this.handleChange(e); }} value={this.state.formData.email}/>
                                                    <span className="errorMsg" refs="short_name">{this.state.emailError}{this.state.formArr.email && validation.errors.first('email')}</span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Start Time
                                                    </Col>
                                                    <Datetime onChange = {e => {this.handleChangeTime(e,"start_time");}}
                                                        dateFormat={false}
                                                        inputProps={{placeholder:"Time Picker Here",name: 'start_time'}} value={this.state.formData.start_time}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                       End Time
                                                    </Col>
                                                    <Datetime onChange = {e => {this.handleChangeTime(e,"end_time");}}
                                                        dateFormat={false}
                                                        inputProps={{placeholder:"Time Picker Here",name: 'end_time'}}
                                                        value={this.state.formData.end_time}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Start Time 2
                                                    </Col>
                                                    <Datetime onChange = {e => {this.handleChangeTime(e,"start_time2");}}
                                                        dateFormat={false}
                                                        inputProps={{placeholder:"Time Picker Here",name: 'start_time2'}}
                                                      value={this.state.formData.start_time2}  />
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        End Time 2
                                                    </Col>
                                                    <Datetime onChange = {e => {this.handleChangeTime(e,"end_time2");}}
                                                        dateFormat={false}
                                                        inputProps={{placeholder:"Time Picker Here",name: 'end_time2'}}
                                                      value={this.state.formData.end_time2}   />
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                />
                                <Card
                                    title={
                                        <legend>Settings</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                            <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Pattern
                                                    </Col>
                                                    <Select
                                                    placeholder="Choose One"
                                                    name="pattern"
                                                    value={this.state.formData.pattern}
                                                    key={this.state.formData.pattern}
                                                    options={patternOptions}
                                                    onChange={e => {this.handlepatternChange(e); }}
                                                    />
                                                    <span className="errorMsg">{this.state.patternError}{this.state.formArr.pattern && validation.errors.first('pattern')}</span>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Email Facility
                                                    </Col>
                                                    <FormControl componentClass="select" name="email_facility" onChange={e => { this.handleChange(e); }} value={this.state.formData.email_facility}>
                                                        <option value="no" >No</option>
                                                        <option value="yes">Yes</option>
                                                    </FormControl>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Data Updated
                                                    </Col>
                                                    <FormControl componentClass="select" name="data_updated" onChange={e => { this.handleChange(e); }} value={this.state.formData.data_updated}>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </FormControl>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Appointment Notification Before
                                                    </Col>
                                                    <FormControl type="text" name="appointment_notification" onChange={e => { this.handleChange(e); }} value={this.state.formData.appointment_notification}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Latitude
                                                    </Col>
                                                    <FormControl type="text" name="latitude" onChange={e => { this.handleChange(e); }} value={this.state.formData.latitude}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Longitude
                                                    </Col>
                                                    <FormControl type="text" name="longitude" onChange={e => { this.handleChange(e); }} value={this.state.formData.longitude}/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        Clinic Image
                                                    </Col>
                                                    <FormControl type="file" name="background_image" accept=".png" onChange={(e)=>this.fileChangedHandler(e,"background_image")}/>
                                                    <span className="errorMsg">{this.state.background_imageError}</span>
                                                </Col>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        Contact Image
                                                    </Col>
                                                    <FormControl type="file" name="contact_image" accept=".png" onChange={(e)=>this.fileChangedHandler(e,"contact_image")}/>
                                                    <span className="errorMsg">{this.state.contact_imageError}</span>

                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Status
                                                    </Col>
                                                    <FormControl componentClass="select" name="status" onChange={e => { this.handleChange(e); }} value={this.state.formData.status}>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={4}>
                                                    <Col componentClass={ControlLabel}>
                                                        Week Off
                                                    </Col>
                                                    <Select
                                                    placeholder="Select Day"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="week_off"
                                                    value={this.state.week_off}
                                                    options={weekOptions}
                                                    onChange={(value) => { this.handleWeekOff(value)}}
                                                    />
                                                </Col>
                                                <Col sm={4}>
                                                    <Col componentClass={ControlLabel}>
                                                        Select Holidays
                                                    </Col>
                    
                                                      <div>
                                                      <FormControl type="text" name="holiday_date" value={this.state.formData.holiday_date} onClick={e => { this.selectMultiData(e); }}/>
                                                      
                                                        <div className="multiDateP" style={{display:this.state.multiInput ? 'block' : 'none'}}>
                                                        <DayPicker
                                                          selectedDays={this.state.selectedDays}
                                                          onDayClick={this.handleDayClick}
                                                          
                                                        />
                                                        </div>
                                                      </div>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                />
                                <Card
                                    title={
                                        <legend>Diet Chart Settings</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Print with Header
                                                    </Col>
                                                    <FormControl componentClass="select" name="diet_print_format" onChange={e => { this.handleChange(e); }} value={this.state.formData.diet_print_format}>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </FormControl>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Margin Top
                                                    </Col>
                                                    <FormControl type="text" name="margin_top" onChange={e => { this.handleChange(e); }} value={this.state.formData.margin_top} value={this.state.formData.margin_top}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                       Margin Bottom
                                                    </Col>
                                                    <FormControl type="text" name="margin_bottom" onChange={e => { this.handleChange(e); }}  value={this.state.formData.margin_bottom} value={this.state.formData.margin_bottom}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Margin Left
                                                    </Col>
                                                    <FormControl type="text" name="margin_left" onChange={e => { this.handleChange(e); }} value={this.state.formData.margin_left} value={this.state.formData.margin_left}/>
                                                </Col>
                                                <Col sm={2}>
                                                    <Col componentClass={ControlLabel}>
                                                        Margin Right
                                                    </Col>
                                                    <FormControl type="text" name="margin_right" onChange={e => { this.handleChange(e); }} value={this.state.formData.margin_right} value={this.state.formData.margin_right}/>
                                                    <input type="hidden" name="id" value={this.state.formData.id}></input>
                                                </Col>
                                            </FormGroup>
                                        </div>

                                    }
                                    ftTextCenter
                                    legend={<div>
                                        <Button fill bsStyle="info" type="button" onClick={this.updateClinic.bind(this)}>Submit</Button>
                                        <Button fill bsStyle="info" type="button" onClick={ this.updateClinic.bind(this)}>Submit & Send Mail to Doc</Button></div>
                                    }
                                />
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {

      stateList: state.master.stateList,
      isStateList: state.master.isStateList,
      isStateListError: state.master.isStateListError,

      countryList: state.master.countryList,
      isCountryList: state.master.isCountryList,
      isCountryListError: state.master.isCountryListError,

      SpecializationList: state.specilization.SpecializationList,
  	  isSpecializationList: state.specilization.isSpecializationList,
  	  isSpecializationListError: state.specilization.isSpecializationListError,

      isUpdateClinic:state.clinic.isUpdateClinic,
      isUpdateClinicError:state.clinic.isUpdateClinicError,
      updateClinicResponse:state.clinic.updateClinicResponse,

      isUploadFile:state.master.isUploadFile,
      isUploadFileError: state.master.isUploadFileError,
      uploadFile: state.master.uploadFile,

    }
}
// export default UpdateClinic;
export default withRouter(connect(mapStateToProps, { countryListAction,stateListAction,updateClinicAction,specializationListAction,uploadFileAction} )(UpdateClinic));
