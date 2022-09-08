import React, { Component } from 'react';
import {
   Col,OverlayTrigger, Tooltip, Row, FormGroup,
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
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
import EducatorTaskScreen from "Front/views/TaskScreen/EducatorTaskScreen.jsx"
import { appConstants } from 'Front/_constants/app.constants.js';

class EducatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitList:this.props.visitList,
            search: this.props.search,
            search_date:this.props.search_date,
            taskContent:'',
            row:[],
            outId:'',
        };

        let _this = this; 
        const search_date = this.props.search_date;
        
         appConstants.socket.on('updateTaskScreen', function(responce){             

                 setTimeout(function(){
                    
                     _this.props.visitListAction(search_date)

                },1000);
        });

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
                        lastDiet       :patient.lastDiet,
                         
                }
            });          
            
            this.setState({visitList:visitList});  
        }

        if(nextProps.isPatientOut !== this.props.isPatientOut){ 
            let element = document.getElementsByClassName(this.state.outId);            
            element[0].classList.add("Ed-Out");
            this.setState({outId:''});
        }

        if(this.state.isLoading===true){
           this.setState({isLoading:false});
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
           return row.id+" Ed-Out";
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
        this.setState({row:row});
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

    handleSearch(data){  
        let search_date = moment(data).format('YYYY-MM-DD');
        
        this.setState({search_date:search_date});
        this.props.visitListAction(search_date);
        
    }

    search_date(props) {
        return (<FormGroup>
            <Row>
                <Col sm={5}>
                <Datetime
                        timeFormat={false}
                        inputProps={{placeholder:"DD-MM-YYYY"}}
                        dateFormat={"DD-MM-YYYY"}
                        maxDate={new Date()}
                        defaultValue={new Date()}
                        onChange={(event) => this.handleSearch(event)}
                    />
                </Col>
                <Col sm={7} className="no-padding">
                    {props.searchField}
                    {props.clearBtn}
                </Col>
            </Row>
        </FormGroup>);
    }
    
    render() {
        console.log(this.props.visitList);
       
          const options = {
            noDataText: this._setTableOption(),
            searchPanel: (props) => (this.search_date(props)),
            searchPosition: 'left'
          };
        return (
            <Row>
            <Col md={4} className="no-padding">
                <div className="visit-list">
                    <BootstrapTable data={ this.state.visitList }  search={ true } multiColumnSearch={ true } options={options} striped hover condensed  trClassName={this.getOutClass}>

                    <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': 'id' }} dataField='id' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'30px'}}  tdStyle={{width:'30px'}}   thAttr={{ 'data-attr': '#' }} dataField='sn'>#</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'75px'}}  tdStyle={{width:'75px'}}   tdAttr={{ 'data-attr': 'PATIENT ID' }} dataField='patientId' dataFormat={this.taskScreen.bind(this)}>PATIENT ID</TableHeaderColumn>

                    <TableHeaderColumn tdAttr={{ 'data-attr': 'NAME' }} dataField='' dataFormat={this.nameContent.bind(this)}>NAME</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'41px'}}  tdStyle={{width:'41px'}}   tdAttr={{ 'data-attr': 'APP' }} dataField='' dataFormat={this.isApp.bind(this)}>APP</TableHeaderColumn>

                    <TableHeaderColumn thStyle={{width:'41px'}}  tdStyle={{width:'41px'}}   tdAttr={{ 'data-attr': 'OUT' }} dataField='' dataFormat={this.outButton.bind(this)}>OUT</TableHeaderColumn>

                    </BootstrapTable>
                </div>
                </Col>
                <Col md={8} className="no-padding" id="task-content">
                    <EducatorTaskScreen row ={this.state.row}/>
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

    }

  }
  export default withRouter(connect(mapStateToProps, { visitListAction, patientOutAction } )(EducatorScreen));
