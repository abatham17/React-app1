import React, { Component } from 'react';
import {
    Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import moment from 'moment';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { educatorMsgListAction } from 'Front/actions/home';
import { uploadFileAction, uploadMultiFileAction } from 'Front/actions/master';
import { addFaqAction, addKnowledgeAction, addClinicLinkAction, addEducatorMessageAction } from 'Front/actions/settings';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { categoryListAction } from 'Front/actions/home';

class ManageRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            patient_idError:null,
            titleError:null,
            first_nameError:null,
            last_nameError:null,
            genderError:"",
            dobError:null,
            ageError:null,
            emailError:null,
            heightError:null,
            weightError:null,
            cityError:null,
            remarkError:null,
            formData: {
                faqItems:[{ question:{ english:"", hindi:"" }, answer:{ english:"", hindi:"" }}],
                mediaItems:[{ title:"", category:{ id:"", name:"" }, file:""}],
                clinicItems:[{ name:"", link:"", description:"", file:""}],
                educatorItems:[{ name:"", description:"" }],
                educatorMessage:[],
                faqfile:''
            },
            showProcessing: false,
             radio: "1",
            radioVariant: "1",
            knowledgeModal: false,
            addFaq:false,
            addVideoDocument:false,
            addMyClinic:false,
            addMyEducatorMessage:false,
            manageRequestTitle:'',
            educator_msg_list:[],
            alert: null,
            multipleSelect: [null],
            categoryList: [],
            checkboxOptions:[],
            msg:"This field is required",
            formValidation:{
              faqfile:false,
              faqItems:[{qEng:true,qHindi:true,aEng:true,aHindi:true}], 
              mediaItems:[{title:true,category:true,file:true}], 
              clinicItems:[{ name:true, link:true, description:true, file:true}], 
              educatorItems:[{ name:true, description:true }], 
              }
        };
        this.handleDob = this.handleDob.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
      
    }
    
    componentDidMount() {
       this.props.educatorMsgListAction(this.state);
       this.props.categoryListAction(this.state);   
    }
    
    componentWillReceiveProps(nextProps){ 

        if(nextProps.isEducatorMsgList !== this.props.isEducatorMsgList){ 
            this.setState({ educator_msg_list:nextProps.EducatorMsgList.messageList });
        }

        if(nextProps.isUploadFile !== this.props.isUploadFile){
            
            const params = {
                file: nextProps.uploadFile.file_name,
                faq_data: this.state.formData.faqItems
            }

            this.props.addFaqAction(params);

        }


        if(nextProps.isMultiUploadFile !== this.props.isMultiUploadFile){
            
          
            
            let formData = this.state.formData;

            if(this.state.addVideoDocument === true){
         
                nextProps.MultiUploadFile.file_names.map((key,i) => {

                   formData['mediaItems'][i].file = key;
                   return '';

                })

                this.setState({formData:formData});
                
                const params = {
                    knowledge_data : this.state.formData.mediaItems
                }
                
                this.props.addKnowledgeAction(params) 

            }else if(this.state.addMyClinic === true){
                
                nextProps.MultiUploadFile.file_names.map((key,i) => {

                   formData['clinicItems'][i].file = key;
                   return '';

                })

                this.setState({formData:formData});
                
                const params = {
                    clinic_link_data : this.state.formData.clinicItems
                }
                
                this.props.addClinicLinkAction(params) 
            }
        }

         if(nextProps.isAddEducatorMsg !== this.props.isAddEducatorMsg){
            this.successAlert();
         }

         if(nextProps.isAddClinicLink !== this.props.isAddClinicLink){
            this.successAlert();
         }

         if(nextProps.isAddFaq !== this.props.isAddFaq){
            this.successAlert();
         }

         if(nextProps.isAddKnowledge !== this.props.isAddKnowledge){
            this.successAlert();
         }

         if (nextProps.isCategoryList !== this.props.isCategoryList) {

            this.setState({ categoryList: nextProps.CategoryList.data.data });

        }
        
      
    }

    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;        

        if(e.target.name === 'age'){ 
           // var today = new Date();
            field['dob']  = moment().subtract(e.target.value, 'years');//(today.getFullYear()-e.target.value) + '-' + (today.getMonth() + 1) + '-' + today.getDate();   
                  
        }

        this.setState({formData:field});
         
    };

    handleFileChange = e => {
     e.preventDefault();
     let formData = this.state.formData;
     let formValidation = this.state.formValidation;
     formData['faqfile']  = e.target.files[0];
     formValidation['faqfile']  = false;
     this.setState({formData:formData,formValidation:formValidation})
    }

    handleDob(date){ 
        date = new Date(date);
        let field = this.state.formData;        
        field['dob']  = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        field['age'] = ''; 
        this.setState({formData:field});
    }


    addMoreField(e,type){
        e.preventDefault();

        let formData = this.state.formData;
        let formValidation = this.state.formValidation;
        if(type === 'faq'){
             formData['faqItems'].push({ question:{ english:"", hindi:"" }, answer:{ english:"", hindi:"" } });
             formValidation['faqItems'].push({qEng:true,qHindi:true,aEng:true,aHindi:true});
        }else if(type === 'document'){
             formData['mediaItems'].push({ title:"", category:{ id:"", name:"" }, file:""});
             formValidation['mediaItems'].push({title:true,category:true,file:true});
        }else if(type === 'clinic'){
             formData['clinicItems'].push({ name:"", link:"", description:"", file:""});
             formValidation['clinicItems'].push({ name:true, link:true, description:true, file:true});
        }else if(type === 'educator'){
             formData['educatorItems'].push({ name:"", description:"" });
             formValidation['educatorItems'].push({ name:true, description:true });
        }
        

        this.setState({formData:formData,formValidation:formValidation}); 
    }

    removeField(e,idx,type){
       e.preventDefault();
       let faqItems = this.state.formData
       let formValidation = this.state.formValidation
       
       if(type === 'removeFaq'){
         delete faqItems.faqItems[idx];
         delete formValidation.faqItems[idx];
       }else if(type === 'removeDocument'){
         delete faqItems.mediaItems[idx]; 
         delete formValidation.mediaItems[idx];
       }else if(type === 'removeClinic'){
         delete faqItems.clinicItems[idx]; 
         delete formValidation.clinicItems[idx];
       }else if(type === 'removeEducator'){
         delete faqItems.educatorItems[idx]; 
         delete formValidation.educatorItems[idx];
       }
        

        this.setState({
          formData:faqItems,
          formValidation:formValidation
        });     
    }

    manageBox(action){
        let formData = this.state.formData;
        formData['faqItems'] = [{
                question:{
                english:"",
                hindi:""
                },
                answer:{
                english:"",
                hindi:""
                }
                }];

        if(action === 'addFaq')
        this.setState({ knowledgeModal: true , addFaq: true, addVideoDocument: false, addMyClinic: false, addMyEducatorMessage: false, manageRequestTitle: 'FAQ', formData: formData })
        else if(action === 'addVideoDocument')
        this.setState({ knowledgeModal: true , addFaq: false, addVideoDocument: true, addMyClinic: false, addMyEducatorMessage: false, manageRequestTitle: 'Videos & Documents', formData: formData })    
        else if(action === 'addMyClinic')
        this.setState({ knowledgeModal: true , addFaq: false, addVideoDocument: false, addMyClinic: true, addMyEducatorMessage: false, manageRequestTitle: 'General', formData: formData })    
        else if(action === 'addMyEducatorMessage')
        this.setState({ knowledgeModal: true , addFaq: false, addVideoDocument: false, addMyClinic: false, addMyEducatorMessage: true, manageRequestTitle: 'Educator Message', formData: formData })        
    }


  handleQuestionChange(e,idx,type){
    e.preventDefault();
    
    let faqItems = this.state.formData;
 
    if(type === 'questionEnglish')
    { 
       faqItems.faqItems[idx].question.english = e.target.value;

    }else if(type === 'questionHindi'){

       faqItems.faqItems[idx].question.hindi = e.target.value;

    }else if(type === 'answerEnglish'){
        
       faqItems.faqItems[idx].answer.english = e.target.value;

    }else if(type === 'answerHindi'){
        
       faqItems.faqItems[idx].answer.hindi = e.target.value;
    }

    this.setState({formData:faqItems});

    
  }

  handleDocumentChange(e,idx,type){
   e.preventDefault();

   let formData = this.state.formData;
   if(type === 'file'){
      
      formData.mediaItems[idx].file  = e.target.files[0];
      

   }else if(type === 'title'){

      formData.mediaItems[idx].title  = e.target.value;
      
   }

   this.setState({formData:formData})

  } 


  handleClinicChange(e,idx,type){
       e.preventDefault();

       let formData = this.state.formData;
       if(type === 'file'){
          
          formData.clinicItems[idx].file  = e.target.files[0];
          

       }else if(type === 'name'){

          formData.clinicItems[idx].name  = e.target.value;
          
       }else if(type === 'link'){

          formData.clinicItems[idx].link  = e.target.value;
          
       }else if(type === 'description'){

          formData.clinicItems[idx].description  = e.target.value;
          
       }

       this.setState({formData:formData})

  }


  handleEducatorChange(e,idx,type){
       //e.preventDefault();

       let formData = this.state.formData;
       if(type === 'name'){

          formData.educatorItems[idx].name  = e.target.value;
          
       }else if(type === 'description'){

          formData.educatorItems[idx].description  = e.target.value;
          
       }else if(type === 'message'){
          

          let checkboxOptions = this.state.checkboxOptions;
          let formData = this.state.formData;

          if(e.target.checked === true){
            formData.educatorMessage.push({id:e.target.id,message:e.target.name})
            checkboxOptions[idx] = true;
          }else{
            checkboxOptions[idx] = false;
            
            formData.educatorMessage.map((key,i) => {
                      
                if(key.id === e.target.id){
                delete formData.educatorMessage[i];                       
                }
                return '';
            });
          }

          this.setState({checkboxOptions:checkboxOptions,formData:formData}) 
          
       }

       this.setState({formData:formData})

  }



  handleDocumentCategoryChange(value,idx){

       let multipleSelect = this.state.multipleSelect;
       let formValidation = this.state.formValidation

       if(value.length !== 0) 
       formValidation['mediaItems'][idx].category = true;
       else
       formValidation['mediaItems'][idx].category = false; 


       multipleSelect[idx] = value;

       this.setState({ multipleSelect: multipleSelect});

       let mediaItems = this.state.formData;
       
       let catArr = [];
       
       if(value && value.length){
           value.map((key, i) => {

                catArr.push({ id: key.value, name: key.label })
                return '';
                             
            });
       }


       mediaItems.mediaItems[idx].category = catArr;


       this.setState({formData:mediaItems,formValidation:formValidation});

  }
   addAction = e => {
    e.preventDefault();

    if(this.state.addFaq === true) {
       
       let formValidation = this.state.formValidation.faqItems;
       let faqValid = this.state.formValidation;
       let formData = this.state.formData;

       let validation = true;

       for(let i in formValidation){
          
           if(formData.faqItems[i].question.english === ''){
              faqValid['faqItems'][i].qEng = false;
              validation = false;
           }
           if(formData.faqItems[i].question.hindi === ''){

              faqValid['faqItems'][i].qHindi = false;
              validation = false;
           }
           if(formData.faqItems[i].answer.english === ''){
              faqValid['faqItems'][i].aEng = false;
              validation = false;
           }
           if(formData.faqItems[i].answer.hindi === ''){
              faqValid['faqItems'][i].aHindi = false;
              validation = false;
           }
       }
       this.setState({ formValidation: faqValid  });
       

       if(this.state.formData.faqfile !== '' && validation === true){
         this.props.uploadFileAction(this.state.formData);
         this.setState({ knowledgeModal: false  });
       }else{
         
        let formValidation = this.state.formValidation;

        formValidation['faqfile'] = true;

        this.setState({formValidation:formValidation});
        
       }
          

    }else if(this.state.addVideoDocument === true){
       

       let formValidation = this.state.formValidation.mediaItems;
       let faqValid = this.state.formValidation;
       let formData = this.state.formData;


       let validation = true;

       for(let i in formValidation){
          
           if(formData.mediaItems[i].title === ''){
              faqValid['mediaItems'][i].title = false;
              validation = false;
           }
           if(formData.mediaItems[i].file === ''){

              faqValid['mediaItems'][i].file = false;
              validation = false;
           }
           
           if(formData.mediaItems[i].category.id === '' || formData.mediaItems[i].category.name === ''){
              faqValid['mediaItems'][i].category = false;
              validation = false;
           }         


       }
       this.setState({ formValidation: faqValid  });
       
       if(validation === true){

         let fileArr = [];

         this.state.formData.mediaItems.map((key, i) => {
            fileArr.push(key.file);
            return '';
         })
         this.setState({ knowledgeModal: false  });
         this.props.uploadMultiFileAction(fileArr); 

       } 

    }else if(this.state.addMyClinic === true){


      let formValidation = this.state.formValidation.clinicItems;
       let faqValid = this.state.formValidation;
       let formData = this.state.formData;


       let validation = true;

       for(let i in formValidation){
          
           if(formData.clinicItems[i].name === ''){
              faqValid['clinicItems'][i].name = false;
              validation = false;
           }
           if(formData.clinicItems[i].link === ''){

              faqValid['clinicItems'][i].link = false;
              validation = false;
           }
           
           if(formData.clinicItems[i].file === ''){
              faqValid['clinicItems'][i].file = false;
              validation = false;
           }  

           if(formData.clinicItems[i].description === ''){
              faqValid['clinicItems'][i].description = false;
              validation = false;
           }       


       }
       this.setState({ formValidation: faqValid  });
       
       if(validation === true){
       
       let fileArr = [];

       this.state.formData.clinicItems.map((key, i) => {
          fileArr.push(key.file);
          return '';
       })
       this.setState({ knowledgeModal: false  });
       this.props.uploadMultiFileAction(fileArr);   
      }

    }else if(this.state.addMyEducatorMessage === true){
       

       let formValidation = this.state.formValidation.educatorItems;
       let faqValid = this.state.formValidation;
       let formData = this.state.formData;


       let validation = true;

       for(let i in formValidation){
          
           if(formData.educatorItems[i].name === ''){
              faqValid['educatorItems'][i].name = false;
              validation = false;
           }          

           if(formData.educatorItems[i].description === ''){
              faqValid['educatorItems'][i].description = false;
              validation = false;
           }       


       }
       this.setState({ formValidation: faqValid  });
       
       if(validation === true){
       const params = {

        educator_message:this.state.formData.educatorItems,
        message:this.state.formData.educatorMessage,

       }
       this.setState({ knowledgeModal: false  });
       this.props.addEducatorMessageAction(params);   
       }  
    }
     

   }

   successAlert(){
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "-100px"}}
                    title="Success"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    You have successfully added!
                </SweetAlert>
            )
        });
    }

     hideAlert(){
        this.setState({
            alert: null,
        });
        
    }

    render() {

        let selectOptions = [];

        if(this.state.categoryList && this.state.categoryList.length){

            this.state.categoryList.map((key, i) => {

                selectOptions.push({ value: key._id, label: key.name })
                return '';
             });

        }


        return (
            <div className="main-content" style={{ padding: '15px 15px' }}>
            {this.state.alert}
                <Grid fluid>
                    <Row>
                    <Col md={12}>
                            <Card
                                title="Manage request"
                                content={
                                     <Row>
                                    <Col sm={12}>
                                            <div className="hm-blk">
                                                <div className="hm-icons" style={{backgroundColor: '#56c8b5'}} >
                                                    <span onClick={(e) => this.manageBox('addFaq')} >
                                                        <span>
                                                            <img src="../../../images/t2-d.png" width="70px" alt=""/><br></br><br></br>
                                                        </span>
                                                        <span>Add New FAQ</span>
                                                    </span>
                                                </div>
                                                <div className="hm-icons" style={{backgroundColor: '#ffa509'}} >
                                                    <span onClick={(e) => this.manageBox('addVideoDocument')} >
                                                        <span><img src="../../../images/t1-d.png" width="70px" alt="" /></span><br></br><br></br>
                                                        <span>Videos &amp; Documents</span>
                                                    </span>
                                                </div>
                                                <div className="hm-icons" style={{backgroundColor: '#d73c46'}} >
                                                    <span onClick={(e) => this.manageBox('addMyClinic')} >
                                                        <span><img src="../../../images/training.png" width="70px" alt="" /></span><br></br><br></br>
                                                        <span>My Clinic</span>
                                                    </span>
                                                </div>
                                                <div className="hm-icons" style={{backgroundColor: '#41a2c9'}} >
                                                    <span onClick={(e) => this.manageBox('addMyEducatorMessage')} >
                                                        <span><img src="../../../images/general.png" width="70px" alt=""/></span><br></br><br></br>
                                                        <span>Educator Message</span>
                                                       
                                                    </span>
                                                </div>
                                            </div>

                                        
                                    </Col> 
                                    <Modal show={this.state.knowledgeModal} onHide={() => this.setState({ knowledgeModal: false  })} dialogClassName="modal-lg">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="example-modal-sizes-title-lg">{this.state.manageRequestTitle}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Knowledge-Share">
                                           <Row>
                    <Col md={12}>
                           <Form horizontal>

                                  {this.state.addFaq &&
                                    <Col sm={12}>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>
                                                FAQ File <span className="star">*</span>
                                            </Col>
                                            <Col sm={6}>

                                                <input className="form-control" type="file" name="faqfile" id="faqfile" onChange={e => { this.handleFileChange(e); }}/>
                                                 <span className="errorMsg" style={{display: this.state.formValidation.faqfile ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                    </span>
                                            </Col>                                            
                                           
                                            </FormGroup>
                                      {this.state.formData.faqItems.map((item, idx) => (      
                                            <FormGroup key={this.state.formValidation.faqItems[idx].qEng}>                                            
                                            <Col sm={3}>
                                                 Question English <span className="star">*</span>
 
                                                <FormControl type="text"    onChange={e => { this.handleQuestionChange(e,idx,'questionEnglish'); }}/>
                                                <span className="errorMsg" style={{display: !this.state.formValidation.faqItems[idx].qEng && !this.state.formData.faqItems[idx].question.english ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={3}>
                                                 Question Hindi <span className="star">*</span>
                                                <FormControl type="text"  onChange={e => { this.handleQuestionChange(e,idx,'questionHindi'); }}/>
                                                <span className="errorMsg" style={{display: !this.state.formValidation.faqItems[idx].qHindi && !this.state.formData.faqItems[idx].question.hindi  ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={3}>
                                                 Answer English <span className="star">*</span>
                                                <FormControl type="text"  onChange={e => { this.handleQuestionChange(e,idx,'answerEnglish'); }}/>
                                               <span className="errorMsg" style={{display: !this.state.formValidation.faqItems[idx].aEng && !this.state.formData.faqItems[idx].answer.english ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={3}>
                                                 Answer Hindi <span className="star">*</span>
                                                <FormControl type="text"  onChange={e => { this.handleQuestionChange(e,idx,'answerHindi'); }}/>
                                                {idx!==0 &&
                                                <span className="pull-right" onClick={e => { this.removeField(e,idx,'removeFaq'); }}>Remove</span>
                                                }  
                                                <span className="errorMsg" style={{display: !this.state.formValidation.faqItems[idx].aHindi && !this.state.formData.faqItems[idx].answer.hindi ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>  

                                            </FormGroup> 
                                       ))} 
                                        <Button bsStyle="success" className="pull-right btn-fill btn-wd"  onClick={e => { this.addMoreField(e,'faq'); }}>Add More</Button>              
                                        </Col>
                                    
                                      }

                                      {this.state.addVideoDocument &&
                                      <Col sm={12}>

                                      {this.state.formData.mediaItems.map((item, idx) => (      
                                            <FormGroup key={this.state.formData.mediaItems[idx].title}>                                            
                                            <Col sm={4}>
                                                 Video/Document Title <span className="star">*</span>
 
                                                <FormControl type="text" value={this.state.formData.mediaItems[idx].title}  onChange={e => { this.handleDocumentChange(e,idx,'title'); }}/>
                                                <span className="errorMsg" style={{display: !this.state.formValidation.mediaItems[idx].title && !this.state.formData.mediaItems[idx].title ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={4}>
                                                 File <span className="star">*</span>
                                                 <input className="form-control" type="file"  onChange={e => { this.handleDocumentChange(e,idx,'file'); }}/>
                                                 <span className="errorMsg" style={{display: !this.state.formValidation.mediaItems[idx].file && !this.state.formData.mediaItems[idx].file ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={4}>
                                                 Category <span className="star">*</span>
                                                <Select
                                                    placeholder="Multiple Select"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="multipleSelect"
                                                    value={this.state.multipleSelect[idx]}                                          
                                                    options={selectOptions}
                                                    onChange={(value) => { this.handleDocumentCategoryChange(value,idx); }}
                                              
                                                />
                                                {idx!==0 &&
                                                <span className="pull-right" onClick={e => { this.removeField(e,idx,'removeDocument'); }}>Remove</span>
                                                }
                                                 <span className="errorMsg" style={{display: !this.state.formValidation.mediaItems[idx].category   ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                           
                                            </FormGroup> 
                                       ))} 
                                        <Button bsStyle="success" className="pull-right btn-fill btn-wd"  onClick={e => { this.addMoreField(e,'document'); }}>Add More</Button>              
                                        </Col>                                    
                                      }   

                                      {this.state.addMyClinic &&
                                      <Col sm={12}>

                                      {this.state.formData.clinicItems.map((item, idx) => (      
                                            <FormGroup key={this.state.formData.clinicItems[idx].name}>                                            
                                            <Col sm={3}>
                                                 Name <span className="star">*</span>
 
                                                <FormControl type="text" value={this.state.formData.clinicItems[idx].name}  onChange={e => { this.handleClinicChange(e,idx,'name'); }}/>
                                                <span className="errorMsg" style={{display: !this.state.formValidation.clinicItems[idx].name && !this.state.formData.clinicItems[idx].name ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={3}>
                                                 Link
 
                                                <FormControl type="text" value={this.state.formData.clinicItems[idx].link}  onChange={e => { this.handleClinicChange(e,idx,'link'); }}/>
                                                <span className="errorMsg" style={{display: !this.state.formValidation.clinicItems[idx].link && !this.state.formData.clinicItems[idx].link ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={3}>
                                                 File <span className="star">*</span>
                                                 <input className="form-control" type="file"  onChange={e => { this.handleClinicChange(e,idx,'file'); }}/>
                                                 <span className="errorMsg" style={{display: !this.state.formValidation.clinicItems[idx].file && !this.state.formData.clinicItems[idx].file ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            <Col sm={3}>
                                                 Description <span className="star">*</span>
                                                <FormControl type="text" value={this.state.formData.clinicItems[idx].description}  onChange={e => { this.handleClinicChange(e,idx,'description'); }}/>
                                                {idx!==0 &&
                                                <span className="pull-right" onClick={e => { this.removeField(e,idx,'removeClinic'); }}>Remove</span> 
                                                }
                                                <span className="errorMsg" style={{display: !this.state.formValidation.clinicItems[idx].description && !this.state.formData.clinicItems[idx].description ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                          
                                            </FormGroup> 
                                       ))} 
                                        <Button bsStyle="success" className="pull-right btn-fill btn-wd"  onClick={e => { this.addMoreField(e,'clinic'); }}>Add More</Button>              
                                        </Col>                                    
                                      } 

                                      {this.state.addMyEducatorMessage &&
                                      <Col sm={12}>
                                      <FormGroup> 
                                      <Col sm={12}>
                                               <Row>
                                                                              
                                                    {
                                                        this.state.educator_msg_list.map((key, i) => { 
                                                            return (<Col sm={6} key={key._id}><Checkbox 
                                                                isChecked={this.state.checkboxOptions[i]}
                                                                number={key._id}
                                                                label={key.message}
                                                                name={key.message}
                                                                onClick={e => { this.handleEducatorChange(e,i,'message'); }} 
                                                            /></Col>)
                                                        })
                                                    }
                                                        
                                                
                                                </Row><br></br>
                                            </Col>
                                      </FormGroup> 
                                      {this.state.formData.educatorItems.map((item, idx) => (      
                                            <FormGroup key={this.state.formData.educatorItems[idx].name}>  
                                            <Col sm={6} >
                                                 Name <span className="star">*</span>
 
                                                <FormControl type="text" value={this.state.formData.educatorItems[idx].name} onChange={e => { this.handleEducatorChange(e,idx,'name'); }}/>
                                               <span className="errorMsg" style={{display: !this.state.formValidation.educatorItems[idx].name && !this.state.formData.educatorItems[idx].name ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            
                                            <Col sm={6}>
                                                 Description <span className="star">*</span>
                                                <FormControl type="text" value={this.state.formData.educatorItems[idx].description} onChange={e => { this.handleEducatorChange(e,idx,'description'); }}/>
                                                {idx!==0 &&
                                                <span className="pull-right" onClick={e => { this.removeField(e,idx,'removeEducator'); }}>Remove</span>
                                                }
                                                <span className="errorMsg" style={{display: !this.state.formValidation.educatorItems[idx].description && !this.state.formData.educatorItems[idx].description ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                          
                                            </FormGroup> 
                                       ))} 
                                        <Button bsStyle="success" className="pull-right btn-fill btn-wd"  onClick={e => { this.addMoreField(e,'educator'); }}>Add More</Button>              
                                        </Col>                                    
                                      } 
                                    </Form>
                        </Col>
                    </Row>
                                        </Modal.Body>
                                        <Modal.Footer>                                            
                                            <Button className="btn-fill btn btn-primary pull-right" onClick={e => { this.addAction(e); }} >Submit</Button>
                                        </Modal.Footer>
                                    </Modal>                                      
                                     </Row>  
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

        EducatorMsgList: state.home.EducatorMsgList,
        isEducatorMsgList: state.home.isEducatorMsgList,
        isEducatorMsgListError: state.home.isEducatorMsgListError, 

        isUploadFile: state.master.isUploadFile,
        isUploadFileError: state.master.isUploadFileError,
        uploadFile: state.master.uploadFile,

        isAddFaq:state.settings.isAddFaq,
        isAddFaqError: state.settings.isAddFaqError,
        AddFaq: state.settings.AddFaq,

        CategoryList: state.home.categoryList,
        isCategoryList: state.home.isCategoryList,
        isCategoryListError: state.home.isCategoryListError,

        isMultiUploadFile: state.master.isMultiUploadFile,
        isMultiUploadFileError: state.master.isMultiUploadFileError,
        MultiUploadFile: state.master.MultiUploadFile,

        isAddKnowledge:state.settings.isAddKnowledge,
        isAddKnowledgeError:state.settings.isAddKnowledgeError,
        AddKnowledge:state.settings.AddKnowledge,

        isAddClinicLink:state.settings.isAddClinicLink,
        isAddClinicLinkError:state.settings.isAddClinicLinkError,
        AddClinicLink:state.settings.AddClinicLink,

        isAddEducatorMsg:state.settings.isAddEducatorMsg,
        isAddEducatorMsgError:state.settings.isAddEducatorMsgError,
        AddEducatorMsg:state.settings.AddEducatorMsg,

    }
}
export default withRouter(connect(mapStateToProps, { addEducatorMessageAction, addClinicLinkAction, addKnowledgeAction, uploadMultiFileAction, categoryListAction, addFaqAction, uploadFileAction, educatorMsgListAction })(ManageRequest));