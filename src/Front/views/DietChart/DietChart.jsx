import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid, Row, Col,Button
} from 'react-bootstrap';
import Card from 'Front/components/Card/Card.jsx';
import { dietListAction } from 'Front/actions/diet';
import { unitListAction, timeListAction } from 'Front/actions/master';
import { printDietAction } from 'Front/actions/diet.js';
import 'Front/views/DietChart/style.css';
import { DietChartTable } from 'Front/components/DietChartTable/DietChartTable.jsx';

let dietListApi = false;
let timeListApi = false;
let unitListApi = false;
let unitObjData = {};

class DietChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"",
            patient:{},
            calorie:null,
            selectCalorie:null,
            calorieType:null,
            treatmentList:[],
            treatmentType:null,
            dietOption:null,
            mealType:"",
            dietLanguage:"",
            treatmentId:"",
            treatmentName:"",
            dietList:null,
            dietListApi:false,
            options:{},
            timeList:[],
            dietTimePercent:{},
            suggestions:[],
            startTimeDelay:0,
            printHeader:true,
            clinicName:'',
            clinicAddress:'',
            clinicEmail:'',
            clinicPhone:''
        }
    }


    handelSelectChange(name,value){
        let data = {};
        data[name] = value.value;
        this.setState(data);
    }

    handelChange(e,name){
        let data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    getDietList(dietList){
        if(
            dietList &&
            dietList.filter &&
            (dietList.filter.treatmentId === this.props.state.treatmentId) &&
            (dietList.filter.veg === this.props.state.mealType) &&
            (dietList.filter.calorie === this.props.state.selectCalorie)
        ){
            this.createDiet(dietList.data.data);
        }
        else if(!dietListApi){
            let filter = {
                treatmentId:this.props.state.treatmentId,
                veg:this.props.state.mealType,
                calorie:this.props.state.selectCalorie
            };
            this.props.dietListAction(filter);
        }
    }

    createDiet(dietList){
        let lang = this.props.state.dietLanguage;
        let x;
        
        let foods = {};
        for(x in dietList.foods){
            let row = dietList.foods[x];
            
            foods[row._id] = row;
        }

        let foodGroup = {}
        for(x in dietList.food_group){
            let row = dietList.food_group[x];

            let foodText = "";

            if(row.foodType === 'group'){
                let foodArr = [];
                for(let y in row.group){
                    if(foods[row.group[y].foodId]){
                        
                        let foodRow = foods[row.group[y].foodId];
                        let text = foodRow.name[lang]?foodRow.name[lang]:foodRow.name.english;
                        text += " "+row.group[y].qty;
                        let unit = "";
                        if(unitObjData[foodRow.unitId] && unitObjData[foodRow.unitId].name){
                            unit = unitObjData[foodRow.unitId].name[lang]?unitObjData[foodRow.unitId].name[lang]:unitObjData[foodRow.unitId].name.english;
                        }

                        text += " "+unit;

                        let descArr = [];
                        let info = foodRow.info[lang]?foodRow.info[lang]:foodRow.info.english;
                        if(info){
                            descArr.push(info);
                        }

                        let desc1 = foodRow.description[lang]?foodRow.description[lang]:foodRow.description.english;
                        if(desc1){
                            descArr.push(desc1);
                        }

                        let descTxt = "";
                        if(descArr.length){
                            descTxt = "( "+descArr.join(' , ')+")";
                        }

                        text += " "+descTxt;

                        foodArr.push(text);
                    }
                }

                foodText = foodArr.join(' + ');
            }
            else{
                foodText = row.custom[lang]?row.custom[lang]:row.custom.english;
            }
            
            row.foodText = foodText;
            foodGroup[row._id] = row;
        }

        let options = {};
        for(x in dietList.options){
            let row = dietList.options[x];
            if(!options[row.dietTimeId]){
                options[row.dietTimeId] = [];
            }
            
            if(options[row.dietTimeId].length < this.props.state.dietOption){
                if(foodGroup[row.foodGroupId]){
                    options[row.dietTimeId].push(foodGroup[row.foodGroupId]);
                }
            }   
        }
        
        this.setState({options:options},() => {
            if(this.props.timeList && this.props.timeList.data){
                this.createTimeList(this.props.timeList.data);
            }
            else if(!timeListApi){
                this.props.timeListAction();
            }
        });

        dietListApi = true;
    }

    createUnitObj(unitList){
        let unitObj = {};
        for(let x in unitList){
            unitObj[unitList[x]._id] = unitList[x];
        }
        unitObjData = unitObj;
        this.getDietList(this.props.dietList);
        unitListApi = true;
    }

    createTimeList(timeListOld){
        let timeList = [];
        for(let x in timeListOld.data){
            if(this.state.options[timeListOld.data[x]._id]){
                timeList.push(timeListOld.data[x]);
            }
        }
        
        this.setState({timeList});

        let dietTimePercent = {};
        for(let x in timeListOld.plan){
            if(timeListOld.plan[x].treatmentId === this.state.treatmentId){
                dietTimePercent[timeListOld.plan[x].dietTimeId] = timeListOld.plan[x];
            }
        }

        this.setState({dietTimePercent});
        timeListApi = true;
        
        this.setState({lowCalorieFood:timeListOld.lowCalorieFood});
        this.setState({comments:timeListOld.comments});

        let lang = this.state.dietLanguage;
        let suggestions = [];
        for(let x in timeListOld.lowCalorieFood){
            let row = timeListOld.lowCalorieFood[x];
            suggestions.push(row.name[lang]?row.name[lang]:row.name.english);
        }

        for(let x in timeListOld.comments){
            let row = timeListOld.comments[x];
            
            if(row.type.toLowerCase() === this.state.treatmentType.toLowerCase()){
                suggestions.push(row.text[lang]?row.text[lang]:row.text.english);
            }
        }

        this.setState({suggestions});
    }

    // backPage(){
        
    // }

    print(){
        let html = document.getElementById("printable").innerHTML;
        var newWin = window.open('', 'Print-Window');
        newWin.document.open();
        newWin.document.write('<html moznomarginboxes mozdisallowselectionprint><body onload="window.print()"><style>@media print{.page-break	{ display: block; page-break-before: always; } th,td { padding: 5px; vertical-align: middle; border: 1px solid #ddd; } .table { width: 100%; max-width: 100%; border-spacing: 0; border-collapse: collapse;} h1{margin-bottom:5px!important;} .only-print{margin-bottom:10px !important;} }</style>' + html + '</body></html>');
        newWin.document.close();
        setTimeout(function () {
           newWin.close();
        }, 10);
    }

    componentDidMount() {
        dietListApi = false;
        timeListApi = false;
        unitListApi = false;

        this.setState(this.props.state);
        
        if(this.props.unitList && this.props.unitList.data){
            this.createUnitObj(this.props.unitList.data.data);
        }
        else{
            this.props.unitListAction();
        }

        this.setState({printHeader:(localStorage.getItem('diet_print_format')==='yes'?false:true)});
        this.setState({clinicName:localStorage.getItem('clinicName')});
        this.setState({clinicAddress:localStorage.getItem('clinicAddress')});
        this.setState({clinicPhone:localStorage.getItem('clinicPhone')});
        this.setState({clinicEmail:localStorage.getItem('clinicEmail')});

        let _this = this;
        setTimeout(function(){ 
            _this.props.printDietAction(_this.state);
        },500);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.unitList && nextProps.unitList.data && !unitListApi){
            this.createUnitObj(nextProps.unitList.data.data);
        }
        if(nextProps.dietList && nextProps.dietList.data && !dietListApi){
            this.getDietList(nextProps.dietList);
        }
        if(nextProps.timeList && nextProps.timeList.data && !timeListApi){
            this.createTimeList(nextProps.timeList.data);
        }
    }

    first_mealtime(event){
        
    }

    render(){
        return (
            <div>
                <Grid fluid>
                    <Card content={
                        <Row>
                            <Col sm={12}>
                                <div className="no-print" style={{ marginBottom: '15px' }}>
                                    <Button onClick={this.props.backPage.bind(this)} className="btn-fill btn btn-primary">Back</Button>{'  '}
                                    <Button onClick={e=>{this.print()}} className="btn-fill btn btn-primary">Print</Button>
                                    <span style={{ float: 'right', marginTop:'7px' }} className="col-sm-7">
                                        <span className="fmeal_class flash-text">प्रथम आहार</span> @ 
                                            <select name="first_mealtime" id="first_mealtime" onClick={this.first_mealtime(this)}>
                                                <option value="07:00 AM">07:00 AM</option>
                                                <option value="08:00 AM">08:00 AM</option>
                                                <option value="09:00 AM" selected="selected">09:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                            </select>                                        
                                    </span>
                                </div>
                                <DietChartTable data={this.state} />
                                <div className="no-print">
                                    <Button className="pull-right" onClick={this.props.backPage.bind(this)}>Back</Button>
                                </div>
                            </Col>
                        </Row>
                    } />
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dietList: state.diet.dietList,
        unitList: state.master.unitList,
        timeList: state.master.timeList
    }
}
export default withRouter(connect(mapStateToProps,{dietListAction,unitListAction,timeListAction,printDietAction})(DietChart));