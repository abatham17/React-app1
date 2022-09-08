import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { userListAction,userStatusAction } from 'Admin/actions/user';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';


class UserList extends Component{

    constructor(props){
        super(props);
        this.state = {
          userList:[],
          isLoading:true,
          userRow:null,
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
        return (<p><Link to={{ pathname: `/admin/update-user/`+row._id, state: {row} }} onClick={this.toggleEdit.bind(this,row)} ><i class="fa fa-pencil" aria-hidden="true"></i></Link>        
        <a href="javascript:void(0)" onClick={this.statusChangedHandler.bind(this, row)}><i className={(row.status==="active") ? ('fa fa-check') : ('fa fa-remove') } aria-hidden="true"></i></a>
        <a href="javascript:void(0)"><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
       // <a href="javascript:void(0)" onClick={this.deleteButton.bind(this, row.invitationId)}><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
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
        this.props.userStatusAction(event);

    }
    toggleEdit(event){
        this.setState({
            userRow: event
        });
    }
    componentDidMount(){

       this.props.userListAction(this.state)
    }

    componentWillReceiveProps(nextProps){

     if(nextProps.isUserList !== this.props.isUserList){

        this.setState({
            userList: nextProps.UserList.data.data
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
                                    <BootstrapTable  selectRow="{selectRowProp}" deleteRow={ false } data={ this.state.userList } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn  hidden='true' tdAttr={{ 'data-attr': '_id' }} dataField='_id' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}}  tdAttr={{ 'data-attr': 'User Name' }} dataField='userName' dataSort={ true }>Username</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'23%'}}  tdStyle={{width:'23%'}}   tdAttr={{ 'data-attr': 'Email' }} dataField='email' dataSort={ true }>Email</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'11%'}}  tdStyle={{width:'11%'}}  tdAttr={{ 'data-attr': 'First Name' }}  dataField='firstName' dataSort={ true }>firstName</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'Last Name' }}  dataField='lastName' dataSort={ true }>lastName</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'9.5%'}}  tdStyle={{width:'9.5%'}} tdAttr={{ 'data-attr': 'Phone' }}  dataField='phone' dataSort={ true }>Phone</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'8%'}}  tdStyle={{width:'8%'}} tdAttr={{ 'data-attr': 'Group' }}  dataField='userType' dataSort={ true }>Group</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'8%'}}  tdStyle={{width:'8%'}} tdAttr={{ 'data-attr': 'Clinic' }}  dataField='clinicName' dataSort={ true }>Clinic</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'8%'}}  tdStyle={{width:'8%'}} tdAttr={{ 'data-attr': 'Status' }}  dataField='status' dataSort={ true }>Status</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'10%'}}  tdStyle={{width:'10%'}} tdAttr={{ 'data-attr': 'Action' }}  dataFormat={this.editButton.bind(this)}  dataSort={ false }>Action</TableHeaderColumn>

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
    UserList: state.user.UserList,
    isUserList: state.user.isUserList,
    isUserListError: state.user.isUserListError,

    userStatus: state.user.userStatus,
    isUserStatus: state.user.isUserStatus,
    isUserStatusError: state.user.isUserStatusError,

  }

}
export default withRouter(connect(mapStateToProps, { userListAction,userStatusAction } )(UserList));
