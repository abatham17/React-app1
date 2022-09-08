import React, { Component } from 'react';
import {
    Grid, Row, Col,Panel, Nav, NavItem, Tab
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PatientHeader from 'Front/components/Home/PatientHeader.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { educatorMsgListAction } from 'Front/actions/home';
import Card from 'Front/components/Card/Card.jsx';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';
import Radio from 'Front/elements/CustomRadio/CustomRadio.jsx';
import CalorieInfo from 'Front/views/TaskScreen/CalorieInfo.jsx';
import KnowledgeShare from 'Front/views/TaskScreen/KnowledgeShare.jsx';
import { treatmentWithTypesAction, addTaskAction } from 'Front/actions/master';
import SweetAlert from 'react-bootstrap-sweetalert';
import { taskListAction } from 'Front/actions/home';
import {
    calorieList
} from 'Front/variables/Variables.jsx';
import History from 'Front/views/TaskScreen/History.jsx';

class TaskScreen extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            formArr: [],
            date: date,
            next_visit_dateError: null,
            visitInfo: this.props.location.state.row,
            educator_msg_list: [],
            treatmentId: '1',
            formData: {
                visitId: this.props.location.state.row.id,
                patientId: this.props.location.state.row.pId,
                remark: '',
                treatmentId: '',
                calorie: '',
                tasks: [],
                documents: [],
                videos: [],
                type: 'share',
            },
            showProcessing: false,
            diabeticDiet: [],
            nonDiabeticDiet: [],
            alert: null,
            show: false
        };
        this.hideAlert = this.hideAlert.bind(this);
    }


    componentDidMount() {
        if (this.props.EducatorMsgList) {
            this.setState({ educator_msg_list: this.props.EducatorMsgList.messageList });
        }else{
            this.props.educatorMsgListAction(this.state);
        }

        if (this.props.treatmentWithTypeList) {

            let diet = this.props.treatmentWithTypeList.data;
            let i;
            let diabeticDiet = [];
            let nonDiabeticDiet = [];
            if (diet && diet.length) {

                for (i in diet) {
                    if (diet[i].type === 'Diabetic') {
                        diabeticDiet.push(diet[i]);
                    } else {
                        nonDiabeticDiet.push(diet[i]);
                    }
                }
            }
            this.setState({ diabeticDiet: diabeticDiet, nonDiabeticDiet: nonDiabeticDiet });

        }else{
            this.props.treatmentWithTypesAction(this.state);
        }
        
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isEducatorMsgList !== this.props.isEducatorMsgList) {
            this.setState({ educator_msg_list: nextProps.EducatorMsgList.messageList });
        }

        if (nextProps.treatmentWithTypeList !== this.props.treatmentWithTypeList) {

            let diet = nextProps.treatmentWithTypeList.data;
            let i;
            let diabeticDiet = [];
            let nonDiabeticDiet = [];
            if (diet && diet.length) {

                for (i in diet) {
                    if (diet[i].type === 'Diabetic') {
                        diabeticDiet.push(diet[i]);
                    } else {
                        nonDiabeticDiet.push(diet[i]);
                    }
                }
            }
            this.setState({ diabeticDiet: diabeticDiet, nonDiabeticDiet: nonDiabeticDiet });

        }

        if (nextProps.isAddTask !== this.props.isAddTask) {
            this.successAlert();
        }

        if (nextProps.location.state.row.documentList && nextProps.isAddTask === this.props.isAddTask) {
            let docList = nextProps.location.state.row.documentList;
            let videos = [];
            let documents = [];
            for (let i in docList) {
                if (docList[i].docType === 'document') {
                    documents.push({ id: docList[i].documentId, name: docList[i].documentName, link: docList[i].image });
                } else {
                    videos.push({ id: docList[i].documentId, name: docList[i].documentName, link: docList[i].image });
                }
            }
            let field = this.state.formData;
            field['documents'] = documents;
            field['videos'] = videos;
            this.setState({ formData: field });
        }
        if (nextProps.location.state.row.taskList && nextProps.isAddTask === this.props.isAddTask) {

            let tasks = [];
            let taskList = nextProps.location.state.row.taskList;
            for (let i in taskList) {

                tasks.push({ id: taskList[i].taskId, name: taskList[i].taskName });
            }
            let field = this.state.formData;
            field['tasks'] = tasks;
            this.setState({ formData: field });
        }
    }


    handleChange = e => {
        e.preventDefault();
        let field = this.state.formData;
        field[e.target.name] = e.target.value;
        this.setState({
            formData: field
        });
    };


    handleTasksChange(id, name) {

        let field = this.state.formData;
        let exist = 0;
        for (let x in field.tasks) {
            if (field.tasks[x].id === id) {
                exist = 1;
                delete field.tasks[x];
            }
        }
        if (exist === 0){
            field['tasks'].push({ id: id, name: name });
        }
        field['tasks'] = field.tasks.filter(function (el) {
            return el != null;
          });

        this.setState({ formData: field });
    };

    handleDietChange(id) {
        let field = this.state.formData;
        field['treatmentId'] = id;
        this.setState({ formData: field });
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

    submitTask() {
        if(this.state.formData.treatmentId !== '' || this.state.formData.documents[0] || this.state.formData.videos[0] || this.state.formData.tasks[0]){
            this.props.addTaskAction(this.state.formData);
        }

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
                    You have successfully submitted task!
                </SweetAlert>
            )
        });
    }


    hideAlert() {
        this.setState({
            alert: null
        });
        this.props.history.push('/dashboard');
    }

    getCalorieList() {
        let calorie = this.state.visitInfo.segCalorie;
        let c = 0;
        let options = calorieList.map(function (item, i) {

            let selected = '';
            if (((calorie && calorie >= item.value && calorie < ((item.value) + 100)) || (calorie && calorie <= item.value && calorie > ((item.value) - 100)))) {
                selected = 'selected="selected"';
                c = item.value;

            }
            return <option key={item.value} value={item.value} selected={selected}>{item.label}</option>
        })
        let field = this.state.formData;
        field['calorie'] = c;
        this.setState({formData:field});
        return options;
    }

    checkTask(id) {
        let tasks = this.state.formData.tasks;
        if (tasks.length > 0) {
            for (let x in tasks) {
                if (tasks[x].id === id) {
                    return true
                }
            }
        }

        return false;

    }

    render() { 

        return (
            <div className="main-content task-screen" style={{ padding: '15px 15px' }}>
                {this.state.alert}
                <Grid fluid>

                    <Card
                        title={
                            <div className="row">
                            <div className="col-sm-8 text-right">
                                <PatientHeader pvDetail={this.state.visitInfo} />
                            </div>
                            <div className="col-sm-4 text-right">
                                <div className="col-sm-6 text-right">
                                    <Button onClick={e => { this.submitTask(e); }} simple className="btn-fill btn btn-warning">Submit</Button>
                                </div>
                                <div className="col-sm-6 text-left">
                                    <History pvDetail={this.state.visitInfo} />
                                </div>
                            </div>
                            </div>
                        }
                        content={

                            <div>
                                <Row>
                                    <Col sm={6}>
                                        <legend><i className="fa fa-envelope"></i>&nbsp;&nbsp;Message</legend>
                                        <textarea className="form-control" rows="5" name="remark" id="remark" placeholder="Type your own message here..." onChange={e => { this.handleChange(e); }}>{this.state.visitInfo.remark}</textarea>
                                        <br /><legend></legend>
                                        <Row>

                                            {
                                                this.state.educator_msg_list.map((key, i) => {

                                                    return (<Col sm={6}><Checkbox
                                                        number={key._id}
                                                        checked={this.checkTask(key._id)}
                                                        label={key.message}
                                                        onClick={e => { this.handleTasksChange(key._id, key.message); }}
                                                    /></Col>)
                                                })
                                            }


                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <legend><i className="fa fa-apple"></i>&nbsp;Diet</legend>
                                        <Row>
                                            <Col sm={6}>

                                                <select className="form-control" name="calorie" value={this.state.value} onChange={e => { this.handleChange(e); }}>
                                                    <option value=""> Select Calorie </option>
                                                    {
                                                        this.getCalorieList()
                                                    }
                                                </select>
                                            </Col>
                                            <Col sm={3}>
                                                <CalorieInfo pvDetail={this.state.visitInfo} />
                                            </Col>
                                            <Col sm={3}>

                                                <div className="weight-case">
                                                    {this.state.visitInfo.calorieType.calorie}<br></br>
                                                    {this.state.visitInfo.calorieType.type}
                                                </div>
                                            </Col>
                                        </Row>
                                        <br /><br />
                                        <Row>
                                            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="info">
                                                <Panel header={
                                                    <Row>
                                                        <Col sm={9}>
                                                            <Nav bsStyle="tabs">
                                                                <NavItem eventKey="info">
                                                                    Diabetic Diet
                                                        </NavItem>
                                                                <NavItem eventKey="account">
                                                                    Non Diabetic Diet
                                                        </NavItem>
                                                            </Nav>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <Button simple className="btn-fill btn btn-warning pull-right">Cancel Diet</Button>
                                                        </Col>
                                                    </Row>
                                                }
                                                    eventKey="3">
                                                    <Tab.Content animation className="task-diet">
                                                        <Tab.Pane eventKey="info">
                                                            {this.state.diabeticDiet && this.state.diabeticDiet.map(treatment =>
                                                                <Col sm={6} className="padding-5">
                                                                    <legend>{treatment.name}</legend>

                                                                    {treatment.treatments && treatment.treatments.map(diet =>
                                                                        <Radio
                                                                            number={diet._id}
                                                                            option={diet._id}
                                                                            name="treatmentId"
                                                                            onClick={e => { this.handleDietChange(diet._id); }}

                                                                            label={diet.name}
                                                                        />
                                                                    )}

                                                                </Col>
                                                            )}

                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="account">
                                                            {this.state.nonDiabeticDiet && this.state.nonDiabeticDiet.map(treatment =>
                                                                <Col sm={6} className="padding-5">
                                                                    <legend>{treatment.name}</legend>
                                                                    {treatment.treatments && treatment.treatments.map(diet =>
                                                                        <Radio
                                                                            number={diet._id}
                                                                            option={diet._id}
                                                                            name="treatmentId"
                                                                            onClick={e => { this.handleDietChange(diet._id); }}

                                                                            label={diet.name}
                                                                        />
                                                                    )}
                                                                </Col>
                                                            )}
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Panel>

                                            </Tab.Container>
                                        </Row>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

        EducatorMsgList: state.home.EducatorMsgList,
        isEducatorMsgList: state.home.isEducatorMsgList,
        isEducatorMsgListError: state.home.isEducatorMsgListError,

        treatmentWithTypeList: state.master.treatmentWithTypeList,

        isAddTask: state.master.isAddTask,
        isAddTaskError: state.master.isAddTaskError,
        AddTask: state.master.AddTask,

        TaskList: state.home.TaskList,
        isTaskList: state.home.isTaskList,
        isTaskListError: state.home.isTaskListError,
    }
}
export default withRouter(connect(mapStateToProps, { addTaskAction, treatmentWithTypesAction, educatorMsgListAction, taskListAction })(TaskScreen));