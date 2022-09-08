import React, { Component } from 'react';
import {
    Grid, Row, Col, Table,Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import { taskListAction, changeStatusAction, printShareDocumentAction } from 'Front/actions/home';
import VideoDocumentView from 'Front/views/TaskScreen/VideoDocumentView.jsx';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';
import KnowledgeShare from 'Front/views/TaskScreen/KnowledgeShare.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import History from 'Front/views/TaskScreen/History.jsx';
import Diet from 'Front/views/Diet/Diet';
import {getBMI} from 'Front/views/Home/PublicFunction.jsx';
import moment from 'moment';

class EducatorTaskScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            date: new Date(),
            visitInfo: this.props.row,
            lastDiet:false,
            visit_id: '',
            TaskList: [],
            alert:null,
            currentPatient:'',
            dietTitle:'',
            dietModal:false,
            formData: {
                visit_id: '',
                patient_id: '',
                documents: [],
                videos: [],
                type: 'share',
            }

        };

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {  
        let visitInfo = nextProps.row;

        if (nextProps.isTaskList !== this.props.isTaskList) {
            this.setState({ TaskList: nextProps.TaskList });
        }

        if (nextProps.isPrintShareDocument !== this.props.isPrintShareDocument) {             
            this.successAlert();
        }
        
        if (visitInfo.id  && nextProps.isPrintShareDocument === this.props.isPrintShareDocument) { 
            if(visitInfo.lastDiet){ 
                this.setState({ lastDiet: visitInfo.lastDiet });
            }
            if (this.state.visit_id !== visitInfo.id) {
                this.setState({ visit_id: visitInfo.id });
                this.setState({ visitInfo: visitInfo });

                let TaskList = [];
                TaskList['tasks'] = visitInfo.taskList;
                TaskList['documents'] = visitInfo.documentList;
                this.setState({ TaskList: TaskList });
                let Videos = [];
                let Documents = [];
                visitInfo.documentList && visitInfo.documentList.map((key, i) => {

                    if (key.docType === 'videos') {
                        return Videos.push({ id: key.documentId, name: key.documentName, link: key.image });
                    } else {
                        return Documents.push({ id: key.documentId, name: key.documentName, link: key.image });
                    }
                });

                let field = this.state.formData;
                field['videos'] = Videos;
                field['documents'] = Documents;
                this.setState({ formData: field });

            }
        }
    }

    ChangeStatus(id, type) {

        this.props.changeStatusAction(id, type);
        var element = document.getElementById(id);
        element.classList.add("green");
        if (type === 'task') {
            element = document.getElementById(id + 'task');
            element.disabled = true;
        }

    }
    addClass(key) {
        let status = (key.addedByType === 'educator')?'pink':((key.status === 'unread' || key.status === 'uncomplete')?'red':'green');
        
        return "pull-left "+status;
    }

    handleKnowledgeDocChange = (id, name, link) => {

        let field = this.state.formData;
        let exist = 0;
        for (let x in field.documents) {
            if (field.documents[x].id === id) {
                exist = 1;
                delete field.documents[x];
            }
        }
        if (exist === 0){
            field['documents'].push({ id: id, name: name, link: link });
        }
        field['documents'] = field.documents.filter(function (el) {
            return el != null;
          });
        this.setState({ formData: field });

    }

    handleKnowledgeVideoChange = (id, name, link) => {

        let field = this.state.formData;
        let exist = 0;
        for (let x in field.videos) {
            if (field.videos[x].id === id) {
                exist = 1;
                delete field.videos[x];
            }
        }
        if (exist === 0){
            field['videos'].push({ id: id, name: name, link: link });
        }
        field['videos'] = field.videos.filter(function (el) {
            return el != null;
          });
        this.setState({ formData: field });

    }

    successAlert() {
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
                    You have successfully Shared Knowledge!
                </SweetAlert>
            )
        });
    }


    hideAlert() {
        this.setState({
            alert: null
        });
        this.props.taskListAction(this.state.visitInfo);
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
        title += " | Age:"+patient.age;
        this.setState({dietTitle:title});
    }

    submitTask() {

        let field = this.state.formData;
        field['patient_id'] = this.state.visitInfo.pId;
        field['visit_id'] = this.state.visitInfo.id;
        this.props.printShareDocumentAction(field);
    }

    dietDetail(lastDiets){
        let date1 = lastDiets['0']?moment(lastDiets['0'].createdAt).format('YYYY-MM-DD'):'';
        let date2 = lastDiets['1']?moment(lastDiets['1'].createdAt).format('YYYY-MM-DD'):'';
        let today = moment().format('YYYY-MM-DD');
        let class_name = '';
        let deit = false;
        if(lastDiets['1'] && today === date1 && today === date2){

            if(lastDiets['0'].addedByType !== lastDiets['1'].addedByType && lastDiets['0'].treatmentId === lastDiets['1'].treatmentId){
                class_name = 'green';
                deit = true;
            }if(lastDiets['0'].addedByType !== lastDiets['1'].addedByType && lastDiets['0'].treatmentId !== lastDiets['1'].treatmentId){
                class_name = 'blue';
                deit = true;
            }else{
                class_name = 'red';
                deit = true;
            }
            
        }else if(lastDiets['0']  && today === date1){ 

            if(lastDiets['0'] && lastDiets['0'].addedByType === 'educator'){
                class_name = 'green';
                deit = true;
            }else{
                class_name = 'red';
                deit = true;
            }
        }else{
            return '';
        }

        if(class_name !== '' && deit === true){
            return (<span onClick={this.dietBox.bind(this, this.state.visitInfo)} className={class_name}>{lastDiets[0].treatmentName}</span>);
        }else{
            return '';
        }
        
    }

    render() {

        if (this.state.visitInfo.name) {
            let Message;
            if (this.state.visitInfo.remark) {
                Message = (<Row>
                    <Col md={12}><b>Message - </b>{this.state.visitInfo.remark}</Col>
                </Row>)
            }

            return (
                <div className="main-content educator-task-screen" style={{ padding: '0px' }}>
                    {this.state.alert}
                    <Grid fluid>

                        <Card
                            title={this.state.visitInfo.name + ' - ' + this.state.visitInfo.patientId}
                            content={
                                <div>
                                    <Row>
                                        <Col md={10} className="diet-title">{
                                            this.dietDetail(this.state.lastDiet)                                            
                                        }</Col>
                                        <Col md={2} >
                                            <History pvDetail={this.state.visitInfo} />
                                        </Col>
                                    </Row>
                                    {Message}

                                    <Row>
                                        <Col md={12} className="no-padding">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="2">

                                                            {
                                                                this.state.TaskList.tasks && this.state.TaskList.tasks.map((key, i) => {

                                                                    if (key.status !== 'uncomplete') {
                                                                        return (
                                                                            <Col sm={6} className={this.addClass(key)} key={key._id}>
                                                                                <Checkbox
                                                                                    disabled
                                                                                    checked={true}
                                                                                    number={key._id}
                                                                                    label={key.taskName}
                                                                                />
                                                                            </Col>)
                                                                    } else {
                                                                        return (
                                                                            <Col sm={6} className={this.addClass(key)} id={key._id} key={key._id}>
                                                                                <Checkbox
                                                                                    number={key._id + 'task'}
                                                                                    label={key.taskName}
                                                                                    onClick={e => { this.ChangeStatus(key._id, 'task') }}
                                                                                />
                                                                            </Col>)
                                                                    }

                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {
                                                                this.state.TaskList.documents && this.state.TaskList.documents.map((key, i) => {
                                                                    let date = moment(key.createdAt).format('YYYY-MM-DD');
                                                                    let today = moment().format('YYYY-MM-DD');
                                                                    let data;
                                                                    if (key.docType === 'videos' && today === date) {

                                                                        data = (<Row key={key._id}>
                                                                            <Col sm={12} className={this.addClass(key)} id={key._id}>                                                                              
                                                                                <VideoDocumentView
                                                                                    ChangeStatus={(id, type) => { this.ChangeStatus(id, 'document') }}
                                                                                    pvDetail={this.state.visitInfo}
                                                                                    name={key.documentName} 
                                                                                    id={key._id}
                                                                                    link={key.image}
                                                                                    type={'video'}
                                                                                    status={1}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                        )
                                                                    }
                                                                    return data;

                                                                })
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                this.state.TaskList.documents && this.state.TaskList.documents.map((key, i) => {
                                                                    let date = moment(key.createdAt).format('YYYY-MM-DD');
                                                                    let today = moment().format('YYYY-MM-DD');
                                                                    let data;
                                                                    if (key.docType === 'document' && today === date) {
                                                                        
                                                                        data = (<Row key={key._id}>
                                                                            <Col sm={12} className={this.addClass(key)} id={key._id}>
                                                                               <VideoDocumentView
                                                                                    ChangeStatus={(id, type) => { this.ChangeStatus(id, 'document') }}
                                                                                    pvDetail={this.state.visitInfo}
                                                                                    name={key.documentName}
                                                                                    id={key._id}
                                                                                    link={key.image}
                                                                                    type={'image'}
                                                                                    status={1}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                        )
                                                                    }
                                                                    return data;
                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="knowledge-share" sm={12}>

                                            <KnowledgeShare submitTask={(e) => { this.submitTask(e) }} handleKnowledgeDocChange={(id, title, link) => { this.handleKnowledgeDocChange(id, title, link) }} handleKnowledgeVideoChange={(id, title, link) => { this.handleKnowledgeVideoChange(id, title, link) }}
                                                pvDetail={this.state.visitInfo}
                                                documents={this.state.formData.documents}
                                                videos={this.state.formData.videos}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            }
                        />

                    </Grid>
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
                </div>
            );
        } else {
            return ('');
        }
    }
}

function mapStateToProps(state) {
    return {
        TaskList: state.home.TaskList,
        isTaskList: state.home.isTaskList,
        isTaskListError: state.home.isTaskListError,

        ChangeStatus: state.home.ChangeStatus,
        isChangeStatus: state.home.isChangeStatus,
        isChangeStatusError: state.home.isChangeStatusError,

        PrintShareDocument: state.home.printShareDocument,
        isPrintShareDocument: state.home.isPrintShareDocument,
        isPrintShareDocumentError: state.home.isPrintShareDocumentError,

    }
}
export default withRouter(connect(mapStateToProps, { taskListAction, changeStatusAction, printShareDocumentAction })(EducatorTaskScreen));