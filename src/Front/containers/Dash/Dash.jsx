import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
// this is used to create scrollbars on windows devices like the ones from apple devices
import * as Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from 'react-notification-system';

// import Sidebar from 'Front/components/Sidebar/Sidebar.jsx';
import Header from 'Front/components/Header/Header.jsx';
import Footer from 'Front/components/Footer/Footer.jsx';

// dinamically create dashboard routes
import dashRoutes from 'Front/routes/dash.jsx';

// style for notifications
import { style } from "Front/variables/Variables.jsx";

class Dash extends Component{
    constructor(props){
        super(props);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }
    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            Ps.initialize(this.refs.mainPanel, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
    handleNotificationClick(position,msg='',from){
       /* let color = '';
        if(position === 'success' || position === 'warning' || position === 'error'){
            color = 1;
            position = 'tr'
        }else{
            color = Math.floor((Math.random() * 4) + 1);
        }
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }*/
        this.state._notificationSystem.addNotification({
            title: (<span><i class="fa fa-user-circle" aria-hidden="true"></i></span>),
            message: (
                <div>
                    <p>{from}</p>
                    <span>{msg}</span> 
                </div>
            ),
            level: 'info',
            position: position,
            autoDismiss: 5,
        });
    }
    // function that creates perfect scroll bar for windows users (it creates a scrollbar that looks like the one from apple devices)
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    componentDidUpdate(e){
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            setTimeout(() => { Ps.update(this.refs.mainPanel) }, 350);
        }
        if(e.history.action === "PUSH"){
            this.refs.mainPanel.scrollTop = 0;
        }
    }
    componentWillMount(){
        if(document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
        return (
            <div className="wrapper notification-front">
                <NotificationSystem ref="notificationSystem" style={style}/>

                <div style={{width: '100%' }} className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref="mainPanel">
                    <Header {...this.props}/>
                        <Switch>
                            {
                                dashRoutes.map((prop,key) => { 
                                    if(prop.collapse){
                                        return prop.views.map((prop,key) => {
                                            let prop_nameArr = ["PatientSearch","Dashboard"]
                                            let propName = prop.name;
                                            // if(prop.name === "Notifications"){
                                              
                                              if(propName.indexOf(prop_nameArr)){ 
                                            
                                                return (
                                                    <Route
                                                        path={prop.path}
                                                        key={key}
                                                        render={routeProps =>
                                                           <prop.component
                                                               {...routeProps}
                                                               handleClick={this.handleNotificationClick}
                                                           />}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <Route path={prop.path} component={prop.component} key={key}/>
                                                );
                                            }
                                        })
                                    } else {
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                            );
                                        else
                                            return (
                                                <Route path={prop.path} component={prop.component} key={key}/>
                                            );
                                    }
                                })
                            }
                        </Switch>
                    <Footer fluid/>
                </div>
            </div>
        );
    }
}

export default Dash;
