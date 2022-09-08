import React, { Component } from 'react';
import 'Front/views/DietChart/style.css';

export class DietChartTable extends Component {


    render(){
        const state = this.props.data;

        let options = state.options;
        
        let lang = state.dietLanguage;

        function timeName(cell,row){
            let txt = "<div>"+cell[lang]?cell[lang]:cell.english+"</div>";

            if(state){
                if(state.dietTimePercent[row._id]){
                    txt += "<div>"+state.dietTimePercent[row._id].time+"</div>";

                    let calorie = state.dietTimePercent[row._id].percent*state.selectCalorie/100;

                    let orangePercent = state.dietTimePercent[row._id].percent;

                    let style = "background: -webkit-linear-gradient(left, orange "+orangePercent+"%, #dedede 0%);";
                    style += "background: -moz-linear-gradient(left, orange "+orangePercent+"%, #dedede 0%);";
                    style += "background: -ms-linear-gradient(left, orange "+orangePercent+"%, #dedede 0%);";
                    style += "background: linear-gradient(left, orange "+orangePercent+"%, #dedede 0%);";

                    txt += "<div style='"+style+"'>";
                    txt += calorie;
                    txt +=" KCAL</div>";
                }
            }
            
            return <div dangerouslySetInnerHTML={{__html: txt}} />;
        }

        function dietChatShow(cell){
            let dietTxt = [];
            for(let x in options[cell]){
                let row = "<li>";
                row += options[cell][x].foodText;
                row += "</li>";
                dietTxt.push(row);
            }
            
            return <ul dangerouslySetInnerHTML={{__html: dietTxt.join(" OR ")}} />;
        }

        return (
            <div id="printable">
                <div className="only-print" hidden={state.printHeader}>
                    <h1><center><b>{state.clinicName}</b></center></h1>
                    <div><center><b>{state.clinicAddress} . Ph. : {state.clinicPhone} · {state.clinicEmail}</b></center></div>
                </div>
                <table className="table">
                    <tr>
                        <th style={{width:"10%"}}>Name</th>
                        <th style={{ width: '90%' }}>{state.patient.name}</th>
                    </tr>
                </table>
                <table className="table">
                    <tr>
                        <th style={{ width: '10%' }}>Time</th>
                        <th style={{ width: '45%' }}>{state.treatmentName}</th>
                        <th style={{ width: '45%' }}>{state.selectCalorie} KCAL</th>
                    </tr>
                </table>
                <table className="table">
                    {state.timeList.map(row=>{
                        return <tr>
                            <td style={{width:"10%"}}>{timeName(row.name,row)}</td>
                            <td style={{ width: '90%' }}>{dietChatShow(row._id)}</td>
                        </tr>
                    })}
                </table>
                <ul>
                    {state.suggestions.map(row =>{
                        return <li>{row}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default DietChartTable;