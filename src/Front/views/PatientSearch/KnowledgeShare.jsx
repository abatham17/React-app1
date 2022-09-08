import React, { Component } from 'react';
import {
    Row, Col, Modal, Table
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import VideoDocumentView from 'Front/views/TaskScreen/VideoDocumentView.jsx';
import { knowledgeListAction } from 'Front/actions/home';
import { printShareDocumentAction } from 'Front/actions/home';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import { appConstants } from 'Front/_constants/app.constants.js';

class KnowledgeShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            knowledgeList: {},
            categoryList: [],
            patientName: '',
            patientId: '',
            knowledgeCategory: '',
            knowledgeModal: this.props.knowledgeModal,
            documents:[],
            videos:[],
            alert:null,
        };

        console.log(this.props);
    }

    knowledgeListFun(data) {
        let knowledgeList = {};

        for (let x in data) {
            for (let y in data[x].category) {
                if (!knowledgeList[data[x].category[y].id]) {
                    knowledgeList[data[x].category[y].id] = [];
                }
                knowledgeList[data[x].category[y].id].push(data[x]);
            }
        }

        this.setState({ knowledgeList });
    }

    componentDidMount() {
        
        if (this.props.KnowledgeList) {

            this.setState({ knowledgeList: this.props.KnowledgeList.data.data });
        }else{
            this.props.knowledgeListAction(this.state);
        }
        
        
    }

    componentWillReceiveProps(nextProps) { 

        if (nextProps.isKnowledgeList !== this.props.isKnowledgeList) {

            this.setState({ knowledgeList: nextProps.KnowledgeList.data.data });
        }
       
        if (nextProps.isPrintShareDocument !== this.props.isPrintShareDocument) { 

            this.successAlert();
        }

        if (nextProps.patientInfo._id) {
            if (this.state.patientId !== nextProps.patientInfo.patientId) {

                this.setState({ knowledgeModal: nextProps.knowledgeModal });
                this.setState({ patientId: nextProps.patientInfo.patientId });
                
                let docList = nextProps.patientInfo.documentList;
                let videos = [];
                let documents = [];
                for (let i in docList) {
                    if (docList[i].docType === 'document') {
                        documents.push({ id: docList[i].documentId, name: docList[i].documentName, link: docList[i].image });
                    } else {
                        videos.push({ id: docList[i].documentId, name: docList[i].documentName, link: docList[i].image });
                    }
                }
                
                this.setState({ documents: documents });
                this.setState({ videos: videos });
            }
        }
    }

    handleKnowledgeDocChange = (id, name, link) => {

        let documents = this.state.documents;
        let exist = 0;
        for (let x in documents) {
            if (documents[x].id === id) {
                exist = 1;
                delete documents[x];
            }
        }
        if (exist === 0){
            documents.push({ id: id, name: name, link: link });
        }
        documents = documents.filter(function (el) {
            return el != null;
          });

        this.setState({ documents: documents });

    }

    handleKnowledgeVideoChange = (id, name, link) => {

        let videos = this.state.videos;
        let exist = 0;
        for (let x in videos) {
            if (videos[x].id === id) {
                exist = 1;
                delete videos[x];
            }
        }
        if (exist === 0){
            videos.push({ id: id, name: name, link: link });
        }
        videos = videos.filter(function (el) {
            return el != null;
          });

        this.setState({ videos: videos });

    }

    viewVideoDocument(link, type) {

        return (<VideoDocumentView
            patientInfo={this.props.patientInfo}
            link={link}
            type={type}
            ViewModal={true}
        />);
    }
    
    documentPrint() {
        this.setState({ knowledgeModal: true });
        let documents = this.state.documents;
        let formData = [];
        formData['patient_id'] = this.props.patientInfo._id;
        formData['visit_id'] = '';
        formData['type'] = 'print';
        formData['documents'] = documents;
        formData['videos'] = [];

        this.props.printShareDocumentAction(formData);

        let newWin = window.open('', 'Print-Window');
        newWin.document.open();
        newWin.document.write('<html><body onload="window.print()">');
        for (let x in documents) {

            newWin.document.write('<img style="width:100%;margin:20px;" src="'+appConstants.paAppURL+'public/uploads/' + documents[x].link + '"/>');

        }
        newWin.document.write('</body></html>');
        newWin.document.close();
        setTimeout(function () { newWin.close(); }, 10);

    }


    submitTask() {
        this.setState({ knowledgeModal: false});   
        let documents = this.state.documents;
        let videos = this.state.videos;     
        let formData = [];
        formData['patient_id'] = this.props.patientInfo._id;
        formData['visit_id'] = '';
        formData['type'] = 'share';
        formData['documents'] = documents;
        formData['videos'] = videos;
        this.props.printShareDocumentAction(formData);
    }

    successAlert() { 
        this.setState({ knowledgeModal: false});
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
                    You have successfully Share knowledge!
                </SweetAlert>
            )
        });
    }


    hideAlert() {
        this.setState({
            alert: null
        });
        this.props.history.push('/patient-search');
    }

    render() {
        if (this.props.patientInfo._id) {

            const documents = this.state.documents;
            const videos = this.state.videos;
            return (
                <div>
                    {this.state.alert}
                    <Modal show={this.state.knowledgeModal} onHide={() => this.setState({ knowledgeModal: false })} dialogClassName="modal-lg">
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">Patient Knowledge Center ({this.props.patientInfo.name} - {this.props.patientInfo.patientId})</Modal.Title>
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
                                                this.state.knowledgeList && this.state.knowledgeList.map((key, i) => {
                                                    let data;
                                                    if (key.title && key.type === 'video') {
                                                        let checked = false;
                                                        for (let x in videos) {
                                                            if (videos[x].id === key._id) {
                                                                checked = true;
                                                            }
                                                        }
                                                        data = (<Row>
                                                            <Col sm={12}>
                                                                <Checkbox
                                                                    number={key._id}
                                                                    label={key.title}
                                                                    checked={checked}
                                                                    onClick={e => { this.handleKnowledgeVideoChange(key._id, key.title, key.image); }}
                                                                />

                                                                <VideoDocumentView
                                                                    pvDetail={this.props.patientInfo}
                                                                    link={key.image}
                                                                    title={key.title}
                                                                    type={'video'}
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

                                                this.state.knowledgeList && this.state.knowledgeList.map((key, i) => {
                                                    let data;
                                                    if (key.title && key.type === 'image') {
                                                        let checked = false;
                                                        for (let x in documents) {
                                                            if (documents[x].id === key._id) {
                                                                checked = true
                                                            }
                                                        }
                                                        data = (<Row>
                                                            <Col sm={12}>
                                                                <Checkbox
                                                                    number={key._id}
                                                                    label={key.title}
                                                                    checked={checked}
                                                                    onClick={e => { this.handleKnowledgeDocChange(key._id, key.title, key.image); }}
                                                                />

                                                                <VideoDocumentView
                                                                    pvDetail={this.props.patientInfo}
                                                                    link={key.image}
                                                                    title={key.title}
                                                                    type={'image'}
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
                            <Button className="btn-fill btn-wd btn btn-default pull-left" onClick={(e) => { this.documentPrint() }}>Print</Button>
                            <Button className="btn-fill btn btn-primary pull-right" onClick={e => { this.submitTask(e); }}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else {
            return ('');
        }
    }
}

function mapStateToProps(state) {
    return {

        KnowledgeList: state.home.knowledgeList,
        isKnowledgeList: state.home.isKnowledgeList,
        isKnowledgeListError: state.home.isKnowledgeListError,

        PrintShareDocument: state.home.printShareDocument,
        isPrintShareDocument: state.home.isPrintShareDocument,
        isPrintShareDocumentError: state.home.isPrintShareDocumentError,
    }
}
export default withRouter(connect(mapStateToProps, { knowledgeListAction, printShareDocumentAction })(KnowledgeShare));

