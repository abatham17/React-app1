import React, { Component } from 'react';
import {  
    Grid, Row, Col, OverlayTrigger,
    Tooltip,Modal,Form,FormGroup,ControlLabel,FormControl
} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import { userListAction, getSpecializationsAction, updateUserAction, changeUserStatusAction } from 'Front/actions/master';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import moment from 'moment';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
    user_name: 'required',
    email: 'required|email',
    first_name: 'required',
    phone: 'required|numeric',
    degree: 'required',
    status: 'required',
    specializations: 'required',
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr:[],
            UserList: [],
            SpecializationList: [],
            isLoading: true,
            alert: null,
            show: false,
            editUserModal: false,
            formData:{
                id:'',
                user_name:'',
                email:'',
                first_name:'',
                last_name:'',
                phone:'',
                password:'',
                degree:'',
                specializations:[],
                status:''
            },
            multipleSelect: [null],
            specializationObj:[],
            successMsg:'User sucessfully updated.',
        }

        this.successDelete = this.successDelete.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

    }

    _setTableOption() {
        if (this.state.isLoading) {
            return (
                <Loading type='bars' color='#000000' style={{ margin: '0px auto', width: "40px" }} />
            );
        } else {
            return "No data found!";
        }
    }

    componentDidMount() {

        this.props.userListAction(this.props);
        this.props.getSpecializationsAction(this.props);

    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.isUserList !== this.props.isUserList){
            
            this.setState({UserList:nextProps.UserList.data.data});
        } 


        if(nextProps.isChangeStatus !== this.props.isChangeStatus){
            
            this.successDelete();
            this.props.userListAction(this.props);
        }

        if(nextProps.isUpdateUser !== this.props.isUpdateUser){
            
            this.setState({editUserModal: false, successMsg:'User sucessfully updated.'});
            this.props.userListAction(this.props);
            this.successDelete();
        }

        if(nextProps.isSpecialization !== this.props.isSpecialization){
            
           
            let specializationObj = [];
            for(let x in nextProps.SpecializationList.data){
                specializationObj[nextProps.SpecializationList.data[x]._id] = nextProps.SpecializationList.data[x];
            }

             this.setState({SpecializationList:nextProps.SpecializationList.data,specializationObj:specializationObj});

        }
      
        if (this.state.isLoading === true) {
            this.setState({ isLoading: false });
        }
    }

    get_age_by_dob(cell, row, enumObject, rowIndex) {
        if (row.dob !== '') {

            var dob = moment(row.dob, 'YYYY-MM-DD').subtract(1, 'days')
            var now = moment(new Date()); //todays date
            var end = moment(dob); // another date
            var duration = moment.duration(now.diff(end));
            var years = duration.years();
            var months = duration.months();
            return years + (months > 0 ? '.' + months : '');

        } else {
            return ''
        }
    }

    isApp(cell, row, enumObject, rowIndex) {
        if (row.app === 0) {
            return '';
        } else {
            return <i class="fa fa-check" aria-hidden="true"></i>;
        }
    }


    successDelete(){
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "-100px"}}
                    title="Success!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    {this.state.successMsg}
                </SweetAlert>
            )
        });
    }

    hideAlert(){
        this.setState({
            alert: null
        });
    }

    warningWithConfirmMessage(action,id,e){
        
        let msg = '';
        let successMsg = '';
        if(action === 'active'){
            successMsg = 'User sucessfully activated.'
            msg = 'You want to enable this user!'
        }else{
            successMsg = 'User sucessfully disabled.'
            msg = 'You want to disable this user!'
        }
        this.setState({successMsg:successMsg});

        const params = {
            status:action,
            id:id
        }


        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{display: "block",marginTop: "-100px"}}
                    title="Are you sure?"
                    onConfirm={() => this.props.changeUserStatusAction(params)}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Yes"
                    cancelBtnText="Cancel"
                    showCancel
                >
                    {msg}
                </SweetAlert>
            )
        });
    }
    
    editAction(rowData,e){
        //console.log(rowData)
        let formData = this.state.formData;
        formData['user_name'] = rowData.userName;
        formData['email'] = rowData.email;
        formData['first_name'] = rowData.firstName;
        formData['last_name'] = rowData.lastName;
        formData['phone'] = rowData.phone;
        formData['degree'] = rowData.degree;
        formData['status'] = rowData.status;
        formData['id'] = rowData._id;

        let multipleSelect = this.state.multipleSelect;
        multipleSelect = [];
        for(let i in rowData.specializations){
            
            let value = rowData.specializations[i].id;
            let label = this.state.specializationObj[value].name;
            formData.specializations.push({id:value,name:label});
            multipleSelect.push({label:label,value:value});
        }    

        this.setState({ editUserModal: true , formData:formData , multipleSelect: multipleSelect });
    }

    actionButton(cell, row, enumObject, rowIndex) {
        let icon = '';
        let style = '';
        let statusText = '';
        let action = '';
        if(row.status === 'active'){ 
           icon = <i className="fa fa-ban"></i>
           style = 'danger'
           statusText = 'Disable'
           action = 'inactive'
        }else{
           icon = <i className="fa fa-check"></i> 
           style = 'success'
           style = 'success'
           statusText = 'Enable'
           action = 'active'
        }


        return (<div>
            <OverlayTrigger placement="top" overlay={<Tooltip id="status">{statusText}</Tooltip>}>
                <Button simple icon bsStyle={style}  onClick={this.warningWithConfirmMessage.bind(this,action,row._id)}>
                    {icon}
                </Button>
               
            </OverlayTrigger>&nbsp;&nbsp;&nbsp;&nbsp;
            <OverlayTrigger placement="top" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                <Link to={{ pathname: ``, state: this.state.patient }} bsStyle="success" onClick={this.editAction.bind(this,row)}><i className="fa fa-edit"></i></Link>
            </OverlayTrigger>
            </div>
        )
    } 


    serialNumber(cell, row, enumObject, rowIndex){
        return rowIndex+1;
    }

    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;        

        this.setState({formData:field});
         
    };

    handleSpecializationsChange(value){

       let multipleSelect = this.state.multipleSelect;

       multipleSelect = value;

       this.setState({ multipleSelect: multipleSelect});

       let formData = this.state.formData;
       
       let catArr = [];
       
       if(value && value.length){
           value.map((key, i) => {

                catArr.push({ id: key.value, name: key.label })
                return '';
                             
            });
       }


       formData.specializations = catArr;


       this.setState({formData:formData});

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
  
   updateUser(evt){ 
        
        evt.preventDefault();
        const _this = this;   
        if(this.allValidate(false)){     
          _this.props.updateUserAction(this.state.formData);   
        }
        return validation.errors;
    }
   

    render() {
          validation = new Validator(this.state.formData, rules, mess);
          validation.passes();
          validation.fails();

        let SpecializationsOptions = [];

        if(this.state.SpecializationList && this.state.SpecializationList.length){

            this.state.SpecializationList.map((key, i) => {

                SpecializationsOptions.push({ value: key._id, label: key.name })
                return '';
             });
        }

        const options = {
           
            page: 1,  // which page you want to show as default
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.                    
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            noDataText: this._setTableOption(),
        };
        return (
            <div className="main-content settings-userlist" style={{ padding: '15px 15px' }}>
{this.state.alert}
                <Grid fluid>


                    <Row>
                        <Col md={12}>
                            <Card
                                title="User List"
                                content={
                                    <div className="fresh-datatables">
                                        <BootstrapTable selectRow="{selectRowProp}" deleteRow={false} data={this.state.UserList} search={true} multiColumnSearch={true} pagination={false} options={options} striped hover condensed scrollTop={'Bottom'}>
                                            <TableHeaderColumn hidden='true' tdAttr={{ 'data-attr': '_id' }} dataField='_id' isKey searchable={false}>Id</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '3.8%' }} tdStyle={{ width: '4%' }} tdAttr={{ 'data-attr': '#' }} dataField=''  dataFormat={this.serialNumber.bind(this)}>#</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8.4%' }} tdStyle={{ width: '9.1%' }} tdAttr={{ 'data-attr': 'USERNAME' }} dataField='userName'>USERNAME</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '15%' }} tdStyle={{ width: '9.1%' }} tdAttr={{ 'data-attr': 'EMAIL' }} dataField='email' dataSort={true}>EMAIL</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8.5%' }} tdStyle={{ width: '9.1%' }} tdAttr={{ 'data-attr': 'NAME' }} dataField='firstName' dataSort={true}>NAME</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8.5%' }} tdStyle={{ width: '9.1%' }} tdAttr={{ 'data-attr': 'PHONE' }} dataField='phone' >PHONE</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8.5%' }} tdStyle={{ width: '9.1%' }} tdAttr={{ 'data-attr': 'GROUP' }} dataField='degree'>GROUP</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8.5%' }} tdStyle={{ width: '9.1%' }} tdAttr={{ 'data-attr': 'CLINIC' }} dataField='clinicName'>CLINIC</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '6.1%' }} tdStyle={{ width: '7%' }} tdAttr={{ 'data-attr': 'STATUS' }} dataField='status'>STATUS</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '6.9%' }} tdStyle={{ width: '8%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'Action' }} dataFormat={this.actionButton.bind(this)}>Action</TableHeaderColumn>

                                        </BootstrapTable>

                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>


              <Modal show={this.state.editUserModal} onHide={() => this.setState({ editUserModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Edit User</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="Knowledge-Share">
                       <Form horizontal>
                                 <Row>
                                    <Col sm={5} smOffset={1}>
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    User Name <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="text" name="user_name" id="user_name" value={this.state.formData.user_name} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.user_name && validation.errors.first('user_name')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Email <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="text" name="email" id="email" value={this.state.formData.email} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.email && validation.errors.first('email')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Phone <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="text" name="phone" id="phone" value={this.state.formData.phone} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.phone && validation.errors.first('phone')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Password 
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="password" placeholder="********" name="password" id="password" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Status <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>
                                                    <select className="form-control" name="status" id="status" value={this.state.formData.status} onChange={e => { this.handleChange(e); }}>
                                                    <option value="active">Enable</option>
                                                    <option value="inactive">Disable</option>
                                                    </select>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.status && validation.errors.first('status')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                            

                                           
                                            

                                     </Col>
                                     <Col sm={5} >
                                           
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    First Name <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="text" name="first_name" id="first_name"  value={this.state.formData.first_name} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.first_name && validation.errors.first('first_name')}
                                                    </span>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Last Name <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="text" name="last_name" id="last_name" value={this.state.formData.last_name} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.last_name && validation.errors.first('last_name')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                         
                                            
                                           <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Degree <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>

                                                    <FormControl type="text" name="degree" id="degree" value={this.state.formData.degree} onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">
                                                    {this.state.formArr.degree && validation.errors.first('degree')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                            
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Specialization <span className="star">*</span>
                                                </Col>
                                                <Col sm={8}>
                                                   
                                                    <Select
                                                    placeholder="Select Specializations"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="multipleSelect"
                                                    value={this.state.multipleSelect}                                          
                                                    options={SpecializationsOptions}
                                                    onChange={(value) => { this.handleSpecializationsChange(value); }}
                                              
                                                />
                                                    <span className="errorMsg">
                                                    {this.state.formArr.specializations && validation.errors.first('specializations')}
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                           
                                           

                                     </Col>
                                     <Col sm={11} smOffset={1}>
                                      <FormGroup>
                                            
                                            <Col sm={12}>
                                            <button type="button" className="btn-fill btn-wd btn btn-info" onClick={this.updateUser.bind(this)}>Save</button>
                                            </Col>
                                           </FormGroup>
                                     </Col>
                                     </Row>   
                                        
                                        
                                    </Form>
                     </Modal.Body>
                    <Modal.Footer>                                            
                        <Button className="btn pull-right"  onClick={() => this.setState({ editUserModal: false  })}  >Close</Button>
                        </Modal.Footer>
                </Modal> 
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {

        isUserList: state.master.isUserList,
        isUserListError: state.master.isUserListError,
        UserList: state.master.UserList,

        isSpecialization: state.master.isSpecialization,
        isSpecializationError: state.master.isSpecializationError,
        SpecializationList: state.master.SpecializationList,

        isUpdateUser: state.master.isUpdateUser,
        isUpdateUserError: state.master.isUpdateUserError,
        UpdateUser: state.master.UpdateUser,

        isChangeStatus: state.master.isChangeStatus,
        isChangeStatusError: state.master.isChangeStatusError,
        ChangeStatus: state.master.ChangeStatus,

    }
}
export default withRouter(connect(mapStateToProps, { userListAction , getSpecializationsAction, updateUserAction, changeUserStatusAction })(UserList));
