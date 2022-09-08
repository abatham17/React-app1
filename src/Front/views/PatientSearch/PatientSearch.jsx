import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net

import {
    Grid, Row, Col, Modal, FormControl, FormGroup, ControlLabel
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { patientListAction } from 'Front/actions/patient';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import moment from 'moment';
import DropDownSearch from 'Front/views/PatientSearch/DropDownSearch.jsx';
import KnowledgeShare from 'Front/views/PatientSearch/KnowledgeShare.jsx';
import { printShareDocumentAction } from 'Front/actions/home';
import Chat from '../../components/Header/Chat';
import Diet from 'Front/views/Diet/Diet';
import Radio from 'Front/elements/CustomRadio/CustomRadio.jsx';
import {getBMI,getAgeByDob} from 'Front/views/Home/PublicFunction.jsx';
import { appConstants } from 'Front/_constants/app.constants.js';
class PatientSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientList: [],
            isLoading: true,
            chatModal: false,
            chatPatientId:'',
            chatPatientDetails:'',
            patientInfo: [],
            knowledgeModal: false,
            notificationModal:false,
            formData: {
                patient_id: "",
                city: "",
                first_name: "",
                last_name: "",
                direction: "desc",
                order: "createdAt",
                offset: 0,
                limit:10,
                message_hindi:'',
                message_english:'',
                selected_type:'selected',
            },

            totalCount:0,
            currentPage:1,
            sizePerPage:10,
            fetchRequest: false,
            dietModal:false,
            currentPatient:null,
            dietTitle:""
        }

        this.chatBox = this.chatBox.bind(this);
        this.dietBox = this.dietBox.bind(this);
        this.knowledgeShare = this.knowledgeShare.bind(this);
        this.onPageChange = this.onPageChange.bind(this);        
        this.hideChatModel = this.hideChatModel.bind(this);
        
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

    componentDidMount(){
        let data = {}
        data['patient_id'] = this.state.formData.patient_id;
        data['city'] = this.state.formData.city;
        data['first_name'] = this.state.formData.first_name;
        data['last_name'] = this.state.formData.last_name;
        data['direction'] = this.state.formData.direction;
        data['order'] = this.state.formData.order;
        data['offset'] = this.state.formData.offset;
        data['limit'] = this.state.formData.limit;
        this.props.patientListAction(data);

    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.isPatientList !== this.props.isPatientList){
        this.setState({fetchRequest: true});
      }

        if (nextProps.isPatientList !== this.props.isPatientList) {

            let j = this.state.currentPage*10-10;
            let patientList = nextProps.patientList.data.data.map((key, i) => {
                let row = {
                    id: key._id,
                    pId: key._id,
                    sn: ++j,
                    patientId: key.patientClinicId,
                    name: key.title + ' ' + key.firstName + ' ' + key.lastName,
                    dob: key.dob,
                    city: key.city,
                    share_video: key.share_video_count + ' / ' + key.view_video_count,
                    share_document: key.print_count + ' / ' + key.share_count + ' / ' + key.view_count,
                    task: 0,
                    diet: 0,
                    created_date: moment(key.createdAt).format('DD-MM-YYYY'),
                    next_visit: (key.nextDate && key.nextDate !== null && key.nextDate !== '' ? moment(key.nextDate).format('DD-MM-YYYY') : null),
                    app: 0,
                    status: key.status,
                    documentList:key.Documents,
                    dietCount: key.dietPrintCount + ' / ' + key.dietShareCount + ' / ' + key.dietEmailCount,
                };

                return { ...key, ...row };

            });
            this.setState({patientList:patientList});

             this.setState({totalCount: nextProps.patientList.data.count, fetchRequest: true});
        }
        if (this.state.isLoading === true) {
            this.setState({ isLoading: false });
        }
    }

    onPageChange(page, sizePerPage) {

    let data = {};
   
    if(this.state.searchText===""){      
                
        data['patient_id'] = this.state.formData.patient_id;
        data['city'] = this.state.formData.city;
        data['first_name'] = this.state.formData.first_name;
        data['last_name'] = this.state.formData.last_name;
        data['direction'] = this.state.formData.direction;
        data['order'] = this.state.formData.order;
        data['offset'] = (page===-1)?this.state.formData.offset:page-1;
        data['limit'] = sizePerPage;

    }else{      

        data['patient_id'] = this.state.formData.patient_id;
        data['city'] = this.state.formData.city;
        data['first_name'] = this.state.formData.first_name;
        data['last_name'] = this.state.formData.last_name;
        data['direction'] = this.state.formData.direction;
        data['order'] = this.state.formData.order;
        data['offset'] = (page===-1)?this.state.formData.offset:page-1;
        data['limit'] = sizePerPage;
     
    }


    this.setState({sizePerPage:sizePerPage})
    this.setState({currentPage:page})
    this.props.patientListAction(data);
  }


   onSearchChange(text) { 
    if(text !==""){ 
      if(text.length >= 1){ 
      let data = {}
        data['patient_id'] = this.state.formData.patient_id;
        data['city'] = this.state.formData.city;
        data['first_name'] = this.state.formData.first_name;
        data['last_name'] = this.state.formData.last_name;
        data['direction'] = this.state.formData.direction;
        data['order'] = this.state.formData.order;
        data['offset'] = this.state.formData.offset;
        data['limit'] = this.state.formData.limit;
      this.setState({sizePerPage:10})     
      this.props.patientListAction(data);
      }
    }else{
      this.componentDidMount();
      this.setState({searchText:text})
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


    chatBox(patientId,chatPatientDetails,e){
        localStorage.setItem('chatModel',true)
        this.setState({chatModal:true,chatPatientId:patientId,chatPatientDetails:chatPatientDetails});

    }

    dietBox(patient){
        this.setState({dietModal:true,currentPatient:patient});
        this.setDietTitle(patient);
    }

    setDietTitle(patient){
        let title = "Patient Diet ("+patient.name+" - "+patient.patientNo+")";
        title += " | H:"+patient.height;
        title += " | W:"+patient.weight;
        title += " | BMI:"+getBMI(patient.height,patient.weight);
        title += " | Age:"+getAgeByDob(patient.dob);
        this.setState({dietTitle:title});
    }

    knowledgeShare(patient) {
        this.setState({ patientInfo: patient });
        this.setState({ knowledgeModal: true });

    }

    actionButton(cell, row, enumObject, rowIndex) {
        return (<DropDownSearch
            patient={row}
            chatBox={this.chatBox}
            chatPatientId={row._id}
            chatPatientDetails={row}            
            knowledgeShare={(patient) => { this.knowledgeShare(patient) }}
            dietBox={this.dietBox}
        />
        )
    } 
    
    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;  

        this.setState({formData:field});

        this.onSearchChange(e.target.value);
    }

    handleChangeNotification = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;  

        this.setState({formData:field});

    }

    handleNotificationType = value => {  
                
        let field = this.state.formData;
        
        field['selected_type']  = value;  

        this.setState({formData:field});

    }



    hideChatModel(){
      
       this.setState({ chatModal: false });

       localStorage.setItem('chatModel',false);

       let addUser = {
                         userId:localStorage.getItem('_id')                       
                      } 
        appConstants.socket.emit('screenClose', addUser);
        

    }

    render() {
       
  
        const options = {
            clearSearch: true,                     
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
            sizePerPage: this.state.sizePerPage,
            onPageChange: this.onPageChange,
            page: this.state.currentPage,
            noDataText:this._setTableOption(),
        };
        return (
            <div className="main-content patient-search" style={{ padding: '15px 0px' }}>
                
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                    <Row className="search-section">
                                        <Col md={2}>
                                            <FormControl type="text" name="patient_id" id="patient_id" defaultValue={this.state.formData.patient_id} onChange={e => { this.handleChange(e); }} placeholder="Patient Id"/>

                                        </Col>
                                        <Col md={2} className="padding-5">
                                            <FormControl type="text" name="first_name" id="first_name" defaultValue={this.state.formData.first_name} onChange={e => { this.handleChange(e); }} placeholder="First Name"/>

                                        </Col>
                                        <Col md={2} className="padding-5">
                                            <FormControl type="text" name="last_name" id="last_name" defaultValue={this.state.formData.last_name} onChange={e => { this.handleChange(e); }} placeholder="Last Name"/>

                                        </Col>
                                        <Col md={2} className="padding-5">
                                            <FormControl type="text" name="city" id="city" defaultValue={this.state.formData.city} onChange={e => { this.handleChange(e); }} placeholder="City"/>

                                        </Col>
                                        <Button className="btn-fill btn btn-warning" onClick={() => this.setState({ notificationModal: true  })}>Send Notification</Button>
                                        </Row>
                                        <BootstrapTable remote={true}  fetchInfo={ { dataTotalSize: this.state.totalCount } } data={this.state.patientList} pagination={true} options={options} striped hover condensed scrollTop={'Bottom'}>
                                            <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': '_id' }} dataField='_id' isKey searchable={false}>Id</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '3%' }} tdStyle={{ width: '3%' }} tdAttr={{ 'data-attr': '#' }} dataField='sn'>#</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8%' }} tdStyle={{ width: '8%' }} tdAttr={{ 'data-attr': 'DATE' }} dataField='created_date'>DATE</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '7%' }} tdStyle={{ width: '7%' }} tdAttr={{ 'data-attr': 'ID' }} dataField='patientId' dataSort={true}>ID</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '15%' }} tdStyle={{ width: '15%' }} tdAttr={{ 'data-attr': 'NAME' }} dataField='name' dataSort={true}>NAME</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'APP' }} dataField='' dataFormat={this.isApp.bind(this)}>APP</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' }} tdAttr={{ 'data-attr': ' DOCUMENTS (P/S/V)' }} dataField='share_document'> DOCUMENTS (P/S/V)</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8%' }} tdStyle={{ width: '8%' }} tdAttr={{ 'data-attr': 'VIDEO (S/V)' }} dataField='share_video'>VIDEO (S/V)</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'TASK' }} dataField='task_count'>TASK</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8%' }} tdStyle={{ width: '8%' }} tdAttr={{ 'data-attr': 'DIET CHART (P/S/E)' }} dataField='dietCount'>DIET CHART (P/S/E)</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8%' }} tdStyle={{ width: '8%' }} tdAttr={{ 'data-attr': 'CITY' }} dataField='city'>CITY</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'AGE' }} dataField='' dataFormat={this.get_age_by_dob.bind(this)}>AGE</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8%' }} tdStyle={{ width: '8%' }} tdAttr={{ 'data-attr': 'NEXT VISIT' }} dataField='next_visit'>NEXT VISIT</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' }} tdAttr={{ 'data-attr': 'Action' }} dataFormat={this.actionButton.bind(this)}>Action</TableHeaderColumn>

                                        </BootstrapTable>

                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>

                <Modal className="pa-chat-md" show={this.state.chatModal} onHide={this.hideChatModel.bind(this)}  dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Chat</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="Knowledge-Share">

                        <Row>
                            <Col md={12}>
                                       <Chat chatPatientId={this.state.chatPatientId} chatPatientDetails={this.state.chatPatientDetails}  />         

                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal>

                <Modal show={this.state.notificationModal} onHide={() => this.setState({ notificationModal: false  })} >
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Send Notification to Patient</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="send-notification form-horizontal">

                        <Row>
                            <Col md={12}>
                                  <br/>  
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Message English <span className="star">*</span>
                                </Col>
                                <Col sm={8}>

                                    <FormControl rows="3" componentClass="textarea" name="message_english" bsClass="form-control" defaultValue={this.state.formData.message_english} onChange={e => { this.handleChangeNotification(e); }} />
                                    
                                </Col>
                                
                                </FormGroup>

                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Message Hindi <span className="star">*</span>
                                </Col>
                                <Col sm={8}>

                                    <FormControl rows="3" componentClass="textarea" name="message_hindi" bsClass="form-control" defaultValue={this.state.formData.message_hindi} onChange={e => { this.handleChangeNotification(e); }} />
                                    
                                </Col>
                                
                                </FormGroup>
                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Select Type <span className="star">*</span>
                                </Col>
                                <Col sm={4}>
                                <Radio
                                        number={'all'}
                                        key={'all'}
                                        option={'all'}
                                        name={"selected_type"}
                                        checked={(this.state.formData.selected_type==='all')?true:false}
                                        onClick={e => { this.handleNotificationType('all'); }}
                                        label={'All Patient'}
                                    />
                                    </Col>
                                    <Col sm={4}>
                                <Radio
                                        number={'selected'}
                                        key={'selected'}
                                        option={'selected'}
                                        name={"selected_type"}
                                        checked={(this.state.formData.selected_type==='selected')?true:false}
                                        onClick={e => { this.handleNotificationType('selected'); }}
                                        label={'Selected Patient'}
                                    />
                                </Col>
                                </FormGroup>

                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    
                                </Col>
                                <Col sm={8}>
                                    <Button className="btn-fill btn btn-warning pull-right" onClick={() => this.setState({ notificationModal: false  })}>Send</Button>
                                </Col>
                                </FormGroup>                                
                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal>

                {/* Diet model */}
                <Modal className="pa-diet-screen" show={this.state.dietModal} onHide={() => this.setState({ dietModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">{this.state.dietTitle}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>

                        <Row>
                            <Col md={12}>
                                <Diet patient={this.state.currentPatient}/>
                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal>
                {/* /Diet model */}

                <KnowledgeShare handleKnowledgeDocChange={(id, title, link) => { this.handleKnowledgeDocChange(id, title, link) }} handleKnowledgeVideoChange={(id, title, link) => { this.handleKnowledgeVideoChange(id, title, link) }}
                    patientInfo={this.state.patientInfo}
                    knowledgeModal={this.state.knowledgeModal}
                    documents={this.state.formData.documents}
                    videos={this.state.formData.videos}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {

        patientList: state.patient.patientList,
        isPatientList: state.patient.isPatientList,
        isPatientListError: state.patient.isPatientListError,

        PrintShareDocument: state.home.printShareDocument,
        isPrintShareDocument: state.home.isPrintShareDocument,
        isPrintShareDocumentError: state.home.isPrintShareDocumentError,

    }
}
export default withRouter(connect(mapStateToProps, { patientListAction, printShareDocumentAction })(PatientSearch));
