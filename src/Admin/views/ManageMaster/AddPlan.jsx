import React, { Component } from 'react';
import {Grid, Row, Col,Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { addPlanAction } from 'Admin/actions/master';
import loadingImg from 'Admin/assets/img/loading.gif';


let Validator = require('validatorjs');
let formArr = {}
let rules = {
    plan_name: 'required',
    amount: 'required',
    duration: 'required',
    status: 'required',
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class AddPlan extends Component{
    constructor(props){
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            formArr:[],
            isLogin:true,
            showProcessing:false,
            // Elements
            formData:{
              plan_name: "",
              amount: "",
              duration: "",
              status: "active",
            },
        }
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.isAddPlanError !== this.props.isAddPlanError){
          this.setState({ showProcessing: false });
          if(nextProps.addPlanResponse.errors){
              nextProps.addPlanResponse.errors.map((key,i) => {
                  this.setState({[(key.param)+"Error"]:key.msg})
              });
          }
        }

        if (nextProps.isAddPlan !== this.props.isAddPlan && nextProps.addPlanResponse.status === 'Success' && this.state.formData.plan_name !=='') {
            this.props.handleClick('success', nextProps.addPlanResponse.msg)
            this.props.history.push(`/admin/plan-list`)
        }
    }

    addPlan(evt){

        evt.preventDefault();
        const _this = this;
        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.addPlanAction(this.state);
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
                                        <legend>Plan Details</legend>
                                    }
                                    content={
                                        <div>
                                          <FormGroup>
                                              <Col sm={2}>
                                                  <Col componentClass={ControlLabel} >
                                                      Plan Name
                                                  </Col>
                                                  <FormControl type="text" name="plan_name" onChange={e => { this.handleChange(e); }}/>
                                                  <span className="errorMsg">{this.state.plan_nameError}{this.state.formArr.plan_name && validation.errors.first('plan_name')}</span>
                                              </Col>
                                              <Col sm={2}>
                                                  <Col componentClass={ControlLabel} >
                                                      Amount
                                                  </Col>
                                                  <FormControl type="text" name="amount" onChange={e => { this.handleChange(e); }}/>
                                                  <span className="errorMsg" refs="amount">{this.state.amountError}{this.state.formArr.amount && validation.errors.first('amount')}</span>
                                              </Col>
                                              <Col sm={2}>
                                                  <Col componentClass={ControlLabel}>
                                                      Duration
                                                  </Col>
                                                  <FormControl type="text" name="duration" onChange={e => { this.handleChange(e); }}/>
                                                  <span className="errorMsg" refs="amount">{this.state.durationError}{this.state.formArr.duration && validation.errors.first('duration')}</span>
                                              </Col>
                                              <Col sm={3}>
                                                  <Col componentClass={ControlLabel}>
                                                     Status
                                                  </Col>
                                                  <FormControl  componentClass="select" name="status" onChange={e => { this.handleChange(e);}}>
                                                  <option value="active">Active</option>
                                                  <option value="inactive">Inactive</option>
                                                  </FormControl>
                                              </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button fill bsStyle="info" type="button" onClick={this.addPlan.bind(this)}>Submit</Button>
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

      isAddPlan:state.master.isAddPlan,
      isAddPlanError:state.master.isAddPlanError,
      addPlanResponse:state.master.addPlan,

    }
}
// export default AddPlan;
export default withRouter(connect(mapStateToProps, { addPlanAction} )(AddPlan));
