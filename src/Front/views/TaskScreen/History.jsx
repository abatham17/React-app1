import React, { Component } from 'react';
import {
    Modal, Table
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { historyAction } from 'Front/actions/home';
import moment from 'moment';
import VideoDocumentView from 'Front/views/TaskScreen/VideoDocumentView.jsx';

class History extends Component {
    
    constructor(props) { 
        super(props);
        this.state = {
            historyModal: false,
            dateList: [],
            documents: [],
            videos: [],
            tasks: [],
        };
    }

    componentDidMount() {  
        if(this.state.historyModal){
            this.props.historyAction(this.props.pvDetail.pId);
        }
    }

    componentWillReceiveProps(nextProps) {  
        if (nextProps.isHistory !== this.props.isHistory) { 
            let docList = nextProps.History.documents;
            let taskList = nextProps.History.tasks;
            let dietLists = nextProps.History.diet;
            let dateList = [];
            let videos = [];
            let documents = [];
            let tasks = [];
            let diets = [];
            let newDate = '';
            let oldDate = '';
            let j = 0;
            for (let x in docList) {
                newDate = moment(docList[x].createdAt).format('YYYY-MM-DD');
                if (newDate !== oldDate) { 
                    oldDate = newDate;
                    dateList[j] = newDate; 
                    j++;
                }

                if (docList[x].docType === 'document') {

                    documents.push(docList[x]);

                } else {

                    videos.push(docList[x]);
                }
            }
            oldDate = newDate = '';
            for (let y in taskList) {
                newDate = moment(taskList[y].createdAt).format('YYYY-MM-DD');
                if (newDate !== oldDate) {
                    oldDate = newDate;
                    
                    if(dateList.indexOf(newDate) < 0){  
                        
                        dateList[j] = newDate;
                        j++;
                    }
                }
                tasks.push(taskList[y]);
            }
            oldDate = newDate = '';
            for (let z in dietLists) { 
                newDate = moment(dietLists[z].createdAt).format('YYYY-MM-DD');
                
                    if (newDate !== oldDate) {
                        oldDate = newDate;  
                        diets[newDate] = [];                 
                        if(dateList.indexOf(newDate) < 0){  
                            
                            dateList[j] = newDate;
                            j++;
                        }
                    }
                    diets[newDate].push(dietLists[z]);
                
            }
            dateList.sort();
            dateList.reverse();
            this.setState({ dateList: dateList });
            this.setState({ documents: documents });
            this.setState({ videos: videos });
            this.setState({ tasks: tasks });
            this.setState({ dietList: diets });
        }
       
    }

    history(){
        this.setState({ historyModal: true });
        this.props.historyAction(this.props.pvDetail.pId);
    }

    dietDetail(lastDiets) { 
        
        if(lastDiets['1']){
            if(lastDiets['0'].addedByType !== lastDiets['1'].addedByType && lastDiets['0'].treatmentId === lastDiets['1'].treatmentId){
                return (<span className="green font-11">{lastDiets['0'].treatmentName}</span>);
            }if(lastDiets['0'].addedByType !== lastDiets['1'].addedByType && lastDiets['0'].treatmentId !== lastDiets['1'].treatmentId){

                if(lastDiets['0'].addedByType === 'doctor'){
                    return (<span className="font-11"><span>{lastDiets['0'].treatmentName}</span><br/><span className="blue">{lastDiets['1'].treatmentName}</span></span>);
                    
                }else{
                    return (<span className="font-11"><span>{lastDiets['1'].treatmentName}</span><br/><span className="blue">{lastDiets['0'].treatmentName}</span></span>);
                }
            }else{
                return (<span className="red font-11">{lastDiets['0'].treatmentName}</span>);
            }            
        }else{
            if(lastDiets['0'] && lastDiets['0'].addedByType === 'educator'){

                return (<span className="green font-11">{lastDiets['0'].treatmentName}</span>);
            }else if(lastDiets['0']){
                return (<span className="red font-11">{lastDiets['0'].treatmentName}</span>);
            }else{
                return '';
            }
        }

    }
    
    render() {
        
        return (
            <div>
                <Button className="btn-fill btn btn-primary pull-right" onClick={() => this.history()}>History
            </Button>
                <Modal className="history-modal" show={this.state.historyModal} onHide={() => this.setState({ historyModal: false })} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">History ({this.props.pvDetail.patientId + " - " + this.props.pvDetail.name})</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table className="table table-striped table-hover table-bordered">
                            <thead className="flip-content bordered-palegreen">
                                <tr><th>DOCUMENTS</th>
                                    <th>VIDEOS</th>
                                    <th>TASK</th>
                                    <th>dIET</th>
                                </tr>
                            </thead>

                            {
                                this.state.dateList.map((value,key)=>{ 
                                    return (<tbody key={value}>
                                            <tr>
                                                <th colSpan="4" className="text-center">{moment(value).format('DD-MM-YYYY')}</th>                                            
                                            </tr>
                                            <tr>
                                                <td className="text-left">
                                            {
                                                this.state.documents.map((document, docKey)=>{ 
                                                    let newDate = moment(document.createdAt).format('YYYY-MM-DD');
                                                    let status = (document.addedByType === "educator")?'pink':((document.status === "read")?'green':'red');
                                                    let data;
                                                    if(newDate === value){
                                                       data = (<div className={status} key={document._id}>
                                                        <VideoDocumentView
                                                            pvDetail = {this.props.pvDetail}
                                                            link = {document.image}
                                                            name = {document.documentName}
                                                            type = {'image'}
                                                            status = {0}
                                                        />
                                                         
                                                        </div>
                                                        )
                                                    }
                                                   return data;
                                                })
                                            }
                                                </td>
                                                <td className="text-left">
                                            {
                                                this.state.videos.map((video, vidKey)=>{  
                                                    let newDate = moment(video.createdAt).format('YYYY-MM-DD');
                                                    let data;
                                                    if(newDate === value){
                                                        let status = (video.addedByType === "educator")?'pink':((video.status === "read")?'green':'red');
                                                        data = (<div className={status} key={video._id}>
                                                        <VideoDocumentView
                                                            pvDetail = {this.props.pvDetail}
                                                            link = {video.image}
                                                            name = {video.documentName}
                                                            type = {'video'}
                                                            status = {0}
                                                        />
                                                         
                                                        </div>
                                                        )
                                                    }
                                                 return data;   
                                                })
                                            }
                                                </td>
                                                <td className="text-left">
                                                <ul>
                                            {
                                                this.state.tasks.map((task, taskKey)=>{ 
                                                    let newDate = moment(task.createdAt).format('YYYY-MM-DD');
                                                    let status = task.status === "complete"?'green':'red';
                                                    let data;
                                                    if(newDate === value){
                                                        data = (<li className={status} key={task._id}>
                                                            {task.taskName}  
                                                        </li>
                                                        )
                                                    }
                                                    return data;
                                                })
                                            }
                                            </ul>
                                                </td>
                                                <td className="text-left">
                                                {
                                                    this.state.dietList[value]?this.dietDetail(this.state.dietList[value]):''
                                                }
                                                </td>
                                            </tr>
                                        </tbody>)
                                })
                            }
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button simple onClick={() => this.setState({ historyModal: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

        History: state.home.History,
        isHistory: state.home.isHistory,
        isHistoryError: state.home.isHistoryError,
    }
}
export default withRouter(connect(mapStateToProps, { historyAction })(History));
