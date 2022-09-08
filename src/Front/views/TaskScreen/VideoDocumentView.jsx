import React, { Component } from 'react';
import { Modal
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import * as PF from "Front/views/Home/PublicFunction.jsx"

class VideoDocumentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ViewModal: this.props.ViewModal,
            patientName: this.props.pvDetail.name,
            patientId: this.props.pvDetail.patientId,
            id:this.props.id,
            type:this.props.type,
            link:this.props.link,
            autoplay:false,
            icon:(this.props.type === 'image'?'fa fa-image pull-right':'fa fa-youtube-play pull-right')
        };
    }

    handleView(type, link){
        
        if(type==='image'){
            return (<img alt="" style={{width:'100%'}} src={PF.baseUrl("public/uploads/"+link)}/>);
        }else{
            return (<video controls controlsList="nodownload" autoPlay>
            <source src={PF.baseUrl("public/uploads/"+link)} type="video/mp4"/>
            </video>
            );
        }
    }

    viewDocument(e){
        this.setState({ ViewModal: true});
        if(this.props.status === 1){
            this.props.ChangeStatus(this.state.id,'document');
        }
    }

    render() {
        if(this.props.name !== ''){
            return (
                <div className="no-padding pull-left col-sm-12">
                    <div className="no-padding col-sm-12" onClick={e => { this.viewDocument(e); }}>
                    {this.props.name}
                    <i className={this.state.icon}></i>
                    </div>
                    <Modal show={this.state.ViewModal} onHide={() => this.setState({ ViewModal: false })} dialogClassName="modal-lg">
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">({this.state.patientName} - {this.state.patientId})</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="Knowledge-Share">
                        {this.handleView(this.state.type,this.state.link)}                                    
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }else{
            return (
                <div className="pull-right" >
                    <i className={this.state.icon} onClick={e => { this.viewDocument(e); }}></i>
                    <Modal show={this.state.ViewModal} onHide={() => this.setState({ ViewModal: false })} dialogClassName="modal-lg">
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">({this.state.patientName} - {this.state.patientId})</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="Knowledge-Share">
                        {this.handleView(this.state.type,this.state.link)}                                    
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
}

export default withRouter(VideoDocumentView);

