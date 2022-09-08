import React, { Component } from 'react';
import {
    Grid
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DoctorScreen from 'Front/views/Home/DoctorScreen.jsx';
import EducatorScreen from 'Front/views/Home/EducatorScreen.jsx';
import ReceptionistScreen from 'Front/views/Home/ReceptionistScreen.jsx';

class Dashboard extends Component {

    constructor(props) { 
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            search: '',
            search_date:date,
        };
        
     
    } 
    Screens(){ 

        if(localStorage.getItem('userType')==='doctor'){

            return (<DoctorScreen 
                        search = {this.state.search}
                        search_date = {this.state.search_date}
                    />)

        }else if(localStorage.getItem('userType')==='educator'){

            return (<EducatorScreen
                        search = {this.state.search}
                        search_date = {this.state.search_date}
                    />)
        }else if(localStorage.getItem('userType')==='receptionist'){

            return (<ReceptionistScreen
                        search = {this.state.search}
                        search_date = {this.state.search_date}
                    />)
        }
    }
           
    render() {
        
        return (
            <div className="main-content dashboard" style={{ padding: '15px 15px' }}>
                <Grid fluid>
                    
                        {this.Screens()}                 
                
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }

  }
  export default withRouter(connect(mapStateToProps, { } )(Dashboard));
