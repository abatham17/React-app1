import React, { Component } from 'react';

class PatientHeader extends Component{
    render(){
        return (<h4 className="title">{ this.props.name + "-" + this.props.patientId + " | H:" + this.props.height + " | W:" + this.props.weight + " | BMI:" + this.props.bmi + " | Age:" + this.props.age}</h4>
        );
    }
}

export default PatientHeader;
