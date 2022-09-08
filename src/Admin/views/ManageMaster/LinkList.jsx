import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { linkListAction } from 'Admin/actions/link';
import { linkchangestatusAction } from 'Admin/actions/link';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import { Button } from 'react-bootstrap';


class LinkList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkList: [],
            isLoading: true,
            userRow: null,
        }
    }
    editButton(cell, row, enumObject, rowIndex) {
        return (<p><Link to={{ pathname: `update-link/` + row._id, state: { row } }} onClick={this.toggleEdit.bind(this, row)} ><i class="fa fa-pencil" aria-hidden="true"></i></Link>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <a href="javascript:void(0)" onClick={this.statusChangedHandler.bind(this, row)}><i className={(row.status==="active") ? ('fa fa-check') : ('fa fa-remove') } aria-hidden="true"></i></a>
        <a href="javascript:void(0)"><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
    }
    toggleEdit(event) {
        this.setState({
            userRow: event
        });
    }
    statusChangedHandler = (event, elename) => {
        let newstatus = {};
        if(event.status=='active'){
            newstatus = 'deactive';
        }else{
            newstatus = 'active';
        }
        event['id'] = event._id;
        event['status'] = newstatus;
        this.props.linkchangestatusAction(event);

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
    navigateto() {
        window.location.href = "Admin/add-link";
        this.clicked = "";
    }
    componentDidMount() {
        this.props.linkListAction(this.state)
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isLinkList !== this.props.isLinkList) {
            this.setState({
                linkList: nextProps.LinkList.data.data
            });
        }
        if (this.state.isLoading == true) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox'
        };
        const options = {
            afterDeleteRow: this.handleDeleteButtonClick,
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
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            noDataText: this._setTableOption(),
        };
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                        <Button bsStyle="info" fill pullRight onClick={() => this.props.history.replace('add-link')}>Add Link</Button>
                                        <BootstrapTable selectRow="{selectRowProp}" deleteRow={false} data={this.state.linkList} search={true} multiColumnSearch={true} pagination={true} options={options} striped hover condensed scrollTop={'Bottom'}>
                                            <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': '_id' }} dataField='invitationId' dataSort={true} isKey searchable={false}>Id</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Message' }} dataField='title' dataSort={true} >Message</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Description' }} dataField='description' dataSort={true}>Description</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Link' }} dataField='link' dataSort={true}>Link</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Clinic Name' }} dataField='clinicName' dataSort={true}>Clinic Name</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Status' }} dataField='status' dataSort={true}>Status</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' }} tdAttr={{ 'data-attr': 'Action' }} dataFormat={this.editButton.bind(this)} dataSort={false}>Action</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        LinkList: state.link.LinkList,
        isLinkList: state.link.isLinkList,
        isLinkListError: state.link.isLinkListError,
        LinkChangeStatus: state.link.LinkChangeStatus,
        isLinkChangeStatus: state.link.isLinkChangeStatus,
        isLinkChangeStatusError: state.link.isLinkChangeStatusError,
    }
}
export default withRouter(connect(mapStateToProps, { linkListAction, linkchangestatusAction })(LinkList));
