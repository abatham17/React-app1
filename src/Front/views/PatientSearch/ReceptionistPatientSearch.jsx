import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net

import {
    Grid, Row, Col, Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import { patientListAction } from 'Front/actions/patient';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import moment from 'moment';
import DropDownSearch from 'Front/views/PatientSearch/ReceptionistDropDownSearch.jsx';
import KnowledgeShare from 'Front/views/PatientSearch/KnowledgeShare.jsx';
import { printShareDocumentAction } from 'Front/actions/home';
import Chat from '../../components/Header/Chat';
class ReceptionistPatientSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientList: [],
            isLoading: true,
            chatModal: false,
            chatPatientId:'',
            chatPatientName:'',
            patientInfo: [],
            knowledgeModal: false,
            formData: {
                visit_id: '',
                patient_id: '',
                documents: [],
                videos: [],
                type: 'share',
            },

        }

        this.chatBox = this.chatBox.bind(this);
        this.knowledgeShare = this.knowledgeShare.bind(this);
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

        this.props.patientListAction(this.props);
        
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isPatientList !== this.props.isPatientList) {

            let j = 0;
            let patientList = nextProps.patientList.data.data.map((key, i) => {
                let row = {
                    id: key._id,
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
                    documentList:key.Documents
                };

                return { ...key, ...row };

            });
            this.setState({patientList:patientList});
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


    chatBox(patientId,chatPatientName,e){

        this.setState({chatModal:true,chatPatientId:patientId,chatPatientName:chatPatientName});

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
            chatPatientName={row.firstName+' '+row.lastName}            
            knowledgeShare={(patient) => { this.knowledgeShare(patient) }}
        />
        )
    }  

    render() {
        
        const options = {
            clearSearch: true,                     
            page: 1,  // which page you want to show as default
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
            noDataText: this._setTableOption(),
        };
        return (
            <div className="main-content patient-search" style={{ padding: '15px 0px' }}>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                        <BootstrapTable data={this.state.patientList} search={true} multiColumnSearch={true} pagination={true} options={options} striped hover condensed scrollTop={'Bottom'}>
                                            <TableHeaderColumn hidden='true' tdAttr={{ 'data-attr': '_id' }} dataField='_id' isKey searchable={false}>Id</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '3%' }} tdStyle={{ width: '3%' }} tdAttr={{ 'data-attr': '#' }} dataField='sn'>#</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '8%' }} tdStyle={{ width: '8%' }} tdAttr={{ 'data-attr': 'DATE' }} dataField='created_date'>DATE</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '7%' }} tdStyle={{ width: '7%' }} tdAttr={{ 'data-attr': 'ID' }} dataField='patientId' dataSort={true}>ID</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '15%' }} tdStyle={{ width: '15%' }} tdAttr={{ 'data-attr': 'NAME' }} dataField='name' dataSort={true}>NAME</TableHeaderColumn>

                                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' }} tdAttr={{ 'data-attr': 'APP' }} dataField='' dataFormat={this.isApp.bind(this)}>APP</TableHeaderColumn>

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

                <Modal className="pa-chat-md" show={this.state.chatModal} onHide={() => this.setState({ chatModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Chat</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="Knowledge-Share">

                        <Row>
                            <Col md={12}>
                                       <Chat chatPatientId={this.state.chatPatientId} chatPatientName={this.state.chatPatientName} />         

                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal>

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
export default withRouter(connect(mapStateToProps, { patientListAction, printShareDocumentAction })(ReceptionistPatientSearch));
