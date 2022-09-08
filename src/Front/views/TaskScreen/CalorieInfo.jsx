import React, { Component } from 'react';
import {
    Modal, Table
} from 'react-bootstrap';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import PatientHeader from 'Front/components/Home/PatientHeader.jsx';

class CalorieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calorieModal: false,
        };
    }

    render() {
        const bmi = this.props.pvDetail.bmi; 
        const c1 = (bmi >= 19 && bmi <= 27)?'bg-yellow':''; 
        const c2 = (bmi > 27)?'bg-yellow':''; 
        const c3 = (bmi < 19)?'bg-yellow':''; 
        return (
            <div>
                <Button className="btn-fill btn btn-warning pull-left" onClick={() => this.setState({ calorieModal: true })}>Calorie
            </Button>
                <Modal show={this.state.calorieModal} onHide={() => this.setState({ calorieModal: false })} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg"><PatientHeader pvDetail={this.props.pvDetail} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Calorie">
                        <Table className="table table-striped table-hover table-bordered">
                            <thead className="flip-content bordered-palegreen">
                                <tr>
                                    <th>Age (आयु)</th>
                                    <th>Height (ऊंचाई)</th>
                                    <th>Weight (वर्तमान वजन)</th>
                                    <th>BMI</th>
                                    <th>IBW (आदर्श वजन)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.pvDetail.age}</td>
                                    <td>{this.props.pvDetail.height}</td>
                                    <td>{this.props.pvDetail.weight}</td>
                                    <td>{this.props.pvDetail.bmi}</td>
                                    <td className="bg-yellow">{this.props.pvDetail.ibw}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="table table-striped table-hover table-bordered">
                            <thead className="flip-content bordered-palegreen">
                                <tr><th>Maintain Weight </th>
                                    <th>Loose Weight </th>
                                    <th>Gain Weight </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={c1}>{this.props.pvDetail.c1}</td>
                                    <td className={c2}>{this.props.pvDetail.c2}</td>
                                    <td className={c3}>{this.props.pvDetail.c3}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button simple onClick={() => this.setState({ calorieModal: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CalorieInfo;
