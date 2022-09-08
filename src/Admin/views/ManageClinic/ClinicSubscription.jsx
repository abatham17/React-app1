import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { clinicSubscriptionAction } from 'Admin/actions/clinic_subscription';
import { subscriptionchangestatusAction } from 'Admin/actions/clinic_subscription';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import Common from 'Admin/components/Common/Common';
import { Button} from 'react-bootstrap';


class ClinicSubscription extends Component{

    constructor(props){
        super(props);
        this.state = {
          ClinicSubscription:[],
          isLoading:true,
          hidden:true
        }
    }


    editButton(cell, row, enumObject, rowIndex) {
      // console.log(new Date("2018-09-09"));
      // console.log(new Date());
        if(new Date(row.endDate)<new Date())
          return "Expired"
        else {
          return 'Active'
        }
        // return (<p><Link to={{ pathname: `update-subscription/` + row._id, state: { row } }} onClick={this.toggleEdit.bind(this, row)} ><i class="fa fa-pencil" aria-hidden="true"></i></Link>
        //     &nbsp;&nbsp; &nbsp;&nbsp;
        //     <a href="javascript:void(0)" onClick={this.statusChangedHandler.bind(this, row)}><i className={(row.status==="active") ? ('fa fa-check') : ('fa fa-remove') } aria-hidden="true"></i></a>
        // <a href="javascript:void(0)"><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
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
        this.props.subscriptionchangestatusAction(event);

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

    componentDidMount(){
       this.props.clinicSubscriptionAction(this.state)
    }

    componentWillReceiveProps(nextProps){
     //console.log(nextProps);

     if(nextProps.isClinicSubscriptionList !== this.props.isClinicSubscriptionList){
            // let date1 = nextProps.clinicSubscription.data.data[0].createdAt;

            this.setState({
              clinicSubscription: nextProps.clinicSubscriptionList.data.data
            });


     }
     if(this.state.isLoading===true){
        this.setState({isLoading:false});
     }


    }
    render() {

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
                                    <Button bsStyle="info" onClick={() => this.props.history.replace('add-clinic-subscription')}>Add Clinic Subscription</Button>
                                    <BootstrapTable deleteRow={ false } data={ this.state.clinicSubscription } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn hidden={ this.state.hidden } tdAttr={{ 'data-attr': '_id' }} dataField='invitationId' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Clinic Id' }} dataField='clinicId' dataSort={ true } >Clinic Id</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Clinic Name' }} dataField='clinicName' dataSort={ true }>Clinic Name</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Plan' }}  dataField='planName' dataSort={ true }>Plan</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Start Date' }}  dataField='startDate' dataFormat={Common.formatDate}>Start Date</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'End Date' }}  dataField='endDate' dataFormat={Common.formatDate}>End Date</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{ width: '20%' }} tdStyle={{ width: '20%' }} tdAttr={{ 'data-attr': 'Action' }} dataFormat={this.editButton.bind(this)} dataSort={false}>Status</TableHeaderColumn>
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

    clinicSubscriptionList: state.clinicSubscription.clinicSubscriptionList,
    isClinicSubscriptionList: state.clinicSubscription.isClinicSubscriptionList,
    isClinicSubscriptionListError: state.clinicSubscription.isClinicSubscriptionListError,

    SubscriptionChangeStatus: state.clinicSubscription.SubscriptionChangeStatus,
    isSubscriptionChangeStatus: state.clinicSubscription.isSubscriptionChangeStatus,
    isSubscriptionChangeStatusError: state.clinicSubscription.isSubscriptionChangeStatusError,

  }
}
export default withRouter(connect(mapStateToProps, { clinicSubscriptionAction, subscriptionchangestatusAction} )(ClinicSubscription));
