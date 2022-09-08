import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col,Form,ControlLabel,FormControl,FormGroup
} from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { updateTermconditionAction } from 'Admin/actions/master';
import { termconditionListAction } from 'Admin/actions/master';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';





// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');
let Validator = require('validatorjs');



let rules = {
    Name: 'required',
    description: 'required',
};
let mess = {
  required: 'This field is required',
  alpha: 'This field may only contain letters',
  numeric: 'This field must be a number',
  email: 'This field must be a valid email address.',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class UpdateTermcondition extends Component{

    constructor(props){
        super(props);
        this.state = {
          cardHidden: true,
          showModal: false,
          formArr:[],
          formData:{    
            term_condition:'',
          },
          isLogin:true,
        }
    }

      UpdateTermcondition(evt){
        evt.preventDefault();
            this.props.updateTermconditionAction(this.state.formData);
      }
    

      handleChange(e) {
        let formData = this.state.formData; 
        formData['term_condition'] = e;
        this.setState({formData: formData});
      }
      componentDidMount(){
        this.props.termconditionListAction(this.state.formData);
    }

      componentWillReceiveProps(nextProps){
       

        if(nextProps.UpdateTermcondition && nextProps.UpdateTermcondition.status){ 
                this.props.handleClick('success',nextProps.UpdateTermcondition.status)

        } 
    }
      render(){
        var _quillModules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ]
           
          };

        var _quillFormats = ["header",
            "bold", "italic", "underline", "strike", "blockquote",
            "list", "bullet", "indent",
            "link", "image"
          ];

        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Update Term & Condition</legend>}
                                content={
                                    <Form horizontal>
                                        
                                        <fieldset>
                                            <FormGroup>
                                                <Col sm={12}>
                                                    <Row>
                                                        <Col md={6}>
                                                        <ControlLabel>Name<span className="star">*</span></ControlLabel>
                                                        <ReactQuill
                                        //onChange={this.handleChange.bind(this,"term_condition")}
                                        onChange={e => { this.handleChange(e);}}
                                        value={this.state.formData.term_condition}
                                        name="term_condition"
                                        theme='snow'
                                        modules={_quillModules}
                                        formats={_quillFormats}
                                        toolbar={false} // Let Quill manage toolbar
                                        bounds={'._quill'}
                                    />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </FormGroup> 
                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}></Col>
                                            <Col sm={6}>
                                                <button type="button" onClick={this.UpdateTermcondition.bind(this)}  className="btn-fill btn-wd btn btn-info">Save</button>
                                            </Col>
                                        </FormGroup>
                                        </fieldset>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    msg: state.master.message,
    UpdateTermcondition:state.master.UpdateTermcondition, 
    isUpdateTermcondition: state.master.isUpdateTermcondition,
    isUpdateTermconditionError: state.master.isUpdateTermconditionError,

    TermconditionList:state.master.TermconditionList, 
    isTermconditionList: state.master.isTermconditionList,
    isTermconditionListError: state.master.isTermconditionListError,

  }
}
export default withRouter(connect(mapStateToProps, { updateTermconditionAction, termconditionListAction } )(UpdateTermcondition));
