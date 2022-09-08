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
import history from '../../routes/history';
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
debugger
    
        if(nextProps.isLogin !== this.props.isLogin){
          localStorage.setItem('_id',nextProps.LoginData.data._id)
          localStorage.setItem('username',nextProps.LoginData.data.username)
          localStorage.setItem('userType',nextProps.LoginData.data.userType)
          localStorage.setItem('email',nextProps.LoginData.data.email)
          localStorage.setItem('status',nextProps.LoginData.data.status)
          localStorage.setItem('token',nextProps.LoginData.data.token)

          this.props.history.push({pathname: '/dashboard'}); 
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

    handleChange = e => {
      e.preventDefault(); 

      let field = this.state.formData;
      
      field[e.target.name]  = e.target.value;

      this.setState({
        formData:field
      });

    };  

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
                                    <Button onClick={this.userLogin.bind(this)} bsStyle="info" fill wd>
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
