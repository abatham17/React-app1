import React, { Component } from 'react';
import {
    Col, OverlayTrigger, Tooltip, Row, FormGroup, Modal
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { visitListAction } from 'Front/actions/home';
import { patientOutAction } from 'Front/actions/home';
import * as PF from "Front/views/Home/PublicFunction.jsx"
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Loading from 'react-loading';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TaskScreen from 'Front/views/TaskScreen/TaskScreenPopup.jsx';
import NextVisit from 'Front/views/Home/NextVisitPopup.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import { appConstants } from 'Front/_constants/app.constants.js';


class DoctorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitList: this.props.visitList,
            search: this.props.search,
            search_date: this.props.search_date,
            outId: '',
            taskScreen:false,
            nextVisit:false,
            taskScreenData:[],
            nextVisitData:[],
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onDismissNextVisit = this.onDismissNextVisit.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

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

    componentWillReceiveProps(nextProps) {

        if(nextProps.isVisitList !== this.props.isVisitList) {
            this.filterVisitList(nextProps.VisitList.data.data);
        }

        if (nextProps.isPatientOut !== this.props.isPatientOut && this.state.outId !== '') {
            
            let element = document.getElementsByClassName(this.state.outId);
            element[0].classList.add("Dr-Out");
            this.setState({ outId: '' });
        }

        if (this.state.isLoading === true) {
            this.setState({ isLoading: false });
        }
    }

    filterVisitList(data){ 

        let j = 0;
        let visitList = data.map((key, i) => {
            let patient = key.patient_data[0];
            let h = patient.height;
            let w = patient.weight;
            let g = patient.gender
            return {
                id: key._id,
                sn: ++j,
                pId: patient._id,
                patientNo: patient.patientNo,
                patientId: patient.patientClinicId,
                name: patient.title + ' ' + patient.firstName + ' ' + patient.lastName,
                age: PF.getAgeByDob(patient.dob),
                city: patient.city,
                share: key.doc_count + ' / ' + key.read_docs_count,
                read_share: key.read_docs_count,
                task: key.task_count + ' / ' + key.complete_tasks_count,
                complete_task: key.complete_tasks_count,
                diet: 0,
                in_time: moment(key.createdAt).format('hh:mm A'),
                next_visit_date: patient.nextDate,
                app: 0,
                status: key.status,
                height: h,
                weight: w,
                bmi: PF.getBMI(h, w),
                ibw: PF.getIBW(h, w, g),
                c1: PF.getMaintainWeight(h, w, g),
                c2: PF.getLooseWeight(h, w, g),
                c3: PF.getGainWeight(h, w, g),
                segCalorie: PF.getCalorie(h, w, g),
                calorieType: PF.getCalorieType(h, w, g),
                created_date: moment(key.createdAt).format('YYYY-MM-DD'),
                remark: key.remark,
                taskList: key.Tasks,
                documentList: key.Documents,
                doctorOut: key.doctorOut,
                lastDiet:patient.lastDiet,

            }
        });

        this.setState({visitList:visitList});
    }

    isApp(cell, row) {
        if (row.app === 0) {
            return '';
        } else {
            return <i className="fa fa-check" aria-hidden="true"></i>;
        }
    }

    outButton(cell, row) {

        return (<OverlayTrigger placement="top" overlay={<Tooltip id="remove">Remove</Tooltip>}>
            <Button simple bsStyle="danger" bsSize="xs" onClick={this.patientVisitOut.bind(this, row.id)}>
                <i className="fa fa-times"></i>
            </Button>
        </OverlayTrigger>);

    }

    patientVisitOut(id) {
        this.setState({ outId: id });
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

    _setTableOption() {
        if (this.state.isLoading) {
            return (
                <Loading type='bars' color='#000000' style={{ margin: '0px auto', width: "40px" }} />
            );
        } else {
            return "No data found!";
        }
    }

    getOutClass(row, rowIdx) {
        if (row.doctorOut === 'out') {
            return row.id + " Dr-Out";
        } else {
            return row.id;
        }
    }

    nextButton(cell, row, enumObject, rowIndex) {

        return (<OverlayTrigger placement="top" overlay={<Tooltip id="NextVisit">Next Visit</Tooltip>}>

<span onClick={() => this.setState({ nextVisit: true , nextVisitData:row  })}><i className="fa fa-calendar"></i> {row.next_visit_date !== null && row.next_visit_date ? moment(row.next_visit_date).format('DD-MM-YYYY') : ''}</span>
        </OverlayTrigger>);

    }

    dietDetail(cell, row, enumObject, rowIndex) { 
        let lastDiets = row.lastDiet;
        if(lastDiets && lastDiets['1']){
            let date1 = moment(lastDiets['0'].createdAt).format('YYYY-MM-DD');
            let date2 = moment(lastDiets['1'].createdAt).format('YYYY-MM-DD');
            let today = moment().format('YYYY-MM-DD');
            if(today === date1 && today === date2){
                if(lastDiets['0'].addedByType !== lastDiets['1'].addedByType && lastDiets['0'].treatmentId === lastDiets['1'].treatmentId){
                    return (<span className="green font-11">{lastDiets['0'].treatmentName}</span>);
                }else if(lastDiets['0'].addedByType !== lastDiets['1'].addedByType && lastDiets['0'].treatmentId !== lastDiets['1'].treatmentId){

                    if(lastDiets['0'].addedByType === 'doctor'){
                        return (<span className="font-11"><span>{lastDiets['0'].treatmentName}</span><br/><span className="blue">{lastDiets['1'].treatmentName}</span></span>);
                        
                    }else{
                        return (<span className="font-11"><span>{lastDiets['1'].treatmentName}</span><br/><span className="blue">{lastDiets['0'].treatmentName}</span></span>);
                    }
                }else{
                    return (<span className="red font-11">{lastDiets['0'].treatmentName}</span>);
                }  
            }else if(today === date1 && today !== date2){
                if(lastDiets['0'] && lastDiets['0'].addedByType === 'educator'){

                    return (<span className="green font-11">{lastDiets['0'].treatmentName}</span>);
                }else {
                    return (<span className="red font-11">{lastDiets['0'].treatmentName}</span>);
                }
            }else{
                return '';
            }          
        }else if(lastDiets && lastDiets['0']){
            let date1 = moment(lastDiets['0'].createdAt).format('YYYY-MM-DD');           
            let today = moment().format('YYYY-MM-DD');
            if(lastDiets['0'] && lastDiets['0'].addedByType === 'educator' && today === date1){

                return (<span className="green font-11">{lastDiets['0'].treatmentName}</span>);
            }else if(today === date1){
                return (<span className="red font-11">{lastDiets['0'].treatmentName}</span>);
            }else{
                return '';
            }
        }else{
            return '';
        }

    }

    taskScreen(cell, row, enumObject, rowIndex) { 
      
        return (<span onClick={() => this.setState({ taskScreen: true , taskScreenData:row  })}>{row.patientId}</span>)

    }
    nameContent(cell, row, enumObject, rowIndex){
        if(row.documentList['0']){ 
            
            return (<span onClick={() => this.setState({ taskScreen: true , taskScreenData:row  })}>{row.name}<OverlayTrigger placement="bottom" overlay={<Tooltip id="Name"><b>SHARE:<br/>{
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
                <Col sm={4}>
                <Datetime
                        timeFormat={false}
                        inputProps={{placeholder:"DD-MM-YYYY"}}
                        dateFormat={"DD-MM-YYYY"}
                        maxDate={new Date()}
                        defaultValue={new Date()}
                        onChange={(event) => this.handleSearch(event)}
                    />
                </Col>
                <Col sm={8}>
                    {props.searchField}
                    {props.clearBtn}
                </Col>
            </Row>
        </FormGroup>);
    }

      onDismiss() {
        this.setState({ taskScreen: false });
        this.successAlert('Task Successfully Submitted');
      }

      onDismissNextVisit() {
        this.setState({ nextVisit: false });
        this.successAlert('Next Visit Successfully Submitted');
      }    

    successAlert(msg) {  
        
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

    render() {
       
        const options = {
            noDataText: this._setTableOption(),
            searchPanel: (props) => (this.search_date(props)),
            searchPosition: 'left'
        };
        return (
            <Row>
            {this.state.alert}
                <Col md={12}>
                    <div className="visit-list">
                        <BootstrapTable data={this.state.visitList} search={true} multiColumnSearch={true} options={options} striped hover condensed trClassName={this.getOutClass}>

                            <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': 'id' }} dataField='id' dataSort={true} isKey searchable={false}>Id</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '3%' }} tdStyle={{ width: '3%' }} thAttr={{ 'data-attr': '#' }} dataField='sn'>#</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '9%' }} tdStyle={{ width: '9%' }} tdAttr={{ 'data-attr': 'PATIENT ID' }} dataField='patientId' dataSort={true} dataFormat={this.taskScreen.bind(this)}>PATIENT ID</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'NAME' }} dataField='' dataFormat={this.nameContent.bind(this)} dataSort={true}>NAME</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'AGE' }} dataField='age'>AGE</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' }} tdAttr={{ 'data-attr': 'CITY' }} dataField='city'>CITY</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'SHARE' }} dataField='share'>SHARE</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'TASK' }} dataField='task'>TASK</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '18%' }} tdStyle={{ width: '18%' }} tdAttr={{ 'data-attr': 'DIET' }} dataField='' dataFormat={this.dietDetail.bind(this)}>DIET</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '7%' }} tdStyle={{ width: '7%' }} tdAttr={{ 'data-attr': 'IN TIME' }} dataField='in_time'>IN TIME</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '9%' }} tdStyle={{ width: '9%' }} tdAttr={{ 'data-attr': 'NEXT V' }} dataField='' dataFormat={this.nextButton.bind(this)}>NEXT V</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'APP' }} dataField='' dataFormat={this.isApp.bind(this)}>APP</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'OUT' }} dataField='' dataFormat={this.outButton.bind(this)}>OUT</TableHeaderColumn>

                        </BootstrapTable>
                    </div>
                </Col>
                 <Modal className="pa-task-screen"  show={this.state.taskScreen} onHide={() => this.setState({ taskScreen: false  })} dialogClassName="modal-lg">
                    <button type="button" className="close" onClick={() => this.setState({ taskScreen: false  })} ><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                     <Modal.Body className="Knowledge-Share ">
                        <Row>
                            <Col md={12}>
                                       <TaskScreen  taskScreenData={this.state.taskScreenData} onDismiss={this.onDismiss} />         
                            </Col>
                        </Row>
                     </Modal.Body>
                   
                </Modal>
                <Modal className="pa-next-visit"  show={this.state.nextVisit} onHide={() => this.setState({ nextVisit: false  })} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Set Next Visit</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="Knowledge-Share ">
                        <Row>
                            <Col md={12}>
                                       <NextVisit  nextVisitData={this.state.nextVisitData} onDismissNextVisit={this.onDismissNextVisit} />         
                            </Col>
                        </Row>
                     </Modal.Body>
                   
                </Modal>
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
export default withRouter(connect(mapStateToProps, { visitListAction, patientOutAction })(DoctorScreen));
