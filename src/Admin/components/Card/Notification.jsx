import React, { Component } from 'react';

class Notification extends Component{
    render(){
        return (
            <div className="card card-map">
                <div className="header">
                    <h4 className="title">{this.props.title}</h4>
                </div>
                <div className="content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default Notification;
