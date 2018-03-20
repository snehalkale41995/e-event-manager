import React, {Component} from 'react';
import {
      Row, Col,Card, CardHeader, CardBody, CardFooter, Button, Label,
      Table, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';

  import Select from 'react-select';
  import 'react-select/dist/react-select.css';
  import * as firebase from 'firebase';
  import 'firebase/firestore';
  import { DBUtil } from '../../services';
  import Avatar from 'react-avatar';
  import { ToastContainer, toast } from 'react-toastify';

class RegistrationList extends Component{
    constructor(props){
        super(props);
        var history = { history }
        this.state = {  
            users: [],        
            eventDropDown: [],
            selectFlag: true,
            modelPopupFlag: false
        };

        this.getRegistrationResponse = this.getRegistrationResponse.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.setApporveRejectButtonByStatus = this.setApporveRejectButtonByStatus.bind(this);
        this.onApproved = this.onApproved.bind(this);
        this.onRejected = this.onRejected.bind(this);      
        this.togglePopup = this.togglePopup.bind(this);
    }

    // Method For render/set default data
    componentWillMount() {
        let componentRef = this;
        DBUtil.addChangeListener("SampleEvents", function (objectList) {
            let events  = [], eventList = [], eventsID = [];
            objectList.forEach(function (doc) {
                events.push(doc.data());
                eventsID.push(doc.id);
            });            
            for (var i = 0; i < events.length; i++) {
                eventList.push({label : events[i].eventName , value : eventsID[i] });
            }
            componentRef.setState({eventDropDown : eventList}) 
        });
        this.getRegistrationResponse();
    }

    // Method For get users data
    getRegistrationResponse(){
        let componentRef = this;
        DBUtil.addChangeListener("RegistrationResponse", function (objectList) {
            let users  = [], userList = [], userIDs = [];
            objectList.forEach(function (doc) {
                users.push(doc.data());
                userIDs.push(doc.id);
            });            
            for (var i = 0; i < users.length; i++) {
                userList.push({id : userIDs[i] , users : users[i] });
            }
            console.log("User List: " + userList);
            componentRef.setState({users : userList}) 
        });

    }

    // Method For approve registration
    onApproved (e,id,ddlValue) {
        this.state.users.map(function(row){
            if(row.id == id){
                let param = [{
                    id : id,
                    isApproved: true,
                    isPending: false,
                    isRejected: false,
                }];
                 DBUtil.approvedRejectDocById("RegistrationResponse",param)
                 toast.success("User approved successfully.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                setTimeout(() => {
                    if (this.state.modelPopupFlag == true){
                        this.setState({
                            modelPopupFlag: !this.state.modelPopupFlag
                        });
                    }
                    this.getRegistrationResponse()
                    this.handleSelectChange(ddlValue);
                }, 2000);
            }
        },this)
    }

    // Method For reject registration
    onRejected (e,id,ddlValue) {
        console.log('Reject Click...!!')
        var tempThis = this.state;
        this.state.users.map(function(row){
            if(row.id == id){
                let param = [{
                    id : id,
                    isApproved: false,
                    isRejected: true,
                    isPending: false
                }];
                 DBUtil.approvedRejectDocById("RegistrationResponse",param)
                 toast.success("User rejected successfully.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                setTimeout(() => {
                    if (this.state.modelPopupFlag == true){
                        this.setState({
                            modelPopupFlag: !this.state.modelPopupFlag
                        });
                    }
                    this.getRegistrationResponse()
                    this.handleSelectChange(ddlValue);
                }, 2000);
            }
        },this)
    }

    // Method For handle changed value of dropdown
    handleSelectChange(value) {
        if(value != null){
            this.setState({
                value,
                selectFlag : false
            });
        
        var tempThis = this.state;    
        this.rowComponents  = this.state.users.map(function(row){
            if(row.users.event != undefined && row.users.event.id == value){
                    let tdResponse = '';
                    var responseData = row.users.response; //row.response;
                    for (var i = 0; i < responseData.length; i++) {
                        tdResponse = (
                                        <div>
                                        <span key={responseData[i].questionId}>{responseData[i].questionId} &nbsp; {responseData[i].question} <br/>Answer :&nbsp; {responseData[i].answer}<br/>
                                        </span> <Button color="link" onClick={(e) =>this.togglePopup(e,row.id,value)  }><i className="fa fa-link"></i>&nbsp; View More</Button>
                                        </div>
                                )
                                break;
                    }
                    
                    let setApporveRejectButton = this.setApporveRejectButtonByStatus(row.users.isPending,row.users.isApproved,row.users.isRejected,row.id,value);
                    return <tr key ={row.users.name}>
                            <td key={row.users.name}>
                                <Avatar name={row.users.name} size={40} round={true} />&nbsp; 
                                {row.users.name}
                            </td>
                            <td>
                                {tdResponse}
                            </td>
                            <td>
                                {setApporveRejectButton} 
                            </td>
                        </tr>
            }
        },this);

        }
        else{
            this.setState({
                value,
                selectFlag : true
            });
        }
    }

    // Method For for open model popup
    togglePopup(e,value,ddlValue) {
        this.setState({
            modelPopupFlag: !this.state.modelPopupFlag
        });
        this.modelPopup = this.state.users.map(function(row){
            if(row.id == value){            
                this.popupButtons = this.setApporveRejectButtonByStatus(row.users.isPending,row.users.isApproved,row.users.isRejected,row.id,ddlValue);
                let tdResponse = row.users.response.map(function(item){
                    return (<span key={item.questionId}>{item.questionId} &nbsp; {item.question} 
                             <br/>Answer :&nbsp; {item.answer}<br/><br/>
                            </span>)
                });
                return <tr key ={row.users.name}>
                        <td>
                            {tdResponse}
                        </td>
                    </tr>
            }
        },this);
      }

    // Method For render apporve & reject buttons
    setApporveRejectButtonByStatus(isPending,isApproved,isRejected,id,ddlValue){
        let userStatus ='';
        if(isPending == true){
           return userStatus = 
           (<div>
                <Button color="success" onClick={(e) =>this.onApproved(e,id,ddlValue)}>Apporve</Button>&nbsp;
                <Button color="danger" onClick={(e) =>this.onRejected(e,id,ddlValue)}>Reject</Button>
            </div>)
        }
        else if(isApproved == true){
            return userStatus = (
                <div>
                    <span>Approved</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="danger" onClick={(e) => this.onRejected(e,id,ddlValue)}>Reject</Button>
                </div>
            )
        }
        else if(isRejected == true){
            return userStatus = (
                <div>
                    <Button color="success" onClick={(e) => this.onApproved(e,id,ddlValue)}>Apporve</Button>&nbsp;
                    <span>Rejected</span>
                </div>
            )
        }
    }

    render(){
        const { value} = this.state; 
        const options = this.state.eventDropDown;
        let loadData  = '';

        if(this.state.selectFlag == true){
            loadData = 
            (<Table responsive>
                <tbody>
                    <tr>
                        <td>
                            <span>Please select event..!!</span>
                        </td>
                    </tr>
                </tbody>
            </Table>)
        }
        else{
            loadData = 
            (<Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Response</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.rowComponents }
                </tbody>
            </Table>)
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                        <CardHeader>
                            <FormGroup row>
                                    <Col xs="12" md="6">
                                        <h1>Registration List</h1>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Select
                                            placeholder="Select Events"
                                            simpleValue
                                            value={value}
                                            options={options}
                                            onChange={this.handleSelectChange}
                                            />
                                    </Col>
                            </FormGroup>
                        </CardHeader>
                        <CardBody>
                            {loadData}
                            <ToastContainer autoClose={2000} />
                        </CardBody>
                        </Card>
                    </Col>   

                    <Modal isOpen={this.state.modelPopupFlag} toggle={this.togglePopup}
                        className={'modal-lg ' + this.props.className}>
                    <ModalHeader toggle={this.togglePopup}>User Response</ModalHeader>
                    <ModalBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Question and Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.modelPopup}
                                </tbody>
                            </Table>
                    </ModalBody>
                    <ModalFooter>
                        {this.popupButtons}
                    </ModalFooter>
                    </Modal>  

                </Row>
            </div>
        );
    }
}

export default RegistrationList;