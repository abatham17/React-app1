import React, { Component } from 'react';
import {
    Grid, Row, Col, FormGroup, ControlLabel
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { nextVisitAction, holidayListAction} from 'Front/actions/home';
import moment from 'moment';
import{
    next_visit_days
} from 'Front/variables/Variables.jsx';
import Calendar from 'react-calendar';
import { appConstants } from 'Front/_constants/app.constants.js';

class NextVisit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            date: this.props.nextVisitData.next_visit_date!==null?new Date(this.props.nextVisitData.next_visit_date):new Date(),
            numberOfDays:this.calculate_number_of_day(this.props.nextVisitData.next_visit_date),
            next_visit_dateError:null,
            holidayList:[],
            formData: {
                id:this.props.nextVisitData.id,
                next_visit_date:this.props.nextVisitData.next_visit_date!==null?moment(this.props.nextVisitData.next_visit_date).format('YYYY-MM-DD'):null,
                patient_id:this.props.nextVisitData.pId,
            },
            showProcessing: false,
        };
        
    }

    componentDidMount() { 
        
        if(this.props.HolidayList){ 
            this.setState({ holidayList:this.props.HolidayList.list })

        }else{
            this.props.holidayListAction() 
        }   
    } 

    componentWillReceiveProps(nextProps){ 
        
        if (nextProps.isNextVisit !== this.props.isNextVisit && nextProps.NextVisitMessage && nextProps.NextVisitMessage.status === 'Success' && nextProps.NextVisitMessage.msg && this.state.formData.first_name !== '') { 
            this.props.onDismissNextVisit();
            setTimeout(function(){ 

                let params = {
                  clinicId:localStorage.getItem('clinicId'),
              } 
              
              appConstants.socket.emit('addPatient', params);

           },1000);
        }

        if (nextProps.isNextVisitError !== this.props.isNextVisitError) { 
            if (nextProps.NextVisitMessage.errors) {
                nextProps.NextVisitMessage.errors.map((key, i) => {

                    return this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }
        }
        
        if (nextProps.isHolidayList !== this.props.isHolidayList) {  
            this.setState({ holidayList:nextProps.HolidayList.list })
        }
    }

    onChange = date => {        
        this.setState({ date });
        let field = this.state.formData;
        if(date.getDay() === 0){
            var new_date = moment(date, "DD-MM-YYYY").add(2, 'days');
            field['next_visit_date'] = moment(new_date).format('YYYY-MM-DD');  
        }else{
            field['next_visit_date'] = moment(date).format('YYYY-MM-DD');    
            this.setState({formData:field});
        }
    };
    
    handleChange = e => { 
        e.preventDefault(); 
        let field = this.state.formData;
        var new_date = moment(new Date(), "DD-MM-YYYY").add(e.target.value, 'days');
        if(new Date(new_date).getDay() === 0){
            new_date = moment(new_date, "DD-MM-YYYY").add(2, 'days');
        }
        field['next_visit_date'] = moment(new_date).format('YYYY-MM-DD');     
        this.setState({formData:field});
        this.setState({date:new Date(new_date)});
    };

    nextVisit(evt){ 
        
        evt.preventDefault();
          this.setState({ showProcessing: true });
          this.props.nextVisitAction(this.state.formData);   
    }

    calculate_number_of_day(date=null){
        if(date !== null){ 
            
            var a = moment(date);
            var b = moment(new Date());

            return a.diff(b, 'days')+1;
        }else{ return 0; }

    }

    addEventClass(date, view){ 
        let list = this.state.holidayList;
        
        if(date.getDay() === 0){
            return 'red-bg';
        }else{ 
            let exit = 0;
            for (let x in list) { 
                let dates = list[x].calendarDate;
                if(dates[0]){
                    for (let j in dates) { 
                        let eventDate = moment(dates[j]).format("YYYY-MM-DD");
                        let newDate = moment(date).format("YYYY-MM-DD");           
                        if(eventDate === newDate){
                            exit = 1;
                        }
                    }
                }
            }
            if(exit === 1){
                return 'red-bg';
            }
            else{
                return 'gray';
            }
        }
    }

    addTitle(date, view){
        let list = this.state.holidayList;
        
        if(date.getDay() === 0){
            return '';
        }else{ 
            let exit = 0;
            let title = '';
            for (let x in list) { 
                let dates = list[x].calendarDate;
                if(dates[0]){
                    for (let j in dates) { 
                        let eventDate = moment(dates[j]).format("YYYY-MM-DD");
                        let newDate = moment(date).format("YYYY-MM-DD");           
                        if(eventDate === newDate){
                            exit = 1;
                            title = list[x].message;
                        }
                    }
                }
            }
            
            if(exit === 1){
                return <span title={title}>...</span>;
            }
            else{
                return '';
            }
        }
    }

    render() {
        const numberOfDays = this.state.numberOfDays;
        console.log(this.props);
        return (
            <div className="main-content" style={{ padding: '15px 15px' }}>
                <Grid fluid>
                    <Row>  
                        <Col sm={6}>
                        <Calendar
                                calendarType={"US"}
                                onChange={this.onChange}
                                minDate={new Date()}
                                value={this.state.date}
                                tileClassName={({ date, view }) => this.addEventClass( date, view )}
                                tileContent={({ date, view }) => this.addTitle( date, view )}
                            />
                            {this.state.next_visit_dateError}
                        </Col>
                        <Col sm={6}>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={12}>
                                Next Visit Date
                            </Col>
                            <Col sm={12}>

                                <select className="form-control" name="title" value={this.state.value} onChange={(event) => this.handleChange(event)}>
                                        <option value=""> Select </option>
                                        {next_visit_days.map(function (item) {   
                                            let selected = item.value===numberOfDays?'selected':'';
                                            return <option key={item.value} value={item.value} selected={selected}>{item.label}</option>
                                        })}
                                    </select>

                                    <h4>{this.state.formData.next_visit_date!==null?moment(this.state.formData.next_visit_date).format('DD-MM-YYYY'):''}</h4>
                            </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>  
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4} smOffset={2}></Col>
                        <Col sm={6}>
                        <button type="button" onClick={this.nextVisit.bind(this)} disabled={this.state.formData.next_visit_date===''?true:false} className="btn-fill btn-wd btn btn-info">Save</button>
                        </Col>
                    </FormGroup>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
   
    return {

        HolidayList: state.home.HolidayList,
        isHolidayList: state.home.isHolidayList,
        isHolidayListError: state.home.isHolidayListError,
        
        NextVisitMessage: state.home.NextVisit,
        isNextVisit: state.home.isNextVisit,
        isNextVisitError: state.home.isNextVisitError,

    }
}
export default withRouter(connect(mapStateToProps, { nextVisitAction, holidayListAction })(NextVisit));