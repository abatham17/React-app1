import React, { Component } from 'react';

import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
class ColorNotations extends Component{

    constructor(props){
        super(props);
        this.state = {          
        }
       
    }
    
    render() {

        return (
            <div className="main-content">
           
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <h4 className="notation-title">Color Notations</h4>
                            
                            <Card
                                
                                content={
                                    <Row>
                                    <Col md={3} xs={12} sm={12}>                                                                              
                                        <div className="card">
                                            <div className="header notations-title">
                                               DOCUMENTS / DIET
                                            </div>
                                            <div className="content notation-Col">
                                                                        
                                                    <p><span className="dot_red"></span> Task advised from Doctor - Pending</p>
                                                    <p><span className="dot_black"></span> Shared by Doctor</p>
                                                    <p><span className="dot_green"></span> Task advised from Doctor - Completed</p>
                                                    <p><span className="dot_pink"></span> Shared and task given to Dietician</p>
                                                    <p><span className="dot_blue"></span> Shared by Dietician</p>
                                                
                                            </div>
                                        </div>                                        
                                    </Col>
                                    <Col md={3} xs={12} sm={12}>
                                        <div className="card">
                                            <div className="header notations-title">
                                               DOCTOR ASSIGNED TASK
                                            </div>
                                            <div className="content notation-Col">
                                                 <p><span className="dot_red"></span> Task advised from Doctor - Pending</p>
                                                 <p><span className="dot_green"></span> Task advised from Doctor - Completed</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={12} sm={12}>
                                        <div className="card">
                                            <div className="header notations-title">
                                               PATIENT EXIT
                                            </div>
                                            <div className="content notation-Col">
                                                <p><span className="dot_black"></span> Patient Out by Doctor</p>
                                                <p><span className="dot_blue"></span> Patient Out by Dietician</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={3} xs={12} sm={12}>
                                        <div className="card">
                                            <div className="header notations-title">
                                               CALENDER
                                            </div>
                                            <div className="content notation-Col">
                                                <p><span className="dot_red"></span> Doctor on leave/ Clinic Holiday</p>
                                                <p><span className="dot_blue"></span> Other Message</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
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

  }
}
export default withRouter(connect(mapStateToProps, { } )(ColorNotations));
