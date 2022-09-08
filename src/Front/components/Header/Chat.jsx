import React, { Component } from 'react';
import {
    Row, Col,
    Nav, NavItem,
    Tab,Modal,FormControl,FormGroup,ControlLabel,Radio
} from 'react-bootstrap';
import Card from 'Front/components/Card/Card.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { chatUserListAction, getPatientChatAction, forwardChatAction, readChatAction } from 'Front/actions/master';
import { appConstants } from 'Front/_constants/app.constants.js';
import {getBMI,getAgeByDob} from 'Front/views/Home/PublicFunction.jsx';
import Diet from 'Front/views/Diet/Diet';

var $ = require("jquery");

   
let forwardChatId = '';
let endUserChat = false;
let endUserList = false;
let existPatient = false;
let AllChatCount = 0;
let forwardedChatCount = 0;
let byEducatorChatCount = 0;

if(localStorage.getItem('AllChatCount'))
    AllChatCount = localStorage.getItem('AllChatCount');

if(localStorage.getItem('forwardedChatCount'))
    forwardedChatCount = localStorage.getItem('forwardedChatCount');

if(localStorage.getItem('AllChatCount'))
    byEducatorChatCount = localStorage.getItem('byEducatorChatCount');

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
           chatModal:false,
           ChatUserList:[],
           GetPatientChat:[],
           activeTab:'chat',
           activeUser:[],
           activateUser:this.props.chatPatientId,
           activeCount:0,
           chatCount:0,
           forwardChatId:'',
           chatPage:0,
           userPage:0,
           isUptNewChatUser:true,
           AllChatCount:AllChatCount,
           forwardedChatCount:forwardedChatCount,
           byEducatorChatCount:byEducatorChatCount,
           ReadchatCount:[],
           formData: {
                patient_id: "",
                city: "",
                first_name: "",
                last_name: "",
                direction: "desc",
                order: "createdAt",
                offset: 0,
                limit:10,
                message_hindi:'',
                message_english:'',
                selected_type:'selected',
            },
           activeNew:false,
           activeNewChat:false,
            
        };



        let _this = this;
      
        appConstants.socket.on('newMsg', function(data){
         if(localStorage.getItem('chatModel') === 'true'){    
             if(data.patientId === _this.state.activateUser){

             let GetPatientChat = _this.state.GetPatientChat; 
             const newChat = {
                clinicId: data.clinicId,
                clinicSendId: data.clinicSendId,
                createdAt: data.createdAt,
                deleted: data.deleted,
                forwarded: data.forwarded,
                msg: data.msg,
                patientId: data.patientId,
                patientReadStatus: data.patientReadStatus,
                senderName: data.senderName,
                senderType: data.senderType,
                type: data.type,
                updatedAt: data.updatedAt,
                __v: data.__v,
                _id: data._id
                }

             GetPatientChat.push(newChat);

             _this.setState({GetPatientChat:GetPatientChat});


             setTimeout(function() {
                      var objDiv = document.getElementById("scrolldiv");
                            objDiv.scrollTop = objDiv.scrollHeight;
             }, 300);

             }else{

                let ReadchatCount = _this.state.ReadchatCount;
                ReadchatCount[data.patientId] = true;
                _this.setState({ReadchatCount:ReadchatCount});

                 
                 if(_this.state.ChatUserList){

                    let ChatUserList = _this.state.ChatUserList;

                    for(let i in ChatUserList){
                        if(ChatUserList[i]._id === data.patientId){
                            ChatUserList[i].chatCount = 1;
                            ChatUserList[i].msg = data.msg;
                            break; 
                        }
                    }

                    _this.setState({ChatUserList:ChatUserList});


                 }

             }
         }

          });

            
           $( document ).ready(function() {
            $('.scrolldiv').scroll(function() {
                if($(".scrolldiv").scrollTop() === 0){
                let chatPage = _this.state.chatPage+1;
                _this.state.activeNew = false;
                _this.setState({chatPage:chatPage,activeNew:false});

                   if(endUserChat === false){
                        const params2 = {
                            limit:10,
                            skip:chatPage,
                            patientId:_this.state.activateUser,
                        }
                         _this.props.getPatientChatAction(params2); 
                    }
                }
               
            });


            $('.chat_user_list_box').scroll(function() {
                if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight){
                 let userPage = _this.state.userPage+1;
                _this.setState({userPage:userPage});
                    if(endUserList === false){
                            const params2 = {
                                limit:10,
                                skip:userPage,
                                type:_this.state.activeTab,
                            }
                         _this.props.chatUserListAction(params2); 
                   }
                } 
            });
        });  
    }

    componentDidMount(){
        existPatient = false;
        
        if(this.props && this.props.activeAllChat){
            this.setState({activeNewChat:true});
        }

        const params1 = {
            limit:10,
            skip:0,
            type:this.state.activeTab,
        }
        this.props.chatUserListAction(params1);     


    }

    componentWillReceiveProps(nextProps){

         if(nextProps.isChatForward !== this.props.isChatForward){           
               document.getElementById("forwadIcon_"+forwardChatId).innerHTML = "<small>Forwarded to doctor</small>";
               document.getElementById("forwadIcon_"+forwardChatId).style.pointerEvents="none";
               }


          if(nextProps.ChatUserList !== this.props.ChatUserList){
             
                let ChatUsers = nextProps.ChatUserList.list;
                 if(ChatUsers.length === 0){
                    endUserList = true;
                }


                if(ChatUsers.length !== 0){

                let usersArr;

                let ChatCount = this.state.chatCount;

                if(this.state.userPage !== 0 && this.state.userPage !== 1 && ChatUsers.length>0){

                     let ChatUserList = this.state.ChatUserList;

                     for(let i in ChatUsers){
                     ChatUserList.push(ChatUsers[i]);
                     }                     
                  
                    usersArr = ChatUserList;
                    ChatCount = nextProps.ChatUserList.list.length;

                }else if(this.state.userPage !== 0 && ChatUsers.length===0){                    
                    
                    usersArr = this.state.ChatUserList;
                    ChatCount = this.state.chatCount;

                }else{
                    let reverseA = this.state.ChatUserList;
                    if(reverseA.length && ChatUsers.length)
                    usersArr = reverseA.concat(ChatUsers);
                    else 
                    usersArr = ChatUsers;
                        
                    ChatCount = nextProps.ChatUserList.list.length;
                }

                let activeUser = this.state.activeUser;

                const filteredArray = Object.values(usersArr.reduce((unique, o) => {
                  if(!unique[o.patientId]) unique[o.patientId] = o;
                  
                  return unique;
                }, {}));
               
                let users = filteredArray;
                 usersArr = filteredArray;

                
               
                
               
                let ReadchatCount = this.state.ReadchatCount;

                for(let i in users){
                      
                    if(users[i].chatCount !== 0)
                       ReadchatCount[users[i].patientId] = true;
                    else
                       ReadchatCount[users[i].patientId] = false; 

                     
                    if(ChatUsers.length !== 0){
                      if(this.props.chatPatientId && users[i].patientId === this.props.chatPatientId)
                      {   
                          activeUser[users[i].patientId] = true;                          

                      }else{
                          activeUser[users[i].patientId] = false;
                      }  

                    }

                    if(this.props.chatPatientId === users[i].patientId){
                          existPatient = true;
                    }         
                }

                if(this.props && this.props.chatPatientDetails && usersArr.length && usersArr[0].msg!=='' && existPatient === false  ){  
                    usersArr.unshift({patientId:this.props.chatPatientId,msg:'..',chatCount:0,patient:[{firstName:this.props.chatPatientDetails.firstName,lastName:''}]})  
                }

                let activateUser;
                if(ChatUsers.length === 0){
                    activateUser = this.state.activateUser;
                }else{
                    activateUser = usersArr[0].patientId
                }
                
                this.setState({activateUser:activateUser,ChatUserList:usersArr,activeCount:1,chatCount:ChatCount,ReadchatCount:ReadchatCount});

                if(this.props && this.props.chatPatientId){
                    this.setState({activateUser:this.props.chatPatientId}) 
                    activateUser = this.props.chatPatientId
                }
                
                if(ChatUsers.length !== 0){
                    const params2 = {
                                    limit:10,
                                    skip:this.state.chatPage,
                                    patientId:activateUser,
                                }
     
                this.props.getPatientChatAction(params2);

                let activeUser1 = this.state.activeUser;

                activeUser1[activateUser] = true;  

                this.setState({activeUser:activeUser1});

                let addUser = {
                           userId:localStorage.getItem('_id'),
                           screen:activateUser,
                       } 
                appConstants.socket.emit('currentScreen', addUser);

                }

            }
                    
         } 


         if(nextProps.isGetPatientChat !== this.props.isGetPatientChat){
            let chatArr = nextProps.GetPatientChat.list;  
            if(nextProps.GetPatientChat.list.length === 0){
                endUserChat = true;
            }
             
            if(this.props && this.props.chatPatientId && this.state.chatPage === 0){
             
                var reverse = chatArr.reverse(); 
                 
                this.setState({GetPatientChat:reverse});

            }else{ 

                let GetPatientChat = this.state.GetPatientChat; 
                var reverseR;
                if(this.state.chatPage === 0){
                    reverseR = chatArr.reverse();                    
                }
                else{
                    reverseR = chatArr;                     
                }
                     
                
                var combine;
                if(this.state.activeNew === false && this.state.activeNewChat === false){
                 combine = reverseR.concat(GetPatientChat);                 
                }
                else{
                 combine = reverseR;  
                   
                }

                this.setState({GetPatientChat:combine});
            
            }


            if(this.state.chatPage === 0){
                 setTimeout(function() {
                      var objDiv = document.getElementById("scrolldiv");
                            objDiv.scrollTop = objDiv.scrollHeight;

                }, 300);  

            }else{
                setTimeout(function() {
                     
                   $(".scrolldiv").scrollTop(100);

             }, 500);
            }  
         }

         if(nextProps.isReadChat !== this.props.isReadChat){
            let ReadchatCount = this.state.ReadchatCount;
            ReadchatCount[this.state.activateUser] = false;
            this.setState({ReadchatCount:ReadchatCount});
         }
    }

    sendMessageAction(){
         
        var message = document.getElementById('message').value;
        if(message !== ''){
          let Name = localStorage.getItem('firstName')+' '+localStorage.getItem('lastName');
          const params = {
            msg:message,
            patientId:this.state.activateUser,
            clinicId:localStorage.getItem('clinicId'),
            senderId:localStorage.getItem('_id'),
            userType:localStorage.getItem('userType'),
            senderName:Name
          } 
         
        appConstants.socket.emit('sendToPatient', params);
        document.getElementById('message').value = '';
       
            setTimeout(function() {
                  var objDiv = document.getElementById("scrolldiv");
                        objDiv.scrollTop = objDiv.scrollHeight;

            }, 300);  
        }

        
    }

    changeUserTab(e,type){        
     
       
       endUserChat = false;
       endUserList = false;
        this.setState({chatPage:0,userPage:0,ChatUserList:[],isUptNewChatUser:true});

       
        const params = {
            limit:10,
            skip:0,
            type:type,
        }
        this.setState({activeTab:type})
        this.props.chatUserListAction(params);    

    }

    forwardMessage(e,chat_id){
        forwardChatId = chat_id;
        const params = {
            chat_id : chat_id
        }

        this.props.forwardChatAction(params);
    }
    
    sendMessage(e){
             this.sendMessageAction();
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
             this.sendMessageAction();
        }
    }

    activateUser(patientId,chatCount,e){

       endUserChat = false;
       endUserList = false;
       this.setState({isUptNewChatUser:true,chatPage:0,userPage:0,GetPatientChat:[],activeNew:true,activeNewChat:false});


       let ReadchatCount = this.state.ReadchatCount;
        
       if(ReadchatCount[patientId] === true){

       let chatC = localStorage.getItem('AllCount');

       localStorage.setItem('AllCount',chatC-chatCount);
            const params = {
                type:this.state.activeTab,
                patientId:patientId,
            }
            this.props.readChatAction(params);
       } 


        const params = {
            limit:10,
            skip:this.state.chatPage,
            patientId:patientId,
        }
       
        this.props.getPatientChatAction(params);


        let activeUser = this.state.activeUser;
               
        for(let i in activeUser){
                if(activeUser[i] !== patientId)
                activeUser[i] = false;     
                  
        }
        activeUser[patientId] = true; 
        this.setState({activeUser:activeUser,activateUser:patientId});

        setTimeout(function() {
              var objDiv = document.getElementById("scrolldiv");
                    objDiv.scrollTop = objDiv.scrollHeight;

        }, 300);  


        let addUser = {
                           userId:localStorage.getItem('_id'),
                           screen:patientId,
                       } 
        appConstants.socket.emit('currentScreen', addUser);


    }


    dietBox(e,patient){
        
        this.setState({dietModal:true,currentPatient:patient});
        this.setDietTitle(patient);
    }

    setDietTitle(patient){
        let title = "Patient Diet ("+patient.firstName+" "+patient.lastName+" - "+patient.patientNo+")";
        title += " | H:"+patient.height;
        title += " | W:"+patient.weight;
        title += " | BMI:"+getBMI(patient.height,patient.weight);
        title += " | Age:"+getAgeByDob(patient.dob);
        this.setState({dietTitle:title});
    }
  


    render() {

    let ChatUserList = ''; 
    
    let PatientChat = ''; 
    let PatientDetail = ''; 
    let chatInput = ''; 
    let noChatFound = <b style={{margin:'37%'}}>No Messages found!</b>; 

    if(this.state.ChatUserList && this.state.ChatUserList.length && (this.state.activeTab === 'byEducator' || this.state.activeTab === 'forwarded' || this.state.activeTab === 'chat')){

        ChatUserList = this.state.ChatUserList.map((key,i) => {
        if(key.patientId === this.state.activateUser)

        if(this.props && this.props.chatPatientDetails && key.msg === '..'){                      
             PatientDetail = <Row><Col md={9}><b>{this.props.chatPatientDetails.firstName}&nbsp;{this.props.chatPatientDetails.lastName} - {this.props.chatPatientDetails.patientClinicId} | H : {this.props.chatPatientDetails.height} | W : {this.props.chatPatientDetails.weight}<br/>BMI : 27.40 | City : {this.props.chatPatientDetails.city} | Age : {this.props.chatPatientDetails.age} </b></Col><Col md={3}><Button className="btn btn-warning btn-sm pull-right" onClick={(e) => this.dietBox(e, this.props.chatPatientDetails)}   >Diet Plan Details</Button></Col></Row>
        }else{
             PatientDetail = <Row><Col md={9}><b>{key.patient[0].firstName}&nbsp;{key.patient[0].lastName} - {key.patient[0].patientClinicId} | H : {key.patient[0].height} | W : {key.patient[0].weight}<br/>BMI : {getBMI(key.patient[0].height,key.patient[0].weight)} | City : {key.patient[0].city} | Age : {getAgeByDob(key.patient[0].age)} </b></Col><Col md={3}><Button className="btn btn-warning btn-sm pull-right" onClick={(e) => this.dietBox(e, key.patient[0])}  >Diet Plan Details</Button></Col></Row>
        }

        chatInput =  <div><Col md={10} style={{marginTop:'10px'}}>
                        <FormControl placeholder="Type Message.." type="text" name="message" id="message" onKeyPress={this._handleKeyPress}/>
                            </Col>
                        <Col md={2} style={{marginTop:'10px'}}>
                               <Button className="btn btn-primary pull-right"  onClick={e => { this.sendMessage(e); }}>Send</Button> 
                        </Col></div>

                 return(<div className={this.state.activeUser[key.patientId] && this.state.isUptNewChatUser ? 'chat_user_list chat_msg active' : 'chat_user_list chat_msg deactive'} data-id="15">
                                            <span className="chat-apa"  data-id="15" chat-id={key.chatId} onClick={this.activateUser.bind(this,key.patientId,key.chatCount)}>
                                                <span className="name">{key.patient[0].firstName}&nbsp;{key.patient[0].lastName}</span>
                                                <span className="msg">{key.msg}</span>
                                                <span className="msgCount" style={{display:this.state.ReadchatCount[key._id] ? 'block' : 'none'}}>{key.chatCount}</span>
                                            </span>
                                        </div>)

        })  

        noChatFound = '';  
     } 

    if(this.state.GetPatientChat && this.state.GetPatientChat.length){
          let lastSend = false;
          let lastForwadChatId = "";
           PatientChat = this.state.GetPatientChat.map((key,i) => {
                   
                    if(lastSend !== key.clinicSendId)
                    lastSend = true;
                    else
                    lastSend = false    

                    let selfChat = '';
                    let float = '';
                    if(key.clinicSendId === localStorage.getItem('_id')){
                         selfChat = 'self-chat';
                        float = 'float-right';
                    }else{
                         selfChat = 'patient-chat';                
                         float = 'float-left';                
                    }
                  
                    var time = new Date(key.createdAt);
                    var date = new Date(time);
                    var dateTime = date.getHours()+':'+date.getMinutes();
                    
                    let senderName = '';
                   

                    if(lastSend === true)
                    senderName = key.senderName+','
 
                    lastSend = key.clinicSendId; 

                    let textForward = '';
                    let forwardAction = false;

                    if(key.forwarded===true){
                        textForward  = <small>Forwarded to doctor</small>;
                        forwardAction = false;
                    }else{
                         textForward  = <i class="fa fa-share"></i>;
                         forwardAction = true;
                    }


                    let forAction = '';
                    if(key.type==="toClinic" && localStorage.getItem('userType') === 'educator'){
                        lastForwadChatId = key._id;
                        forAction = <span className="forwadIcon"  id={"forwadIcon_"+key._id} style={{pointerEvents:forwardAction ? 'all' : 'none',display:"none"}} onClick={e => { this.forwardMessage(e,key._id); }}>{textForward}</span>
                    }
                      
                 return(<div className={float+" chatbox"}><small className="chatTime">{senderName}&nbsp;{dateTime.toString()}</small><div className={selfChat+" chat_user_list chat_msg"} data-id="11">
                            <span className="chat-apa" data-id="11" chat-id="20">
                            <span className="name"></span>
                            <span className="msg">{key.msg}</span>
                            <span className="msgCount" style={{display:this.state.ReadchatCount[key._id] ? 'block' : 'none'}}>{key.chatCount}</span>
                            </span>
                        </div>{forAction}</div>)
            })

            setTimeout(function(){
                var forwadIcon = document.getElementsByClassName("forwadIcon");
                for(let x in forwadIcon){
                    if(forwadIcon[x].style){
                        forwadIcon[x].style.display = "none";
                    }
                }

                if(document.getElementById("forwadIcon_"+lastForwadChatId)){
                    document.getElementById("forwadIcon_"+lastForwadChatId).style.display = "inline-block";
                }
            },500);
           
     }

        return (
            
            <Row>
             <Col md={4}>
                   <Tab.Container id="nav-with-icons" defaultActiveKey="all">
            
                <div>
                    <div className="nav-container pa-chat">
                        <Nav bsStyle="tabs" bsClass="nav" style={{float:'none'}}>
                            <NavItem eventKey="all" onClick={e => { this.changeUserTab(e,'chat'); }}>
                                All<br/>Messages<span style={{ float:'right'}}>&nbsp;({this.state.AllChatCount})</span>
                            </NavItem>
                            <NavItem eventKey="educator"  onClick={e => { this.changeUserTab(e,'byEducator'); }}>
                                Educator<br/>Response<span style={{ float:'right' }}>&nbsp;({this.state.forwardedChatCount})</span>
                            </NavItem>
                            <NavItem eventKey="forward"  onClick={e => { this.changeUserTab(e,'forwarded'); }}>
                                Forward to<br/>Doctor<span style={{ float:'right' }}>&nbsp;({this.state.byEducatorChatCount})</span>
                            </NavItem>
                            
                        </Nav>
                    </div>
                    <Tab.Content className="chat_user_list_box">
                        <Tab.Pane eventKey="all">
                            <Card
                               
                                content={
                                    <div className="chat_list chat_list_nav chat_list_all chat-list-pa active"> 
                                    {ChatUserList}
                                    </div>
                                }
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="educator">
                            <Card
                           
                                content={
                                    <div className="chat_list chat_list_nav chat_list_educator chat-list-pa">
                                        {ChatUserList}
                                    </div>    
                                }
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="forward">
                            <Card                                
                                content={
                                    <div className="chat_list chat_list_nav chat_list_forward chat-list-pa">
                                        {ChatUserList}
                                    </div> 
                                }
                            />
                        </Tab.Pane>
                        
                    </Tab.Content>
                </div>
            </Tab.Container>
            
              </Col>
              <Col md={8}>                      

                     <Row className="chat-wind-body">
                     {PatientDetail && this.state.isUptNewChatUser &&
                     <div>{PatientDetail}</div>
                     }
 
                    <div className="scrolldiv" id="scrolldiv">
                            {noChatFound}
                    <div>
                            
                    <Col md={12}>

                    <div className="pa_chat_window chat_list chat_list_nav chat-list-pa active"  id="chat_list">
                     <div>{PatientChat}</div>
                    </div>         
                    </Col>   
                    </div>                            
                    </div>  
                    {chatInput}
                    </Row>
                        
              </Col>


              <Modal show={this.state.notificationModal} onHide={() => this.setState({ notificationModal: false  })} >
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Send Notification to Patient</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="send-notification form-horizontal">
                        <Row>
                            <Col md={12}>
                                  <br/>  
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Message English <span className="star">*</span>
                                </Col>
                                <Col sm={8}>
                                    <FormControl rows="3" componentClass="textarea" name="message_english" bsClass="form-control" defaultValue={this.state.formData.message_english} onChange={e => { this.handleChangeNotification(e); }} />
                                </Col>                                
                                </FormGroup>

                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Message Hindi <span className="star">*</span>
                                </Col>
                                <Col sm={8}>
                                    <FormControl rows="3" componentClass="textarea" name="message_hindi" bsClass="form-control" defaultValue={this.state.formData.message_hindi} onChange={e => { this.handleChangeNotification(e); }} />
                                </Col>
                                
                                </FormGroup>
                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Select Type <span className="star">*</span>
                                </Col>
                                <Col sm={4}>
                                <Radio
                                        number={'all'}
                                        key={'all'}
                                        option={'all'}
                                        name={"selected_type"}
                                        checked={(this.state.formData.selected_type==='all')?true:false}
                                        onClick={e => { this.handleNotificationType('all'); }}
                                        label={'All Patient'}
                                    />
                                    </Col>
                                    <Col sm={4}>
                                <Radio
                                        number={'selected'}
                                        key={'selected'}
                                        option={'selected'}
                                        name={"selected_type"}
                                        checked={(this.state.formData.selected_type==='selected')?true:false}
                                        onClick={e => { this.handleNotificationType('selected'); }}
                                        label={'Selected Patient'}
                                    />
                                </Col>
                                </FormGroup>

                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    
                                </Col>
                                <Col sm={8}>
                                    <Button className="btn-fill btn btn-warning pull-right" onClick={() => this.setState({ notificationModal: false  })}>Send</Button>
                                </Col>
                                </FormGroup>                                
                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal>

               
                <Modal className="pa-diet-screen" show={this.state.dietModal} onHide={() => this.setState({ dietModal: false  })} dialogClassName="modal-lg">
                     <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">{this.state.dietTitle}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        <Row>
                            <Col md={12}>
                                <Diet patient={this.state.currentPatient}/>
                            </Col>
                        </Row>

                    </Modal.Body>                                
                </Modal>                
                </Row>            
        );
    }
} 

function mapStateToProps(state) {
    return {      
          isChatUserList: state.master.isChatUserList,
          isChatUserListError: state.master.isChatUserList,
          ChatUserList: state.master.ChatUserList,    

          isGetPatientChat: state.master.isGetPatientChat,
          isGetPatientChatError: state.master.isGetPatientChatError,
          GetPatientChat: state.master.GetPatientChat,

          isChatForward: state.master.isChatForward,
          isChatForwardError: state.master.isChatForwardError,
          ChatForward: state.master.ChatForward,

          isReadChat: state.master.isReadChat,
          isReadChatError: state.master.isReadChatError,
          ReadChat: state.master.ReadChat,
    }

  }
  export default withRouter(connect(mapStateToProps, { readChatAction, chatUserListAction, getPatientChatAction, forwardChatAction } )(Chat));
