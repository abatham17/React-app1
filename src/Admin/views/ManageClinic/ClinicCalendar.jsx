import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { clinicCalendarListAction } from 'Admin/actions/clinic_calendar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Common from 'Admin/components/Common/Common';
import Loading from 'react-loading';
import { Button} from 'react-bootstrap';


class ClinicCalendar extends Component{

    constructor(props){
        super(props);
        this.state = {
          clinicCalendarList:[],
          isLoading:true,
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

    componentDidMount(){

       this.props.clinicCalendarListAction(this.state)
    }

    componentWillReceiveProps(nextProps){

       if(nextProps.isClinicCalendarList !== this.props.isClinicCalendarList){
              this.setState({
                clinicCalendarList: nextProps.clinicCalendarList.data.data
              });
       }
       if(this.state.isLoading===true){
          this.setState({isLoading:false});
       }
    }
    implodeDate(event){
      var calenderDates = [];
      event.map(obj =>{
         return calenderDates.push(Common.formatDate(obj));
      });
      return calenderDates.join()
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
                                    <Button bsStyle="info" onClick={() => this.props.history.replace('add-clinic-calendar')}>Add Clinic Calendar</Button>
                                    <BootstrapTable deleteRow={ false } key={ this.state.clinicCalendarList } data={ this.state.clinicCalendarList } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn hidden='true' tdAttr={{ 'data-attr': '_id' }} dataField='_id' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}}  tdAttr={{ 'data-attr': 'Clinic Name' }} dataField='clinicName' dataSort={ true } >Clinic Name</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}}  tdAttr={{ 'data-attr': 'Clinic Date' }} dataField='calendarDate' dataFormat={this.implodeDate.bind(this)} >Holiday Dates</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}}  tdAttr={{ 'data-attr': 'Message' }} dataField='message' dataSort={ true } >Message</TableHeaderColumn>
                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}}  tdAttr={{ 'data-attr': 'Action' }}  dataField=''  dataSort={ true }>Action</TableHeaderColumn>
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

    clinicCalendarList: state.clinicCalendar.clinicCalendarList,
    isClinicCalendarList: state.clinicCalendar.isClinicCalendarList,
    isClinicCalendarListError: state.clinicCalendar.isClinicCalendarListError,

  }
}
export default withRouter(connect(mapStateToProps, { clinicCalendarListAction} )(ClinicCalendar));
