import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import history from '../../routes/history';

// dinamically create app routes
import appRoutes from 'Front/routes/app.jsx';
import { appConstants } from 'Front/_constants/app.constants.js';
const accessToken = localStorage.getItem('token');

 

appConstants.socket.on('connect', function(){

   const params = {
       userId:localStorage.getItem('_id'),
       clinicId:localStorage.getItem('clinicId'),
       userType:localStorage.getItem('userType'),
   } 
   appConstants.socket.emit('addClinic', params);

});


class App extends Component{
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }    
    }

    componentWillMount(){
        if (!accessToken) {
            history.replace('/login');
        }
    }

    render(){
  

        return (
            <Switch>
                {
                    appRoutes.map((prop,key) => {
                        return (
                            <Route path={prop.path} component={prop.component} key={key}/>
                        );
                    })
                }

                {accessToken &&
                 <Redirect from="/" to="/dashboard" />
                }


            </Switch>
        );
    }
}

export default App;
