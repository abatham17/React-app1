import React, { Component } from 'react';
import {Grid, Row, Col,Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import MultipleDatePicker from 'react-multiple-datepicker'
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import 'react-select/dist/react-select.css';
import { clinicListAction } from 'Admin/actions/clinic';
import { addClinicCalendarAction } from 'Admin/actions/clinic_calendar';
import loadingImg from 'Admin/assets/img/loading.gif';


let Validator = require('validatorjs');
let formArr = {}
let rules = {
    calendar_date: 'required',
    message: 'required',
    clinic_name: 'required',
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class AddClinicCalendar extends Component{
    constructor(props){
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            formArr:[],
            isLogin:true,
            showProcessing:false,
            clinic_id:'',
            // Elements
            formData:{
              calendar_date: '',
              message: '',
              clinic_id: '',
              clinic_name: '',
              holiday_type:'',
            },
            //Lists
            clinicList :[],
        }
    }
    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
          var fields = this.state.formData
          debugger
          fields["clinic_id"] = this.props.location.state._id
          fields["clinic_name"] = this.props.location.state.name
          this.setState({formdata:fields})
        }
        this.props.clinicListAction(this.state)
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.isClinicList !== this.props.isClinicList){
            this.setState({
                clinicList: nextProps.clinicList.data.data
            });
        }

        if(nextProps.isAddClinicCalendarError !== this.props.isAddClinicCalendarError){
          this.setState({ showProcessing: false });
          if(nextProps.addClinicCalendarResponse.errors){
              nextProps.addClinicCalendarResponse.errors.map((key,i) => {
                 return this.setState({[(key.param)+"Error"]:key.message})
              });
          }
        }
        if (nextProps.isAddClinicCalendar !== this.props.isAddClinicCalendar && nextProps.addClinicCalendarResponse.status === 'Success' && this.state.formData.clinic_name !== '') {

            this.props.handleClick('success', nextProps.addClinicCalendarResponse.message)
            this.props.history.push(`/admin/clinic-calendar`)
        }
    }

    addClinicCalendar(evt){

        evt.preventDefault();
        const _this = this;
        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.addClinicCalendarAction(this.state);
        }
        return validation.errors;
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
    handleClinicChange(event) {
        let data = this.state.formData;
        data["clinic_name"]  = event.target[event.target.selectedIndex].text;
        data["clinic_id"]  = event.target.value;
        this.setState({formData: data});
    }

     handleDateChange(date){
       let data = this.state.formData;
       console.log(date);
       data["calendar_date"]  = date;
       this.setState({formData: data});
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
                            <Form horizontal>
                            <div className="actionProcess"  style={{display: this.state.showProcessing ? 'block' : 'none' }}>
                                <img src={loadingImg} alt="Loading" width="40px" />
                                <center>Logging In - Please Wait</center>
                            </div>
                                <Card
                                    title={
                                        <legend>Clinic Calendar</legend>
                                    }
                                    content={
                                        <div>
                                          <FormGroup>
                                              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                  Clinic:
                                              </Col>
                                              <Col sm={6}>
                                              <FormControl  componentClass="select" name="clinic_name" onChange={e => { this.handleChange(e);this.handleClinicChange(e); }} value={this.state.formData.clinic_id}>
                                              <option value="">Please select</option>
                                              {this.state.clinicList.map(function (item) {
                                                  return <option key={item._id} value={item._id}>{item.short_name}</option>
                                              })}</FormControl>
                                              <span className="errorMsg">{this.state.clinic_nameError}{this.state.formArr.clinic_name && validation.errors.first('clinic_name')}</span>
                                              </Col>
                                          </FormGroup>
                                          <FormGroup>
                                              <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                  Select Holidays
                                              </Col>
                                              <Col sm={6}>
                                                <MultipleDatePicker dateFormat="Pp"
                                                  onSubmit={dates => this.handleDateChange(dates)}
                                                 />
                                                 <span className="errorMsg">{this.state.calendar_dateError}{this.state.formArr.calendar_date && validation.errors.first('calendar_date')}</span>
                                              </Col>
                                        </FormGroup>
                                        <FormGroup>
                                                  <Col sm={4}></Col>
                                                  <Col sm={3}>
                                                    <input type="radio" name="type" onChange={e => { this.handleChange(e); }}/>Holiday
                                                    </Col>
                                                    <Col sm={3}>
                                                    <input type="radio" name="type" onChange={e => { this.handleChange(e); }}/>Dr On Leave
                                                </Col>
                                                <span className="errorMsg">{this.state.typeError}{this.state.formArr.type && validation.errors.first('type')}</span>
                                        </FormGroup>
                                        <FormGroup>
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Message
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl type="text" name="message" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">{this.state.messageError}{this.state.formArr.message && validation.errors.first('message')}</span>
                                                </Col>
                                        </FormGroup>
                                      </div>
                                    }

                                  ftTextCenter
                                  legend={
                                      <Button fill bsStyle="info" type="button" onClick={this.addClinicCalendar.bind(this)}>Submit</Button>
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

      clinicList: state.clinic.ClinicList,
      isClinicList: state.clinic.isClinicList,
      isClinicListError: state.clinic.isClinicListError,

      isAddClinicCalendar:state.clinicCalendar.isAddClinicCalendar,
      isAddClinicCalendarError:state.clinicCalendar.isAddClinicCalendarError,
      addClinicCalendarResponse:state.clinicCalendar.addClinicCalendarResponse,
    }
}
// export default AddClinicCalendar;
export default withRouter(connect(mapStateToProps, { addClinicCalendarAction,clinicListAction} )(AddClinicCalendar));
