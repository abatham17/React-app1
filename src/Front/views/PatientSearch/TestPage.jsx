import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { patientListAction } from 'Front/actions/patient';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class TestPage extends Component {

     constructor(props) {
        super(props);
        this.state = {
            formData:{},
            formArr:{},
            companyId:localStorage.getItem('companyId'),
            userId: localStorage.getItem("userId"),
            list: [],
            userType:[],
            allCppRole: [],
            selectBox:{},
            modal: false,
            fetchRequest: false,
            comLogo:'',
            totalCount:0,
            currentPage:1,
            sizePerPage:10,
            searchText:""
        };
        this.onPageChange = this.onPageChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSizePerPageList = this.onSizePerPageList.bind(this)
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.isPatientList !== this.props.isPatientList){
        this.setState({fetchRequest: true});
      }

      if(nextProps.patientList && nextProps.patientList.data){
        this.setState({list:nextProps.patientList.data.data ,totalCount: nextProps.patientList.data.count, fetchRequest: true});
      }else{
        this.setState({list:[], totalCount:0, fetchRequest: true});
      }

    }

    componentDidMount(){
        let data = {}
        data['patient_id'] = "";
        data['city'] = "";
        data['first_name'] = "";
        data['last_name'] = "";
        data['direction'] = "desc";
        data['order'] = "firstName";
        data['offset'] = 0;
        data['limit'] = 10;
        this.props.patientListAction(data);

    }




  onSizePerPageList(sizePerPage) {

  }

  onPageChange(page, sizePerPage) {
    console.log(page);
    let data = {};
   
    if(this.state.searchText===""){      

        data['patient_id'] = "";
        data['city'] = "";
        data['first_name'] = "";
        data['last_name'] = "";
        data['direction'] = "desc";
        data['order'] = "firstName";
        data['offset'] = (page===-1)?0:page-1;
        data['limit'] = sizePerPage;

    }else{      

        data['patient_id'] = "";
        data['city'] = "";
        data['first_name'] = "";
        data['last_name'] = "";
        data['direction'] = "desc";
        data['order'] = "firstName";
        data['offset'] = (page===-1)?0:page-1;
        data['limit'] = sizePerPage;
     
    }

    console.log(data)

    this.setState({sizePerPage:sizePerPage})
    this.setState({currentPage:page})
    this.props.patientListAction(data);
  }

  onSearchChange(text, sizePerPage) {
    if(text !==""){
      if(text.length >= 1){
      let data = {}
       data['patient_id'] = "";
        data['city'] = "";
        data['first_name'] = "";
        data['last_name'] = "";
        data['direction'] = "desc";
        data['order'] = "firstName";
        data['offset'] = 0;
        data['limit'] = 10;
      this.setState({sizePerPage:10})
     
      this.props.patientListAction(data);
      }
    }else{
      this.componentDidMount();
      this.setState({searchText:text})
    }
  }

    _setTableOption(){
        
    }

   
    render() {

        let tableOption = {
          sizePerPage: this.state.sizePerPage,
          onPageChange: this.onPageChange,
          page: this.state.currentPage,
          onSizePerPageList: this.onSizePerPageList,
          noDataText:this._setTableOption(),
          prePage: 'Prev', // Previous page button text
          nextPage: 'Next', // Next page button text
          firstPage: 'First', // First page button text
          lastPage: 'Last', // Last page button text,
          paginationPosition: 'bottom',  // default is bottom, top and both is all available
          alwaysShowAllBtns: true, // Always show next and previous buttondefault is bottom, top and both is all available
          onSearchChange: this.onSearchChange,
        
        }

        return (
            <div>
                <div className="ContactListReport">
                
                 <div className="contactBox">
                    <div className="container">
                       
                        <div className="row">
                          <div className="col-md-12">
                              <div className="table-responsive reportTableSection" >
                                <BootstrapTable
                            ref={el => (this.componentRef = el)}
                            searchPlaceholder={"Search CompanyList"}
                            data={this.state.list} search={ true }
                            multiColumnSearch={ true }
                            pagination={ true }
                            remote={true}
                            fetchInfo={ { dataTotalSize: this.state.totalCount } }
                            options={ tableOption }>
                                  <TableHeaderColumn hidden={true} tdAttr={ { 'data-attr': 'Job Number' } }  dataField='_id' dataSort={ true } isKey searchable={ false }>Job Number</TableHeaderColumn>
                              <TableHeaderColumn width='160' tdAttr={ { 'data-attr': 'Company Name' } } dataField="firstName"  dataSort={ true }> firstName </TableHeaderColumn>
                              <TableHeaderColumn tdAttr={ { 'data-attr': 'Email' } } dataField="lastName"   dataSort={ true }>lastName</TableHeaderColumn>
                     
                            </BootstrapTable>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                
               </div>
           </div>
        );
    }
}


function mapStateToProps(state) {

    return {

        patientList: state.patient.patientList,
        isPatientList: state.patient.isPatientList,
        isPatientListError: state.patient.isPatientListError,


    }
}
export default withRouter(connect(mapStateToProps, { patientListAction })(TestPage));
