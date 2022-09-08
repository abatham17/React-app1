import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { knowledgeListAction } from 'Admin/actions/master';
import { knowledgechangestatusAction } from 'Admin/actions/master';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import { Button} from 'react-bootstrap';


class KnowledgeList extends Component{

    constructor(props){
        super(props);
        this.state = {

            knowledgeList:[],
            isLoading:true,  
            userRow: null, 
            
        }
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
   
   
    editButton(cell, row, enumObject, rowIndex) {
        return (<p><Link to={{ pathname: `/admin/update-knowledge/`+row._id, state: {row} }} onClick={this.toggleEdit.bind(this,row)} ><i class="fa fa-pencil" aria-hidden="true"></i></Link>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <a href="javascript:void(0)" onClick={this.statusChangedHandler.bind(this, row)}><i className={(row.status==="active") ? ('fa fa-check') : ('fa fa-remove') } aria-hidden="true"></i></a>
        <a href="javascript:void(0)"><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
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
        this.props.knowledgechangestatusAction(event);

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

    toggleEdit(event) {
        this.setState({
            userRow: event
        });
    }

    componentDidMount(){

        this.props.knowledgeListAction(this.state)
     }
 
     componentWillReceiveProps(nextProps){
      
         if(nextProps.isKnowledgeList !== this.props.isKnowledgeList){ 
             this.setState({
 
                 knowledgeList: nextProps.KnowledgeList.data.data
             }); 
         }
         if(this.state.isLoading==true){
             this.setState({isLoading:false});
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
            <div className="main-content" style={{padding: '15px 0px'}}>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                    <Button bsStyle="info" fill pullRight onClick={() => this.props.history.replace('add-knowledge')}>Add Knowledge</Button>
                                    <BootstrapTable data={ this.state.knowledgeList }  selectRow="{selectRowProp}" deleteRow={ false } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' } >
                                        <TableHeaderColumn  hidden='true' tdAttr={{ 'data-attr': '_id' }} dataField='_id' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'35%'}}  tdStyle={{width:'35%'}}   tdAttr={{ 'data-attr': 'Title' }} dataField='title' dataSort={ true } >Title</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'20%'}}  tdStyle={{width:'20%'}}   tdAttr={{ 'data-attr': 'Clinic Name' }} dataField='clinicName' dataSort={ true } >Clinic Name</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'15%'}}  tdStyle={{width:'15%'}}   tdAttr={{ 'data-attr': 'Description' }} dataField='description' dataSort={ true }>Description</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'8%'}}  tdStyle={{width:'8%'}}   tdAttr={{ 'data-attr': 'Order' }} dataField='order' dataSort={ true }>Order</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'9%'}}  tdStyle={{width:'9%'}}   tdAttr={{ 'data-attr': 'Status' }} dataField='status' dataSort={ true }>Status</TableHeaderColumn>
                                        
                                        <TableHeaderColumn  tdAttr={{ 'data-attr': 'Action' }} dataFormat={this.editButton.bind(this)}   dataField=''  dataSort={ true }>Action</TableHeaderColumn>

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
    KnowledgeList: state.master.KnowledgeList,
    isKnowledgeList: state.master.isKnowledgeList,
    isKnowledgeListError: state.master.isKnowledgeListError,
    KnowledgeChangeStatus: state.master.KnowledgeChangeStatus,
    isKnowledgeChangeStatus: state.master.isKnowledgeChangeStatus,
    isKnowledgeChangeStatusError: state.master.isKnowledgeChangeStatusError,
  }
}
export default withRouter(connect(mapStateToProps, { knowledgeListAction, knowledgechangestatusAction} )(KnowledgeList));
