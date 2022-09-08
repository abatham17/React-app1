import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

// links that appear in navbar - they are separated from this component (navbar) so that we can redner them on responsive in sidebar as well

import HeaderLinks from './HeaderLinks.jsx'
import { Link } from 'react-router-dom';
import * as PF from "Front/views/Home/PublicFunction.jsx"
// we import here the routes for dashboard pages (links that appear in sidebar) to set navbar's name

// import dashRoutes from 'Front/routes/dash.jsx';

//import logo from '../../../images/logo.png';

import NotificationSystem from 'react-notification-system';
import { appConstants } from 'Front/_constants/app.constants.js';


// style for notifications
import { style } from "Front/variables/Variables.jsx";

class Header extends Component{
    constructor(props){
        super(props);
        this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
          this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null,
            AllCount:localStorage.getItem('AllCount'),
            chatOpen:false
        };

        this.setChatModel = this.setChatModel.bind(this);


         let _this = this;
      
        appConstants.socket.on('newMsg', function(data){
            console.log(localStorage.getItem('chatModel'))
            if(localStorage.getItem('chatModel') === 'false'){
             let AllCount = localStorage.getItem('AllCount');
             let count = parseInt(AllCount,10) + 1;
             localStorage.setItem('AllCount',count)
             _this.setState({AllCount:count});
            _this.handleNotificationClick('warning',data.msg,data.senderName);
            }
        });
       
        
    }

    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
        
    }

    // function that makes the sidebar from normal to mini and vice-versa
    handleMinimizeSidebar(){
        document.body.classList.toggle('sidebar-mini');
    }
    // function for responsive that hides/shows the sidebar
    mobileSidebarToggle(e){
        document.documentElement.classList.toggle('nav-open');
    }

     handleNotificationClick(position,msg='',from){
       
        this.state._notificationSystem.addNotification({
            title: (<span><i class="fa fa-envelope-square" aria-hidden="true"></i></span>),
            message: (
                <div>
                    <p>{from}</p>
                    <span>{msg}</span> 
                </div>
            ),
            level: 'info',
            position: 'tr',
            autoDismiss: 10,
        });
    }


    setChatModel(evt){
       if(evt === true){
          localStorage.setItem('chatModel',true)
       }       
       else{
        localStorage.setItem('chatModel',false) 
        let addUser = {
                         userId:localStorage.getItem('_id')                       
                      } 
        appConstants.socket.emit('screenClose', addUser);
       }
       
    }
    
    render(){
      
        return (
            
            <Navbar fluid className="front-head">
            <NotificationSystem ref="notificationSystem" style={style}/>
                <Navbar.Header>

                        <Link to="/dashboard"><img style={{width: '50px' , margin: '10px' }} src={PF.baseUrl("public/uploads/"+localStorage.getItem('logo'))} alt="Logo"/>
                        <b className="pa-title">{localStorage.getItem('clinicName')}</b></Link>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>

                    {/* Here we import the links that appear in navbar */}
                    { window.innerWidth > 992 ? (<Navbar.Collapse><HeaderLinks AllCount={this.state.AllCount} chatModel={(evt) => {this.setChatModel(evt)}}  /></Navbar.Collapse>):null }

            </Navbar>
         
        );
    }
}

export default Header;
