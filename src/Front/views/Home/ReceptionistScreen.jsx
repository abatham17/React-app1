import React, { Component } from 'react';
import {
   Col,OverlayTrigger, Tooltip, Row , Grid, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import { connect } from 'react-redux';
import Card from 'Front/components/Card/Card.jsx';
import { withRouter, Link } from 'react-router-dom';
import { visitListAction } from 'Front/actions/home';
import { patientOutAction } from 'Front/actions/home';
import * as PF from "Front/views/Home/PublicFunction.jsx"
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import Loading from 'react-loading';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; 
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { patientRegistrationAction, patientEditAction } from 'Front/actions/home';
import SweetAlert from 'react-bootstrap-sweetalert';
import{  titleOptions  } from 'Front/variables/Variables.jsx';
import Datetime from 'react-datetime';
import { appConstants } from 'Front/_constants/app.constants.js';

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
    dob: 'required',
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
class ReceptionistScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitList:this.props.visitList,
            search: this.props.search,
            search_date:this.props.search_date,
            taskContent:'',
            row:[],
            outId:'',
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
                patientId:'',
                patientEditId:'',
                title:'',
                first_name:'',
                last_name:'',
                gender:'',
                dob:'',
                age:'',
                email:'',
                height:'',
                weight:'',
                city:'',
                remark:'',
                dobd:'',
            },
        };

        this.handleDob = this.handleDob.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        if(this.props.location.state){ 
            this.handleDob(this.props.location.state.dob);
        }

        let _this = this; 
        const search_date = this.props.search_date;
        
        appConstants.socket.on('addPatient', function(responce){        

               setTimeout(function(){
                   _this.props.visitListAction(search_date)

              },1000);
      });
        
    }

    componentDidMount() { 
       
        this.props.visitListAction(this.state.search_date)    
    }    

    componentWillReceiveProps(nextProps){ 
        
        if(nextProps.isVisitList !== this.props.isVisitList){ 

           let j = 0;
           let visitList;
           
            visitList = nextProps.VisitList.data.data.map((key, i) => {  
                let patient = key.patient_data[0];
                let h = patient.height;
                let w = patient.weight;
                let g = patient.gender
                return {
                        id             :key._id,
                        sn             :++j,
                        pId            :patient._id,
                        patientNo      :patient.patientNo,
                        patientId      :patient.patientClinicId,
                        name           :patient.title+' '+patient.firstName+' '+patient.lastName,
                        age            :PF.getAgeByDob(patient.dob),
                        city           :patient.city, 
                        share          :key.doc_count + ' / ' + key.read_docs_count, 
                        read_share     :key.read_docs_count, 
                        task           :key.task_count + ' / ' + key.complete_tasks_count,
                        complete_task  :key.complete_tasks_count, 
                        diet           :0, 
                        in_time        :moment(key.createdAt).format('hh:mm A'), 
                        next_visit_date:patient.nextDate, 
                        app            :0,
                        status         :key.status,
                        height         :h,
                        weight         :w,
                        bmi            :PF.getBMI(h, w),
                        ibw            :PF.getIBW(h, w, g),
                        c1             :PF.getMaintainWeight(h, w, g),
                        c2             :PF.getLooseWeight(h, w, g),
                        c3             :PF.getGainWeight(h, w, g),
                        segCalorie     :PF.getCalorie(h, w, g),
                        calorieType    :PF.getCalorieType(h, w, g),
                        created_date   :moment(key.createdAt).format('YYYY-MM-DD'),
                        remark         :key.remark,
                        taskList       :key.Tasks,
                        documentList   :key.Documents,
                        educatorOut    :key.educatorOut,
                        patientEditId    :key.educatorOut,
                        title    : patient.title,
                        _id    : key._id,
                        firstName    :patient.firstName,
                        lastName    :patient.lastName,
                        gender    :patient.gender,
                        dob    :patient.dob,      
                        email    :patient.email             
                         
                }
            });   
            this.setState({visitList:visitList});          
        }

        if(nextProps.isPatientOut !== this.props.isPatientOut){ 
            let element = document.getElementsByClassName(this.state.outId);            
            element[0].classList.add("bg-Out");
            this.setState({outId:''});
        }

        if(this.state.isLoading===true){
           this.setState({isLoading:false});
        }


        
        if (nextProps.isPatientRegistration !== this.props.isPatientRegistration) { 
           this.successAlert('Patient Successfully Registered');

           setTimeout(function(){

                let params = {
                clinicId:localStorage.getItem('clinicId'),
            } 

            appConstants.socket.emit('addPatient', params);

        },1000);
               
             let formData = this.state.formData;
             let formArr = [];
             formData['patientId'] = "";
             formData['patientEditId'] = "";
             formData['title'] = "";
             formData['first_name'] = "";
             formData['last_name'] = "";
             formData['gender'] = "";
             formData['dob'] = "";
             formData['age'] = "";
             formData['email'] = "";
             formData['height'] = "";
             formData['weight'] = "";
             formData['city'] = "";
             formData['remark'] = "";
             formData['dobd'] = "";
             this.setState({formData:formData});
             this.setState({ formArr });
             //this.props.visitListAction(this.state.search_date) 

        }


        if (nextProps.isPatientEdit !== this.props.isPatientEdit) { 
           this.successAlert('Patient Successfully Updated');
           setTimeout(function(){

                    let params = {
                    clinicId:localStorage.getItem('clinicId'),
                } 

                appConstants.socket.emit('addPatient', params);

            },1000);

               
             let formData = this.state.formData;
             let formArr = [];
             formData['patientId'] = "";
             formData['patientEditId'] = "";
             formData['title'] = "";
             formData['first_name'] = "";
             formData['last_name'] = "";
             formData['gender'] = "";
             formData['dob'] = "";
             formData['age'] = "";
             formData['email'] = "";
             formData['height'] = "";
             formData['weight'] = "";
             formData['city'] = "";
             formData['remark'] = "";
             formData['dobd'] = "";
             this.setState({formData:formData});
             this.setState({ formArr });
             //this.props.visitListAction(this.state.search_date) 

        }


       
    } 

    isApp(cell, row){
        if(row.app === 0){
            return '';
        }else{
            return <i class="fa fa-check" aria-hidden="true"></i>;
        }
    }

    outButton(cell, row){ 

            return (<OverlayTrigger placement="top" overlay={<Tooltip id="remove">Remove</Tooltip>}>
            <Button simple bsStyle="danger" bsSize="xs" onClick={this.patientVisitOut.bind(this, row.id)}>
                <i className="fa fa-times"></i>
            </Button>
        </OverlayTrigger>);
        
    }

    patientVisitOut(id){ 
        this.setState({outId:id});
        confirmAlert({
            title: 'Confirm to out',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.patientOutAction(id)
              },
              {
                label: 'No',
              }
            ]
          })
    }

    _setTableOption(){
        if(this.state.isLoading){
          return(
            <Loading type ='bars' color='#000000'  style={{margin: '0px auto',width: "40px"}} />
          );
        }else{
          return "No data found!";
        }
      }

    getOutClass(row, rowIdx) {  
        if (row.educatorOut === 'out') { 
           return row.id+" bg-Out";
        } else {
           return row.id;
        }
    }

    nextButton(cell, row, enumObject, rowIndex){         
        
        return (<OverlayTrigger placement="top" overlay={<Tooltip id="NextVisit">Next Visit</Tooltip>}>
            
            <Link to={{ pathname: '/next-visit', state: { row: row} }}><i className="fa fa-calendar"></i> { row.next_visit_date!==null && row.next_visit_date?moment(row.next_visit_date).format('DD-MM-YYYY'):''} </Link>
          
        </OverlayTrigger>);
    
    }

    taskScreen(cell, row, enumObject, rowIndex){         
        
        return (<Link to="#" onClick={e => { this.handleTaskScreen(row); }}>{row.patientId}</Link>);
    
    }

    handleTaskScreen(row){ 
         
         let formData = this.state.formData;

         formData['patientId'] = row.patientId;
         formData['patientEditId'] = row.pId;
         formData['title'] = row.title;
         formData['first_name'] = row.firstName;
         formData['last_name'] = row.lastName;
         formData['gender'] = row.gender;
         formData['dob'] = moment(row.dob).format('YYYY-MM-DD');
         formData['age'] = row.age;
         formData['email'] = row.email;
         formData['height'] = row.height;
         formData['weight'] = row.weight;
         formData['city'] = row.city;
         formData['remark'] = row.remark;

         formData['dobd'] = moment(row.dob).format('MM/DD/YYYY');

         this.setState({formData:formData});


       
    }

     successAlert(msg, link) {  
        
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Success"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    {msg}
                </SweetAlert>
            )
        });
    }

    hideAlert() { 
        this.setState({
            alert: false
        });
      
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
         
    };

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
        return validation.errors;
    }

    nameContent(cell, row, enumObject, rowIndex){
        if(row.documentList['0']){ 
            
            return (<span>{row.name}<OverlayTrigger placement="bottom" overlay={<Tooltip id="Name"><b>SHARE:<br/>{
                row.documentList.map((value,key)=>{ 
                    return (<span className={value.status === "read"?'green':(value.addedByType==="educator"?'pink':'red')}><b>{key+1}. </b>{value.documentName}<br/></span>)
                }) 
            }</b></Tooltip>}>                    
                    <span class="badge"><span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span></span>
                    </OverlayTrigger></span>);
      
        }else{
            return (<span>{row.name}</span>);
        }                
    }
   
    
    render() {

         validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        let title = this.state.formData.title;
       
          const options = {
            afterDeleteRow: this.handleDeleteButtonClick,
            noDataText: this._setTableOption(),
          };
        return (
            <Row>
            <Col md={4} className="no-padding">
                <div className="visit-list">
                    <BootstrapTable data={ this.state.visitList }  search={ true } multiColumnSearch={ true } options={options} striped hover condensed  trClassName={this.getOutClass}>

                    <TableHeaderColumn hidden='true' tdAttr={{ 'data-attr': 'id' }} dataField='id' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'30px'}}  tdStyle={{width:'30px'}}   thAttr={{ 'data-attr': '#' }} dataField='sn'>#</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'75px'}}  tdStyle={{width:'75px'}}   tdAttr={{ 'data-attr': 'PATIENT ID' }} dataField='patientId' dataFormat={this.taskScreen.bind(this)}>PATIENT ID</TableHeaderColumn>

                    <TableHeaderColumn tdAttr={{ 'data-attr': 'NAME' }} dataField='' dataFormat={this.nameContent.bind(this)}>NAME</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'41px'}}  tdStyle={{width:'41px'}}   tdAttr={{ 'data-attr': 'APP' }} dataField='' dataFormat={this.isApp.bind(this)}>APP</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'41px'}}  tdStyle={{width:'41px'}}   tdAttr={{ 'data-attr': 'OUT' }} dataField='' dataFormat={this.outButton.bind(this)}>OUT</TableHeaderColumn>

                    </BootstrapTable>
                </div>
                </Col>
                <Col md={8} className="no-padding" id="task-content">
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

                                                <FormControl type="text" name="patientId" id="patientId" value={this.state.formData.patientId} onChange={e => { this.handleChange(e); }}/>
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

                                                <FormControl type="text" name="first_name" id="first_name" value={this.state.formData.first_name} onChange={e => { this.handleChange(e); }}/>
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

                                                <FormControl type="text" name="last_name" id="last_name" value={this.state.formData.last_name} onChange={e => { this.handleChange(e); }}/>
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
                                                    value={this.state.formData.dobd}
                                                    onChange={this.handleDob}
                                                />
                                                <span className="errorMsg">
                                                {this.state.dobError}
                                                {this.state.formArr.dob && validation.errors.first('dob')}</span>
                                            </Col>
                                            <Col sm={4}>

                                                <FormControl type="text" name="age" id="age" value={this.state.formData.age} placeholder="Age: Eg-30" onChange={e => { this.handleChange(e); }}/>
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
    
                                                    <FormControl type="email" name="email" id="email" value={this.state.formData.email} onChange={e => { this.handleChange(e); }}/>
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

                                                <FormControl type="text" name="height" id="height" value={this.state.formData.height} onChange={e => { this.handleChange(e); }}/>
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

                                                <FormControl type="text" name="weight" id="weight" value={this.state.formData.weight} onChange={e => { this.handleChange(e); }}/>
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

                                                <FormControl type="text" name="city" id="city" value={this.state.formData.city} onChange={e => { this.handleChange(e); }}/>
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

                                            <FormControl rows="4" componentClass="textarea" name="remark" bsClass="form-control" value={this.state.formData.remark} onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                {this.state.remarkError}
                                                {this.state.formArr.remark && validation.errors.first('remark')}</span>
                                            </Col>
                                        </FormGroup>

                                        </Col>
                                         <FormGroup>
                                           
                                            <Col smOffset={2} sm={6}>
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
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
      VisitList: state.home.VisitList,
      isVisitList: state.home.isVisitList,
      isVisitListError: state.home.isVisitListError,

      PatientOut: state.home.PatientOut,
      isPatientOut: state.home.isPatientOut,
      isPatientOutError: state.home.isPatientOutError,

      PatientRegistrationMessage: state.home.PatientRegistration,
      isPatientRegistration: state.home.isPatientRegistration,
      isPatientRegistrationError: state.home.isPatientRegistrationError,

        PatientEditMessage: state.home.PatientEdit,
        isPatientEdit: state.home.isPatientEdit,
        isPatientEditError: state.home.isPatientEditError,

    }

  }
  export default withRouter(connect(mapStateToProps, { patientRegistrationAction, patientEditAction, visitListAction, patientOutAction } )(ReceptionistScreen));
