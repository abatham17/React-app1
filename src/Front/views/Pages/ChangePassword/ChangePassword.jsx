import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import { changePasswordAction } from 'Front/actions/settings';
import SweetAlert from 'react-bootstrap-sweetalert';
import history from '../../../routes/history';
class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passFormData:{
            new_password:'',
            old_password:'',
            confirm_password:''
          },
          passValidation:{
            new_password:false,
            old_password:false,
            confirm_password:false,
            confirm_password_match:false,
            character_limit:false,
          },
          alert: null,
        };
        this.hideAlert = this.hideAlert.bind(this);

    }
  
    componentWillReceiveProps(nextProps){ 
        
       
         if(nextProps.isChangePassword !== this.props.isChangePassword){
            this.successAlert();
         }

         if(nextProps.isChangePasswordError !== this.props.isChangePasswordError){
            this.errorAlert();
         }



    }


    checkValidation(){

    let field1= this.state.passValidation;
    let valid = 1;
    
    if(this.state.passFormData.new_password === ''){      
      field1['new_password'] = true;     
      valid = 0;
    }else{
      field1['new_password'] = false;
    }

    if(this.state.passFormData.old_password === ''){      
      field1['old_password'] = true;     
      valid = 0;
    }else{
      field1['old_password'] = false;
    }

    if(this.state.passFormData.confirm_password === ''){      
      field1['confirm_password'] = true;
      valid = 0;     
    }else{
      field1['confirm_password'] = false;
    }

    if((this.state.passFormData.new_password !== this.state.passFormData.confirm_password) && this.state.passFormData.confirm_password!==''){   
       valid = 0;
       field1['confirm_password_match'] = true;       
    }else{
       field1['confirm_password_match'] = false; 
    }


    if((this.state.passFormData.new_password.length < 6) && this.state.passFormData.new_password!==''){
       valid = 0;
       field1['character_limit'] = true; 
    }else{
       field1['character_limit'] = false; 
    }

    this.setState({passValidation:field1});

    return valid;

  }

    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;        


        this.setState({formData:field});
         
    };


    updatePassword(evt){
        evt.preventDefault();
        
        let valid = this.checkValidation(); 

        if(valid === 1){     
          this.props.changePasswordAction(this.state.passFormData);
        }
    }


    handlePassChange = e => {
        e.preventDefault();
        let field= this.state.passFormData;
        let field2= this.state.passValidation;
        field[e.target.name]  = e.target.value; 
        field2[e.target.name]  = false;

        this.setState({
          passFormData:field,
          passValidation:field2
        });

        this.checkValidation(); 


      };

       
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
                    Password successfully changed!
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
                    onConfirm={() => this.hideAlert2()}
                    onCancel={() => this.hideAlert2()}
                    confirmBtnBsStyle="info"
                >
                    Wrong old Password or something went wrong :)
                </SweetAlert>
            )
        });
    }


     Logout(){
          localStorage.removeItem('_id')
          localStorage.removeItem('userName')
          localStorage.removeItem('userType')
          localStorage.removeItem('email')
          localStorage.removeItem('status')
          localStorage.removeItem('token')
          localStorage.removeItem('degree')
          localStorage.removeItem('firstName')
          localStorage.removeItem('lastName')
          history.push({pathname: '/login'});
    }

     hideAlert(){
        this.setState({
            alert: null,
        });
        this.Logout(this); 
     }

     hideAlert2(){
        this.setState({
            alert: null,
        });
     }
   


    render() {
      
        return (
            <div className="main-content" style={{ padding: '15px 15px' }}>
            {this.state.alert}
                <Grid fluid>
                    <Row>
                    <Col md={12}>
                            <Card
                                title="Change Password"
                                content={
                                    <Form horizontal>
                                    <Col sm={12}>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                Old Password <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="password" name="old_password" id="old_password" onChange={e => { this.handlePassChange(e); }}/>
                                                <span className="errorMsg" style={{display : this.state.passValidation.old_password ? 'block' : 'none'}}>This is required field</span>
                                            </Col>                                            
                                           
                                            </FormGroup>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                New Password <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="password" minLength="6" maxLength="20" name="new_password" id="new_password" onChange={e => { this.handlePassChange(e); }}/>
                                                <span className="errorMsg" style={{display : this.state.passValidation.new_password ? 'block' : 'none'}}>This is required field</span>
                                                <span className="errorMsg" style={{display : this.state.passValidation.character_limit ? 'block' : 'none'}}>Password should be minimum 6 character</span>
                                            </Col> 

                                             <Col componentClass={ControlLabel} sm={3}>  
                                             [Character Limit 6 - 20]
                                             </Col>                                         
                                           
                                            </FormGroup>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                Confirm New Password <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>

                                                <FormControl type="password" minLength="6" maxLength="20" name="confirm_password" id="confirm_password" onChange={e => { this.handlePassChange(e); }}/>
                                               <span className="errorMsg" style={{display : this.state.passValidation.confirm_password ? 'block' : 'none'}}>This is required field</span>
                                               <span className="errorMsg" style={{display : this.state.passValidation.confirm_password_match ? 'block' : 'none'}}>Password not matching</span>
                                            </Col>  
                                            <Col componentClass={ControlLabel} sm={3}>  
                                             [Character Limit 6 - 20]
                                             </Col>                                          
                                           
                                            </FormGroup>

                                        
                                        </Col>
                                       
                                        
                                        <FormGroup>
                                           
                                            <Col smOffset={3} sm={6}>
                                            <button type="submit" onClick={this.updatePassword.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
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

    return {

        isChangePassword: state.settings.isChangePassword,
        isChangePasswordError: state.settings.isChangePasswordError,
        ChangePassword: state.settings.ChangePassword,

    }
}
export default withRouter(connect(mapStateToProps, { changePasswordAction })(ChangePassword));