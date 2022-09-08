import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import MultipleDatePicker from 'react-multiple-datepicker';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import { addClinicHolidayAction } from 'Front/actions/settings';
import moment from 'moment';

import Radio from 'Front/elements/CustomRadio/CustomRadio.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

class ClinicCalender extends Component {

    constructor(props) {
        super(props);
        this.state = {
       
            formData: {
                calendar_date:"",
                message:"",
                clinic_id:localStorage.getItem('_id'),
                clinic_name:localStorage.getItem('clinicName'),
                status:"active",
                type:"other",
            },
            calenderErr:false,
            showForm:true
          
        };

        this.hideAlert = this.hideAlert.bind(this);

    }

    componentWillReceiveProps(nextProps){ 
        
        if(nextProps.isAddClinicHoliday !== this.props.isAddClinicHoliday){
            this.successAlert();
         }

         if(nextProps.isAddClinicHolidayError !== this.props.isAddClinicHolidayError){
            this.errorAlert();
         }

    }

    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;        

        this.setState({formData:field});
         
    };

    handleRadio = event => {
        const target = event.target;

        let field = this.state.formData;

        field[target.name]  = target.value;        

        this.setState({formData:field});


    };


    handleDateChange(date){
       let data = this.state.formData;
       
       let dateArr = [];
       for(let i in date){
           
           let mytime = moment(new Date(date[i])).format('MM-DD-YYYY');
           dateArr.push(mytime);
       }

       data["calendar_date"]  = dateArr;
       this.setState({formData: data,calenderErr:false});
    }

    saveHoliday(){
        if(this.state.formData.calendar_date !== ''){
            this.props.addClinicHolidayAction(this.state.formData); 
        }else{
            this.setState({calenderErr:true});
        }
    }


   successAlert(){
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "-100px"}}
                    title="Success"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    Clinic Holiday Successfully Added!
                </SweetAlert>
            )
        });
    }

    errorAlert(){
        this.setState({
            alert: (
                <SweetAlert
                    danger
                    style={{display: "block",marginTop: "-100px"}}
                    title="Error"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    Something went wrong :)
                </SweetAlert>
            )
        });
    }



     hideAlert(){
       
        let formData = this.state.formData;

        formData['message'] = '';

        this.setState({
            alert: null,
            formData:formData
        });

        this.setState({showForm:false});
        let _this = this;
        setTimeout(function(){
            _this.setState({showForm:true});
        },300);

        
     }

    render() {
 
        return (
            <div className="main-content" style={{ padding: '15px 15px' }}>
             {this.state.alert}
             
                <Grid fluid>
                    <Row>
                    <Col md={12}>
                    {this.state.showForm &&
                            <Card
                                title="Clinic Holidays"
                                content={
                                    <Form horizontal>
                                    <Col sm={12}>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                Calendar Date <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>

                                                <MultipleDatePicker  dateFormat="Pp"
                                                      onSubmit={dates => this.handleDateChange(dates)}

                                                     />
                                                <span className="errorMsg" style={{display : this.state.calenderErr ? 'block' : 'none'}}>This is required field</span>
                                            </Col>
                                            <Col sm={3}>
                                            <span><span className="dot_red"></span> Leave /Holiday</span><br/>
                                            <span><span className="dot_blue"></span> Other</span>
                                            </Col>
                                           
                                            </FormGroup>

                                             <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                            Date Message
                                            </Col>
                                            <Col sm={6}>

                                            <FormControl rows="4" componentClass="textarea" name="message" bsClass="form-control" defaultValue="" onChange={e => { this.handleChange(e); }} />
                                              
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                Type
                                            </Col>
                                            <Col sm={6}>

                                             <Radio     
                                                        number="5"
                                                        option="other"
                                                        name="type"
                                                        onChange={this.handleRadio}
                                                        checked={this.state.formData.type === "other"}
                                                        label="Enable"
                                                    />
                                                    <Radio
                                                        number="6"
                                                        option="leave"
                                                        name="type"
                                                        onChange={this.handleRadio}
                                                        checked={this.state.formData.type === "leave"}
                                                        label="Disable"
                                                    />
                                            </Col>
                                        </FormGroup> 

                                         <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                Status
                                            </Col>
                                            <Col sm={6}>

                                            <select className="form-control" name="status" onChange={e => { this.handleChange(e); }}>
                                                   
                                                    <option value="active">Enabled</option>
                                                    <option value="inactive">Disable</option>
                                                </select>
                                                
                                            </Col>
                                        </FormGroup>                                     

                                            

                                        
                                        </Col>
                                       
                                        
                                        <FormGroup>
                                           
                                            <Col smOffset={3} sm={6}>
                                            <button type="button" onClick={this.saveHoliday.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
                                            </Col>
                                        </FormGroup>
                                        
                                    </Form>
                                }
                            />
                            }
                        </Col>
                    </Row>
                </Grid>
            
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {

        isAddClinicHoliday: state.settings.isAddClinicHoliday,
        isAddClinicHolidayError: state.settings.isAddClinicHolidayError,
        AddClinicHoliday: state.settings.AddClinicHoliday,


    }
}
export default withRouter(connect(mapStateToProps, { addClinicHolidayAction })(ClinicCalender));