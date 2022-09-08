import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid, Row, Col, FormGroup, ControlLabel,Button, Panel, Nav, NavItem, Tab
} from 'react-bootstrap';
import Radio from 'Front/elements/CustomRadio/CustomRadio.jsx';
import Card from 'Front/components/Card/Card.jsx';
import {getCalorieType} from 'Front/views/Home/PublicFunction.jsx';
import {treatmentWithTypesAction} from 'Front/actions/master';
import DietChat from 'Front/views/DietChart/DietChart';
import { appConstants } from 'Front/_constants/app.constants.js';

class Diet extends Component {

    constructor(props) {
        super(props);
        this.state ={
            title:"",
            patient:this.props.patient,
            calorie:null,
            selectCalorie:800,
            calorieType:"Maintain",
            treatmentList:[],
            treatmentType:"Diabetic",
            dietOption:2,
            mealType:'veg-s',
            dietLanguage:"hindi",
            treatmentId:"",
            treatmentName:"",
            dietChatModal:false
        }
        this.calorieOptions = [];
        this.backPage = this.backPage.bind(this);
    }

    setCalorieOptions(){
        for(let x=800;x<=3000;x+=200){
            this.calorieOptions.push(x);
        }
    }

    calorie(){
        let calorieType = getCalorieType(this.state.patient.height,this.state.patient.weight,this.state.patient.gender);

        if(calorieType.calorie){
            let selectCalorie = Math.round(calorieType.calorie/200)*200;

            this.setState({
                selectCalorie,
                calorie:calorieType.calorie,
                calorieType:calorieType.type
            });
        }
        
    }

