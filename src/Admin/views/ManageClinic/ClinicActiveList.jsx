import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { clinicActiveAction } from 'Admin/actions/clinic_active';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';



class clinicActiveList extends Component{

    constructor(props){
        super(props);
        this.state = {
          ClinicActive:[],
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
       this.props.clinicActiveAction(this.state)
    }

    componentWillReceiveProps(nextProps){
     //console.log(nextProps);

     if(nextProps.isClinicActiveList !== this.props.isClinicActiveList){
            this.setState({
              clinicActive: nextProps.clinicActiveList.data.data
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
                                    <BootstrapTable   deleteRow={ false } data={ this.state.clinicActive } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn hidden={ this.state.hidden } tdAttr={{ 'data-attr': '_id' }} dataField='invitationId' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>
                                        <TableHeaderColumn  tdAttr={{ 'data-attr': 'Clinic Id' }} dataField='clinicId' dataSort={ true } >Clinic Id</TableHeaderColumn>
                                        <TableHeaderColumn  tdAttr={{ 'data-attr': 'Clinic Name' }} dataField='short_name' dataSort={ true } >Clinic Name</TableHeaderColumn>
                                        <TableHeaderColumn  tdAttr={{ 'data-attr': 'Contact Details' }} dataField='short_name' dataSort={ true } >Contact Details</TableHeaderColumn>
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

    clinicActiveList: state.clinicActive.clinicActiveList,
    isClinicActiveList: state.clinicActive.isClinicActiveList,
    isClinicActiveListError: state.clinicActive.isClinicActiveListError,

  }
}
export default withRouter(connect(mapStateToProps, { clinicActiveAction} )(clinicActiveList));
