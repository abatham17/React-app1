import React, { Component } from 'react';
import {
    Grid, Row, Col, FormGroup, ControlLabel
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { nextVisitAction, holidayListAction } from 'Front/actions/home';
import moment from 'moment';
import{
    next_visit_days
} from 'Front/variables/Variables.jsx';
import Calendar from 'react-calendar';

class NextVisit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            date: this.props.location.state.row.next_visit_date!==null?new Date(this.props.location.state.row.next_visit_date):new Date(),
            numberOfDays:this.calculate_number_of_day(this.props.location.state.row.next_visit_date),
            next_visit_dateError:null,
            holidayList:[],
            formData: {
                id:this.props.location.state.row.id,
                next_visit_date:this.props.location.state.row.next_visit_date!==null?moment(this.props.location.state.row.next_visit_date).format('YYYY-MM-DD'):null,
                patient_id:this.props.location.state.row.pId,
            },
            showProcessing: false,
        };
    }

    componentDidMount() { 
        
        this.props.holidayListAction()    
    } 

    componentWillReceiveProps(nextProps){ 
        
        if (nextProps.isNextVisitError === this.props.isNextVisitError && nextProps.NextVisitMessage && nextProps.NextVisitMessage.status === 'Success' && nextProps.NextVisitMessage.msg && this.state.formData.first_name !== '') { 
            this.props.history.push(`/dashboard`)
        }

        if (nextProps.isNextVisitError !== this.props.isNextVisitError) { 
            if (nextProps.NextVisitMessage.errors) {
                nextProps.NextVisitMessage.errors.map((key, i) => {
                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                    return '';
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
        field['next_visit_date'] = moment(date).format('YYYY-MM-DD');    
        this.setState({formData:field});
    };
    
    handleChange = e => { 
        e.preventDefault(); 
        let field = this.state.formData;
        var new_date = moment(new Date(), "DD-MM-YYYY").add(e.target.value, 'days');
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
            let startDate = moment(new Date()).format("YYYY-MM-DD");
            console.log(startDate);
            let endDate = moment(date).format('YYYY-MM-DD');
            console.log(endDate);
            
            //endDate.diff(startDate, 'days');
            var a = moment(date);
            var b = moment(new Date());

            console.log(a.diff(b, 'days')+1);
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
                let eventDate = moment(list[x].calendarDate).format("YYYY-MM-DD");
                let newDate = moment(date).format("YYYY-MM-DD");           
                if(eventDate === newDate){
                    exit = 1;
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
                let eventDate = moment(list[x].calendarDate).format("YYYY-MM-DD");
                let newDate = moment(date).format("YYYY-MM-DD");           
                if(eventDate === newDate){
                    exit = 1;
                    title = list[x].message;
                }
            }
            if(exit === 1){
                return <span title={title}>{}</span>;
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
                        <button type="button" onClick={this.nextVisit.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
                        </Col>
                    </FormGroup>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {

        HolidayList: state.home.HolidayList,
        isHolidayList: state.home.isHolidayList,
        isHolidayListError: state.home.isHolidayListError,
        
        NextVisitMessage: state.home.NextVisit,
        isNextVisit: state.home.isNextVisit,
        isNextVisitError: state.home.isNextVisitError,        

    }
}
export default withRouter(connect(mapStateToProps, { holidayListAction ,nextVisitAction })(NextVisit));