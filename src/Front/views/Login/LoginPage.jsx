import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'Front/components/Card/Card.jsx';

import Button from 'Front/elements/CustomButton/CustomButton.jsx';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginAction } from 'Front/actions/login';
import loadingImg from 'Front/assets/img/loading.gif';


let Validator = require('validatorjs');
let formArr = {}
let rules = {
  username: 'required',
  password: 'required',
};
let mess = {
  required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          cardHidden: true,
          formArr:[],
          formData:{
            username: "",
            password: ""
          },
          isLogin:true,
          showProcessing:false,
        }
    }

    componentDidMount(){

        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 700);
    }

    componentWillReceiveProps(nextProps){ 
        if(nextProps.isLogin !== this.props.isLogin){ 
            localStorage.setItem('_id',nextProps.LoginData.data._id)
            localStorage.setItem('chatModel',false)
            localStorage.setItem('userName',nextProps.LoginData.data.userName)
            localStorage.setItem('userType',nextProps.LoginData.data.userType)
            localStorage.setItem('clinicId',nextProps.LoginData.data.clinicId)
            localStorage.setItem('clinicName',nextProps.LoginData.data.clinicName)
            localStorage.setItem('clinicNumber',nextProps.LoginData.data.clinicNumber)
            localStorage.setItem('email',nextProps.LoginData.data.email)
            localStorage.setItem('status',nextProps.LoginData.data.status)
            localStorage.setItem('token',nextProps.LoginData.data.token)
            localStorage.setItem('degree',nextProps.LoginData.data.degree)
            localStorage.setItem('firstName',nextProps.LoginData.data.firstName)
            localStorage.setItem('lastName',nextProps.LoginData.data.lastName)
            localStorage.setItem('profilePhoto',nextProps.LoginData.data.image)            
            localStorage.setItem('profilePhoto',nextProps.LoginData.data.image)
            if(nextProps.LoginData.data.clinic){
                localStorage.setItem('logo',nextProps.LoginData.data.clinic.logo_image)
                localStorage.setItem('diet_print_format',nextProps.LoginData.data.clinic.diet_print_format)
                localStorage.setItem('print_header_margin',nextProps.LoginData.data.clinic.print_header_margin)
                localStorage.setItem('left_margin',nextProps.LoginData.data.clinic.left_margin)
                localStorage.setItem('right_margin',nextProps.LoginData.data.clinic.right_margin)
                localStorage.setItem('clinicAddress',nextProps.LoginData.data.clinic.address)
                localStorage.setItem('clinicPhone',nextProps.LoginData.data.clinic.phone)
                localStorage.setItem('clinicEmail',nextProps.LoginData.data.clinic.email)
                localStorage.setItem('isEmailFacility',nextProps.LoginData.data.clinic.is_email_facility)
            }

            if(nextProps.LoginData.data.userType === 'admin'){
                window.location.href = '/admin/dashboard';
            }
            else{
                localStorage.setItem('logo',nextProps.LoginData.data.clinic.logo_image)

                if(nextProps.LoginData.data.userType === 'receptionist'){
                    window.location.href = '/dashboard';
                }else{
                    //history.replace('/dashboard');
                     window.location.href = '/dashboard';
                }
            }
        }

        if(nextProps.isLoginError !== this.props.isLoginError){
          this.setState({ alert: nextProps.loginMessage.msg,showProcessing: false});
        }

    }

    userLogin(evt){
        evt.preventDefault();

        const _this = this;

        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.loginAction(this.state);
        }
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

    handleChange = e => { debugger
      e.preventDefault();      
      let field = this.state.formData;
      field[e.target.name]  = e.target.value;
      this.setState({
        formData:field
      });
    };

    onKeyDownSubmit(event){ 
        let key = event.which || event.keyCode;
        if(key === 13){
            document.getElementById('login-btn').click();
        }
    }

    render(){
         validation = new Validator(this.state.formData, rules, mess);
         validation.passes();
         validation.fails();

        return (
            <Grid>
                <Row>

                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>

                        <form>
                        <div className="actionProcess"  style={{display: this.state.showProcessing ? 'block' : 'none' }}>
                          <img src={loadingImg} alt="Loading" width="40px" />
                          <center>Logging In - Please Wait</center>
                        </div>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                       <FormGroup>
                                            <ControlLabel>
                                                User Name
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter User Name"
                                                type="email"
                                                id="username"
                                                name="username"
                                                onChange={e => { this.handleChange(e); }}
                                                onKeyDown={e => { this.onKeyDownSubmit(e); }}
                                            />
                                            <span className="errorMsg">{this.state.formArr.username && validation.errors.first('username')}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={e => { this.handleChange(e); }}
                                                onKeyDown={e => { this.onKeyDownSubmit(e); }}
                                            />
                                             <span className="errorMsg">{this.state.formArr.password && validation.errors.first('password')}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Checkbox
                                                number="1"
                                                label="Keep me signed in"
                                            />
                                        </FormGroup>
                                         {this.state.alert &&
                                          <div className="errorMsg"> {this.state.alert} </div>
                                        }
                                    </div>
                                }
                                legend={
                                    <Button id={'login-btn'} onClick={this.userLogin.bind(this)} bsStyle="info" fill wd>
                                        Login
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {

  return {
    loginMessage: state.login.message,
    isLogin: state.login.isLogin,
    LoginData: state.login.LoginData,
    isLoginError: state.login.isLoginError,

  }
}
export default withRouter(connect(mapStateToProps, { loginAction } )(LoginPage));
