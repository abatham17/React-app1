import React, { Component } from 'react';
import {Grid, Row, Col,Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';

import Button from 'Admin/elements/CustomButton/CustomButton.jsx';


import { clinicListAction } from 'Admin/actions/clinic';
import { planListAction } from 'Admin/actions/master';
import { addClinicSubscriptionAction } from 'Admin/actions/clinic_subscription';
import loadingImg from 'Admin/assets/img/loading.gif';


let Validator = require('validatorjs');
let formArr = {}
let rules = {
    clinic_id: 'required',
    plan_id: 'required',
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class AddClinicSubscription extends Component{
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
              clinic_id: "",
              clinic_name: "",
              plan_id: "",
            },
            //Lists
            clinicList :[],
            planList :[],
        }
    }
    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
          let data = this.state.formData;
          data["clinic_name"]  = this.props.location.state.name;
          data["clinic_id"]  = this.props.location.state._id;
          this.setState({formData: data});
        }
        this.props.clinicListAction(this.state)
        this.props.planListAction(this.state)
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.isClinicList !== this.props.isClinicList){
            this.setState({
                clinicList: nextProps.clinicList.data.data
            });
        }
        if(nextProps.isPlanList !== this.props.isPlanList){
            this.setState({
                planList: nextProps.planList.data.data
            });
        }

        if(nextProps.isAddClinicSubscriptionError !== this.props.isAddClinicSubscriptionError){
          this.setState({ showProcessing: false });
          if(nextProps.addClinicSubscriptionResponse.errors){
              nextProps.addClinicSubscriptionResponse.errors.map((key,i) => {
                  this.setState({[(key.param)+"Error"]:key.msg})
              });
          }
        }

        if (nextProps.isAddClinicSubscription !== this.props.isAddClinicSubscription && nextProps.addClinicSubscriptionResponse.status === 'Success' && this.state.formData.clinic_name !== '') {
            this.props.handleClick('success', nextProps.addClinicSubscriptionResponse.msg)
            this.props.history.push(`/admin/clinic-subscription`)
        }
    }

    addClinicSubscription(evt){

        evt.preventDefault();
        const _this = this;
        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.addClinicSubscriptionAction(this.state);
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
    handleClinicChange(event) {
        let data = this.state.formData;
        data["clinic_name"]  = event.target[event.target.selectedIndex].text;
        data["clinic_id"]  = event.target.value;
        this.setState({formData: data});
    }
    handlePlanChange(event) {
        let data = this.state.formData;
        data["plan_id"]  = event.target.value;
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
                                        <legend>Clinic Details</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                                  <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                      Clinic
                                                  </Col>
                                                  <Col sm={6}>
                                                    <FormControl  componentClass="select" name="clinic_id" onChange={e => { this.handleChange(e);this.handleClinicChange(e); }} value={this.state.formData.clinic_id}>
                                                    <option value="">Please select</option>
                                                    {this.state.clinicList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.short_name}</option>
                                                    })}</FormControl>
                                                    <span className="errorMsg">{this.state.clinic_idError}{this.state.formArr.clinic_id && validation.errors.first('clinic_id')}</span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                        Plan
                                                    </Col>
                                                      <Col sm={6}>
                                                    <FormControl  componentClass="select" name="plan_id" onChange={e => { this.handleChange(e);this.handlePlanChange(e); }}>
                                                    <option value="">Please select</option>
                                                    {this.state.planList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.planName}</option>
                                                    })}</FormControl>
                                                    <span className="errorMsg">{this.state.plan_idError}{this.state.formArr.plan_id && validation.errors.first('plan_id')}</span>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button fill bsStyle="info" type="button" onClick={this.addClinicSubscription.bind(this)}>Submit</Button>
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

      planList: state.master.planList,
      isPlanList: state.master.isPlanList,
      isPlanListError: state.master.isPlanListError,

      clinicList: state.clinic.ClinicList,
      isClinicList: state.clinic.isClinicList,
      isClinicListError: state.clinic.isClinicListError,

      isAddClinicSubscription:state.clinicSubscription.isAddClinicSubscription,
      isAddClinicSubscriptionError:state.clinicSubscription.isAddClinicSubscriptionError,
      addClinicSubscriptionResponse:state.clinicSubscription.addClinicSubscriptionResponse,

    }
}
// export default AddClinic;
export default withRouter(connect(mapStateToProps, { clinicListAction,planListAction,addClinicSubscriptionAction} )(AddClinicSubscription));
