import React, { Component } from 'react';
import {
    Row, Col, Modal, Table
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import VideoDocumentView from 'Front/views/TaskScreen/VideoDocumentView.jsx';
import { categoryListAction } from 'Front/actions/home';
import { knowledgeListAction } from 'Front/actions/home';
import { printShareDocumentAction } from 'Front/actions/home';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';
import { appConstants } from 'Front/_constants/app.constants.js';
import Diet from 'Front/views/Diet/Diet';
import {getBMI} from 'Front/views/Home/PublicFunction.jsx';

class KnowledgeShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            knowledgeModal: false,
            knowledgeList: {},
            categoryList: [],
            patientName: this.props.pvDetail.name,
            patientId: this.props.pvDetail.patientId,
            knowledgeCategory:'',
            currentPatient:'',
            dietTitle:'',
            dietModal:false,
        };
    }

    knowledgeListFun(data){
        let knowledgeList = {};

        for(let x in data){
            for(let y in data[x].category){
                if(!knowledgeList[data[x].category[y].id]){
                    knowledgeList[data[x].category[y].id] = [];
                }
                knowledgeList[data[x].category[y].id].push(data[x]);
            }
        }

        this.setState({ knowledgeList});
    }

    componentDidMount() {
        
        if (this.props.CategoryList) {

            this.setState({ categoryList: this.props.CategoryList.data.data });
        }else{
            this.props.categoryListAction(this.state);
        }

        if (this.props.KnowledgeList) {
            this.knowledgeListFun(this.props.KnowledgeList.data.data);
        }else{
            this.props.knowledgeListAction(this.state)
        }
        
    }

    componentWillReceiveProps(nextProps) { 
        if (nextProps.isPrintShareDocument !== this.props.isPrintShareDocument) {             
            this.setState({ knowledgeModal: false });
            setTimeout(function(){

            let params = {
                    clinicId:localStorage.getItem('clinicId'),
                }                            
                appConstants.socket.emit('updateTaskScreen', params);

            },1000);
        }
        
        if (nextProps.isKnowledgeList !== this.props.isKnowledgeList) {
            this.knowledgeListFun(nextProps.KnowledgeList.data.data);
        }
        if (nextProps.isCategoryList !== this.props.isCategoryList) {

            this.setState({ categoryList: nextProps.CategoryList.data.data });
        }
    }

    viewVideoDocument(link, type){
        
        return (<VideoDocumentView
                    pvDetail = {this.props.pvDetail}
                    link = {link}
                    type = {type}
                    ViewModal = { true }
                    status = {1}
                />);
    }
    documentPrint(){
        this.setState({ knowledgeModal: true });
        let documents = this.props.documents;
        let formData = [];
        formData['patient_id'] = this.props.pvDetail.pId;
        formData['visit_id'] = this.props.pvDetail.id;
        formData['type'] = 'print';
        formData['documents'] = documents;
        formData['videos'] = [];

        this.props.printShareDocumentAction(formData);

        let newWin=window.open('','Print-Window');
            newWin.document.open();
            newWin.document.write('<html><body onload="window.print()">');
            for(let x in documents){ 
                
                newWin.document.write('<img style="width:100%;margin:20px;" src="'+appConstants.paAppURL+'public/uploads/'+documents[x].link+'"/>');

            }
            newWin.document.write('</body></html>');
            newWin.document.close();
            setTimeout(function(){newWin.close();},10);

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

    render() {
        const documents = this.props.documents;
        const videos = this.props.videos;
        return (
            <div>
                {
                    this.state.categoryList.map((key, i) => {
                        let data;
                        if (key.name) {
                            data = (<Col sm={2} onClick={() => this.setState({ knowledgeModal: true, knowledgeCategory:key._id })} key={key._id}>
                                   <img alt="" style={{width: '45px' , margin: '10px' }} src={"../../../images/"+key.image}/><br/><span>{key.name}</span>
                                   </Col>                                
                            )
                        }
                        return data;
                    })
                }
                <Col sm={2}>
                      <img alt="" style={{width: '45px' , margin: '10px' }} src="../../../images/food.png" onClick={this.dietBox.bind(this, this.props.pvDetail)}/><br/><span>Aahaar</span>
                </Col> 
                <Modal show={this.state.knowledgeModal} onHide={() => this.setState({ knowledgeModal: false })} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Patient Knowledge Center ({this.state.patientName} - {this.state.patientId})</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Knowledge-Share">
                        <Table className="table table-striped table-hover table-bordered">
                            <thead className="flip-content bordered-palegreen">
                                <tr>
                                    <th className="W50">VIDEOS</th>
                                    <th className="W50">DOCUMENTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="W50"> 
                                                             
                                        {
                                            this.state.knowledgeList && this.state.knowledgeList[this.state.knowledgeCategory] && this.state.knowledgeList[this.state.knowledgeCategory].map((key, i) => {
                                                let data;
                                                if (key.title && key.type === 'video') {
                                                    let checked = false;
                                                    for(let x in videos){
                                                        if(videos[x].id === key._id)
                                                        {   
                                                            checked = true;
                                                        }
                                                    }
                                                    data = (<Row key={key._id}>
                                                        <Col sm={12}>
                                                        <Checkbox
                                                            number={key._id}
                                                            label={key.title}
                                                            checked={checked}
                                                            onClick={e => { this.props.handleKnowledgeVideoChange(key._id,key.title,key.image); }}
                                                        />
                                                        
                                                        <VideoDocumentView
                                                            pvDetail = {this.props.pvDetail}
                                                            link = {key.image}
                                                            name = {""}
                                                            type = {'video'}
                                                            status = {0}
                                                        />
                                                    </Col>
                                                    </Row>
                                                    )
                                                }
                                               return data; 
                                            })
                                        }
                                    </td>
                                    <td className="W50">
                                        {
                                            
                                            this.state.knowledgeList && this.state.knowledgeList[this.state.knowledgeCategory] && this.state.knowledgeList[this.state.knowledgeCategory].map((key, i) => {
                                                let data;
                                                if (key.title && key.type === 'image') {
                                                    let checked = false;
                                                    for(let x in documents){
                                                        if(documents[x].id === key._id)
                                                        {   
                                                            checked = true
                                                        }
                                                    }
                                                    data = (<Row key={key._id}>
                                                        <Col sm={12}>
                                                        <Checkbox
                                                            number={key._id}
                                                            label={key.title}
                                                            checked={checked}
                                                            onClick={e => { this.props.handleKnowledgeDocChange(key._id,key.title, key.image); }}
                                                        />
                                                        
                                                        <VideoDocumentView
                                                            pvDetail = {this.props.pvDetail}
                                                            link = {key.image}
                                                            name = {""}
                                                            type = {'image'}
                                                            status = {0}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-fill btn-wd btn btn-default pull-left"  onClick={(e)=>{this.documentPrint()}}>Print</Button>
                        <Button className="btn-fill btn btn-primary pull-right" onClick={e => { this.props.submitTask(e); }}>Submit</Button>
                    </Modal.Footer>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        CategoryList: state.home.categoryList,
        isCategoryList: state.home.isCategoryList,
        isCategoryListError: state.home.isCategoryListError,

        KnowledgeList: state.home.knowledgeList,
        isKnowledgeList: state.home.isKnowledgeList,
        isKnowledgeListError: state.home.isKnowledgeListError,

        PrintShareDocument: state.home.printShareDocument,
        isPrintShareDocument: state.home.isPrintShareDocument,
        isPrintShareDocumentError: state.home.isPrintShareDocumentError,
    }
}
export default withRouter(connect(mapStateToProps, { categoryListAction, knowledgeListAction, printShareDocumentAction })(KnowledgeShare));