    handelChange(e,name){
        let data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    handelChangeTeatment(id,name,treatmentType){
        this.setState({ 
            treatmentId:id,
            treatmentName:name
        });
        this.setState({treatmentType});
    }

    dietChart(){        
        let pId = this.state.patient.pId;
        this.setState({dietChatModal:true});
        setTimeout(function(){  
            let params = {
                clinicId:localStorage.getItem('clinicId'),
                visit_id:pId,
            }                    
            appConstants.socket.emit('updateTaskScreen', params);

    },2000);
    }

    backPage(){
        this.setState({dietChatModal:false});
    }

    componentDidMount() {
        // this.setTitle();
        this.setCalorieOptions();
        this.calorie();
        
        if(this.props.treatmentWithTypeList){
            this.setState({
                treatmentList:this.props.treatmentWithTypeList.data
            });
        }
        else{
            this.props.treatmentWithTypesAction();
        }    
        
        if(this.props.patient){ 
            if(this.props.patient.lastDiet && this.props.patient.lastDiet['0']){ 
                let lastDiet = this.props.patient.lastDiet['0'];
                let setState = {
                    patient:this.props.patient, 
                    treatmentType:lastDiet.treatmentType,
                    dietOption:lastDiet.optionCount,
                    mealType:lastDiet.dietType,
                    dietLanguage:lastDiet.dietLanguage,
                    treatmentId:lastDiet.treatmentId,
                    treatmentName:lastDiet.treatmentName,
                    selectCalorie:lastDiet.calorie,
                };
                this.setState(setState);
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.treatmentWithTypeList){
            this.setState({
                treatmentList:nextProps.treatmentWithTypeList.data
            });
        }
        
    }

    render(){
        console.log(this.props);
        return (
            <div className="main-content" style={{ padding: '0px 0px' }}>
                {!this.state.dietChatModal && 
                <Grid fluid>
                    <Card
                        // title={this.state.title}
                        content={
                            <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <Row>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Calorie
                                        </Col>
                                        <Col sm={2}>
                                            <select
                                                className="form-control"
                                                onChange={e=>{this.handelChange(e,'selectCalorie')}}
                                                name='selectCalorie'
                                                value={this.state.selectCalorie}
                                                >
                                                {this.calorieOptions.map(value =>
                                                    <option value={value} key={value}>{value}</option>
                                                )}
                                            </select>
                                        </Col>
                                        <Col sm={2} style={{backgroundColor:"yellow"}}>
                                            <b>
                                            {this.state.calorie}
                                            <br/>
                                            {this.state.calorieType} Wt.
                                            </b>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Tab.Container 
                                            id="tabs-with-dropdown" 
                                            activeKey={this.state.treatmentType}
                                            onSelect={key => this.setState({ treatmentType:key })}
                                            >
                                            <Panel header={
                                                <Row>
                                                    <Col sm={9}>
                                                        <Nav bsStyle="tabs">
                                                            <NavItem eventKey="Diabetic">
                                                                Diabetic Diet
                                                    </NavItem>
                                                            <NavItem eventKey="Non diabetic">
                                                                Non Diabetic Diet
                                                    </NavItem>
                                                        </Nav>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Button className="btn-fill btn btn-warning pull-right" onClick={() => this.setState({ treatmentId: '',treatmentName: '' })}>Cancel Diet</Button>
                                                    </Col>
                                                </Row>
                                            } eventKey="3">
                                                <Tab.Content animation className="task-diet">
                                                    <Tab.Pane eventKey="Diabetic">
                                                        {this.state.treatmentList.map(value =>
                                                            <div key={value.name}>
                                                                {value.type==="Diabetic" &&
                                                                    <Col sm={6} className="padding-5">
                                                                        <legend>{value.name}</legend>
                                                                        {value.treatments.map(treatment =>
                                                                            <Radio
                                                                                number={"Diet-"+treatment._id}
                                                                                label={treatment.name}
                                                                                key={treatment._id}
                                                                                name="treatmentId"
                                                                                option={treatment._id}
                                                                                onClick={e=>this.handelChangeTeatment(treatment._id,treatment.name,value.type)}
                                                                                checked={treatment._id===this.state.treatmentId}
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                }
                                                            </div>
                                                        )}
                                                    </Tab.Pane>
                                                </Tab.Content>
                                                <Tab.Content animation className="task-diet">
                                                    <Tab.Pane eventKey="Non diabetic">
                                                        {this.state.treatmentList.map(value =>
                                                            <div key={value.name}>
                                                                {value.type==="Non diabetic" &&
                                                                    <Col sm={6} className="padding-5">
                                                                        <legend>{value.name}</legend>
                                                                        {value.treatments.map(treatment =>
                                                                            <Radio
                                                                                number={"Diet-"+treatment._id}
                                                                                key={treatment._id}
                                                                                label={treatment.name}
                                                                                name="treatmentId"
                                                                                option={treatment._id}
                                                                                onClick={e=>this.handelChangeTeatment(treatment._id,treatment.name,value.type)}
                                                                                checked={treatment._id===this.state.treatmentId}
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                }
                                                            </div>
                                                        )}
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Panel>

                                        </Tab.Container>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="no-padding">
                                            <Col md={4} style={{fontWeight:"bold"}} className="no-padding text-right padding-top-10">Diet Option</Col>
                                            <Col md={8}>
                                                <select 
                                                    className="form-control"
                                                    onChange={e=>{this.handelChange(e,'dietOption')}}
                                                    name='dietOption'
                                                    value={this.state.dietOption}
                                                    >
                                                    <option value="3">3 Option</option>
                                                    <option value="2" selected>2 Option</option>
                                                    <option value="1">1 Option</option>
                                                </select>
                                            </Col>
                                        </Col>

                                        <Col md={4} className="no-padding">
                                            <Col md={4} className="no-padding text-right padding-top-10" style={{fontWeight:"bold"}}>Meal Type</Col>
                                            <Col md={8}>
                                                <select 
                                                    className="form-control"
                                                    onChange={e=>{this.handelChange(e,'mealType')}}
                                                    name='mealType'
                                                    value={this.state.mealType}
                                                    >
                                                    <option value="veg-s">Vegetarian S</option>
                                                    <option value="veg-l">Vegetarian L</option>
                                                    <option value="veg-h">Vegetarian H</option>
                                                    <option value="non-veg-s">Non Vegetarian S</option>
                                                    <option value="non-veg-l">Non Vegetarian L</option>
                                                    <option value="non-veg-h">Non Vegetarian H</option>
                                                </select>
                                            </Col>
                                        </Col>

                                        <Col md={4} className="no-padding">
                                            <Col md={4} style={{fontWeight:"bold"}} className="no-padding text-right padding-top-10">Diet Language</Col>
                                            <Col md={8}>
                                                <select 
                                                    className="form-control"
                                                    onChange={e=>{this.handelChange(e,'dietLanguage')}}
                                                    name='dietLanguage'
                                                    value={this.state.dietLanguage}
                                                    >
                                                    <option value="hindi">Hindi</option>
                                                    <option value="english">English</option>
                                                </select>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row className="diet-chart-btn-div">
                                       
                                            <Button onClick={e=>{this.dietChart()}} disabled={this.state.treatmentId?false:true} className="btn-fill btn btn-primary">Diet chart</Button>
                                        
                                    </Row>
                                </FormGroup>
                            </Col>
                            </Row>
                        }
                    />
                </Grid>
                }
                { this.state.dietChatModal &&
                    <DietChat state={this.state} backPage={this.backPage} />
                }
                {/* DietChat model */}
                {/* <Modal className="pa-task-screen" show={this.state.dietChatModal} onHide={() => this.setState({ dietChatModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">{this.state.dietTitle}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        <Row>
                            <Col md={12}>
                                <DietChat state={this.state}/>
                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal> */}
                {/* /DietChat model */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        treatmentWithTypeList: state.master.treatmentWithTypeList,
    }
}
export default withRouter(connect(mapStateToProps,{ treatmentWithTypesAction})(Diet));