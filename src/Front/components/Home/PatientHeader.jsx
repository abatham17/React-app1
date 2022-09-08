import React, { Component } from 'react';

class PatientHeader extends Component {
    render() {
        return (
            <div className="title text-left">{this.props.pvDetail.name + "-" + this.props.pvDetail.patientId}&nbsp;&nbsp;&nbsp;&nbsp;|<span>Height: {this.props.pvDetail.height}</span>|<span>Weight: {this.props.pvDetail.weight} </span>|<span>BMI: {this.props.pvDetail.bmi}</span>|<span>Age: {this.props.pvDetail.age}</span>
            </div>          
        );
    }
}

export default PatientHeader;
