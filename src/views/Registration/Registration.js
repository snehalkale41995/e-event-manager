import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
   Input, InputGroup, InputGroupText, InputGroupAddon, Row, Col,  
   Card, CardBody, Button, Label, FormGroup 
} from 'reactstrap';
import Select from 'react-select';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from 'react-avatar';
import QRCode from 'qrcode'
const data = require('../../../public/attendeeData/attendeeData.json');

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: 'sk',
        lastName: 'sk',
        email: 'sk@gmail.com',
        contactNo: '9898989898',
        address: 'pune',
        profileServices: [],
        isAttendance: false,
        registrationType: '',
        briefInfo: '',
        info: '',
        profileImageURL: '',
        sessionId: '',
        linkedInURL: ''
      },
      intent: '',
      submitted: false,
      invalidEmail: false,
      invalidContact: false,
      emailError : '',
      contactError : '',
      profileDropDown: [],
      attendeeId:'',
      attendeeLabel:'',
      counter:''
    };
    this.changeFunction = this.changeFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.resetField = this.resetField.bind(this);
    this.onGenerateQRcode = this.onGenerateQRcode.bind(this);
    this.openWin = this.openWin.bind(this);
    this.onHandleValidations = this.onHandleValidations.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.onChangeIntentField= this.onChangeIntentField.bind(this);
    this.setInputToAlphabets = this.setInputToAlphabets.bind(this);
    this.setInputToNumeric = this.setInputToNumeric.bind(this);
    this.bulkUpload = this.bulkUpload.bind(this);
     this.checkPreviuosCount = this.checkPreviuosCount.bind(this);
  }

  // Method For render/set default profile data
  componentWillMount() {
      let componentRef = this;
      DBUtil.addChangeListener("UserProfiles", function (objectList) {
          let profiles  = [], profileList = [], profileIDs = [];
          objectList.forEach(function (doc) {
            profiles.push(doc.data());
              profileIDs.push(doc.id);
          });            
          for (var i = 0; i < profiles.length; i++) {
            profileList.push({label : profiles[i].profileName , value : profiles[i].profileName });
          }
          componentRef.setState({profileDropDown : profileList}) 
      });
  }

  bulkUpload()
  {
   var dataArray = data;
  for(var index in dataArray){
   let collectionName = index;
    for(var doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
       DBUtil.getDocRef(collectionName).doc(doc)
        .set(dataArray[index][doc])
        .then(() => {
         // console.log('Document is successed adding to firestore!');
        })
        .catch(error => {
         // console.log(error);
        });
      }
    }
  }
 }

  // Method for set textbox values
  changeFunction(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      this.state.invalidContact = false;
      this.state.invalidEmail = false;
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
  }

  // Method for from handle validation
  onHandleValidations(user)
  {
    if(user.email == ""){
      user.email = null;
    }
    if(user.contactNo == ""){
      user.contactNo = null;
    }
    if (user.email != null ) {
      let lastAtPos = user.email.lastIndexOf('@');
      let lastDotPos = user.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && user.email.indexOf('@@') == -1 && lastDotPos > 2 && (user.email.length - lastDotPos) > 2)) {
        this.state.invalidEmail = true;
        this.setState({emailError : "*Invalid Email"});
      }
      else {
        this.state.invalidEmail = false;
        this.setState({emailError : " "});
      }
    }
    else if (user.email == null ||  user.email != " ") {
      this.state.invalidEmail = true;
      this.setState({emailError : "*Required"});
    }

    if (user.contactNo != null && ( user.contactNo.length < 10 || user.contactNo.length > 10)) {
      this.state.invalidContact = true;
      this.setState({contactError : "*Invalid Contact No"});
    }
    else if(user.contactNo == null || user.contactNo == ""){
      this.state.invalidContact = true;
      this.setState({contactError : "*Required "});
    }
    else {
      this.state.invalidContact = false;
      this.setState({contactError : " "});
    }
  }

  // Method for generate QR code
  onGenerateQRcode() {
    const { user } = this.state;
    let profiles = '';
    this.onHandleValidations(user , this.state.submitted = true);
    if (user.firstName && user.lastName && !this.state.invalidEmail && !this.state.invalidContact)
    {
        let fname = user.firstName;
        let lname = user.lastName;
        let contactNo = user.contactNo;
        let emailid = user.email;
        let profileData = this.state.profileDropDown; 
        let userId = "id:"+this.state.attendeeId; 
       
        profileData.map(function(item){
          if(user.profileServices.length > 0){
            let serviceString = user.profileServices[user.profileServices.length - 1]
            let serviceArray = serviceString.split(',');
            for(var i = 0;i< user.profileServices.length; i++){
              if(item.value == serviceArray[i])
              {
                profiles += item.label +' ,';
                break;
              }
            }
          } 
        })
     
      let generatedQR;
      let compRef =this;
      let id = this.state.attendeeId;
      QRCode.toDataURL("TIECON:"+id)
      .then(url => {
      generatedQR = url;
      compRef.setState({ Qrurl: url })
        setTimeout(() => {
      compRef.openWin(user,profiles);
        }, 250);
      })
    }
  }

  // Method for open new window of generated QR code
  openWin(user,profiles) {
    let intent = this.state.intent;
    let Firstletter;
    let attendeeLabel;
    if(intent=="Mentor")
      {Firstletter ="M"}
    if(intent=="Mentee")
      {Firstletter ="M+"}
    if(intent=="Investor")
      {Firstletter ="I" }
    if(intent=="Looking For Investment")
      {Firstletter ="I+"}

    var newWindow = window.open('', '', 'width=1000,height=1000');
    newWindow.document.writeln("<html>");
    newWindow.document.writeln("<body>");
    newWindow.document.writeln("<div style='height:113px'> </div>");
    newWindow.document.writeln("<table > <tr><td><img src='" + this.state.Qrurl + "' alt='Click to close' id='bigImage'/></td><td style='vertical-align:middle;'><h1 style='padding-left:15px;font-size:40px;font-family:Arial;padding-top:15px;'>"+user.firstName+"<br/>"+user.lastName+"</h1></td></tr></table>")
//  newWindow.document.writeln("<div>"+this.state.attendeeLabel+"</div>");
    newWindow.document.writeln("<hr align=left style='border: solid 1px black;margin-top:0px;margin-bottom:5px; width:420px'/>")
    newWindow.document.writeln("<table > <tr><td style='width:35%;text-align:left;padding-left:15px;'> <div class='badge' style='border-width:2px;text-align:center; vertical-align:middle;border-style:solid;width:80px;height:80px;border-radius:50%;display:table-cell;font-size:40px;margin-left:-40px;'>" +Firstletter +" </div>"+"</td><td style='padding-left:0;text-align:left;vertical-align:middle;'><h2 style='text-align:center;padding-top:10px;'>ETERNUS  SOLUTIONS<br/>PRIVATE  LIMITED</h2></td></tr></table>")
    newWindow.document.writeln("</body></html>");
    newWindow.document.close();
    setTimeout(function () {
      newWindow.print();
      newWindow.close();
    }, 1000);
  }


submitFunction(event) {
    event.preventDefault();
    let compRef = this;
    this.setState({ submitted: true });
    const { user } = this.state;

    let attendeeLabel = user.profileServices[0].substring(0, 3);
    this.setState({attendeeLabel:attendeeLabel});
    this.onHandleValidations(user);
   // this.checkPreviuosCount();
    if (user.firstName && user.lastName && !this.state.invalidEmail && !this.state.invalidContact) {
      let tblAttendance = "Attendance", tblAttendee = "Attendee";
      let otpVal = Math.floor(1000 + Math.random() * 9000);
      if(user.profileServices.length > 0){
        let length = user.profileServices.length;
        let serviceString = user.profileServices[length - 1]
        if(serviceString == ""){
            this.state.user.profileServices = [];
        }
        else{
            let serviceArray = serviceString.split(',');
            this.state.user.profileServices = serviceArray;
        }
      } 
      let intentVal = '';
      if (this.state.intent == 'Select Intent' || this.state.intent == ""){
          intentVal = '';
      }
      else{
          intentVal=this.state.intent
      }
      
      let doc = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNo: user.contactNo,
        address: user.address,
        profileServices: user.profileServices,
        isAttendance: user.isAttendance,
        timestamp: new Date(),
        registrationType: 'On Spot Registration',
        briefInfo: user.briefInfo,
        info: user.info,
        profileImageURL: user.profileImageURL,
        intent: intentVal,
        otp: otpVal,
        linkedInURL: user.linkedInURL,
        attendanceId : '',
        sessionId: '',
        fullName: user.firstName + ' ' + user.lastName,
        attendeeLabel : attendeeLabel
      }
      DBUtil.addObj(tblAttendee,doc,function (id,error){
          if(user.isAttendance == true){
             let attendanceDoc = {
               fullName: user.firstName + ' ' + user.lastName,
               session: {},
               sessionId: '',
               timestamp: new Date(),
               userId: id
            }
            DBUtil.addObj(tblAttendance,attendanceDoc,function (id,error){
                toast.success("User registered successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                });
            },
            function(error){
              toast.error("User not registered.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
              });
            });
          }
          else {
            toast.success("User registered successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
            compRef.setState({attendeeId:id})
            compRef.onGenerateQRcode();
             setTimeout(() => {
            compRef.resetField(true);
        }, 1000);
      },
      function(error){
          toast.error("User not registered.", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    }
  
}

  checkPreviuosCount()
  {
   DBUtil.getDocRef("Attendee").where("attendeeLabel", "==", "Del")
                .onSnapshot(function(querySnapshot) {
                    var countArray = [];
                    querySnapshot.forEach(function(doc) {
                       if(doc.data().attendeeCount!=undefined){
                        countArray.push(doc.data().attendeeCount);
                       }
                    });
       });
  }

  // Method for reset all fields
  resetField(resetFlag) {
    this.setState({
      user: {
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        profileServices: [],
        isAttendance: false,
        address: '',
        briefInfo: '',
        info: '',
        profileImageURL: '',
        linkedInURL: ''        
      },
      intent: 'Select Intent',
      invalidContact: false,
      invalidEmail: false,
      submitted: false
    });
    this.handleSelectChange(null);
    if(resetFlag != true){
        toast.success("Registration from reset successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
    });}
  }

  // Method for select/deselect profile data
  handleSelectChange(value) {
    if(value != null){
      this.state.user.profileServices.push(value);
    }
    this.setState({ value });
  }

  // Method for select intant value
  onChangeIntentField(e) {
   this.setState({
       intent: e.target.value 
    });

  }

  // Method for set attendee flag
  toggleChange() {
    const isAttendance = 'isAttendance';
    const user = this.state.user;
    user[isAttendance] = !this.state.user.isAttendance;
    this.setState({ user: user });
  }

  // Method for set only alphabets
  setInputToAlphabets(e) {
    const re = /[a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  // Method for set only Numeric
  setInputToNumeric(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  
  render() {
    const { user, submitted, value, intentVal } = this.state;    
    const options = this.state.profileDropDown;
    return (
      <div className="animated fadeIn">
          <Row className="justify-content-left">
            <Col md="8">
              <Card className="mx-6">
                <CardBody className="p-4">
                  <h1>Registration</h1>
                  <FormGroup row>
                    <Col xs="12" md="6" className={(submitted && !user.firstName ? ' has-error' : '')}  >
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="First Name" name="firstName" onKeyPress={(e) => this.setInputToAlphabets(e)} value={this.state.user.firstName} onChange={this.changeFunction} required />
                        {submitted && !user.firstName &&
                            <div className="help-block" style={{ color: "red" }}>*Required</div>
                          }
                      </InputGroup>
                    </Col>
                    <Col md="6" className={(submitted && !user.lastName ? ' has-error' : '')} >
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Last Name" name="lastName" onKeyPress={(e) => this.setInputToAlphabets(e)} value={this.state.user.lastName} onChange={this.changeFunction} required />
                        {submitted && !user.lastName &&
                            <div style={{ color: "red" }} className="help-block" >*Required</div>
                          }
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="6" className={(submitted && this.state.invalidEmail ? ' has-error' : '')}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" name="email" value={this.state.user.email} onChange={this.changeFunction} required />
                        {submitted && this.state.invalidEmail &&
                            <div style={{ color: "red" }} className="help-block">{this.state.emailError} </div>
                          }
                      </InputGroup>
                    </Col>
                    <Col md="6" className={(submitted && this.state.invalidContact ? ' has-error' : '')}  >
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-phone"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Contact" maxLength={10} name="contactNo" onKeyPress={(e) => this.setInputToNumeric(e)} value={this.state.user.contactNo}  onChange={this.changeFunction} required />
                        {submitted && this.state.invalidContact &&
                            <div style={{ color: "red" }} className="help-block">{this.state.contactError} </div>
                          }
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="6">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fas fa-address-book"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Address" name="address" value={this.state.user.address} onChange={this.changeFunction} required />
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Select
                            name= 'Profiles'
                            multi
                            onChange={this.handleSelectChange}
                            placeholder="Select Profile"
                            simpleValue
                            value={value}
                            options={options}
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col xs="12" md="6">
                      <InputGroup className="mb-3">
                        <Input type="select" style={{ width: 200 }} name="intent" value={this.state.intent}  id='intent' placeholder="Intent" onChange={(e) => this.onChangeIntentField(e)} >
                            <option value='Select Intent'>Select Intent</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Mentee">Mentee</option>
                            <option value="Investor">Investor</option>
                            <option value="Looking For Investment">Looking For Investment</option>
                        </Input>
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="6"  >
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-image"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Image URL" name="profileImageURL" value={this.state.user.profileImageURL} onChange={this.changeFunction} required />
                      </InputGroup>
                    </Col>
                  </FormGroup>  
                  <FormGroup row>
                    <Col xs="12" md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-linkedin"></i></InputGroupText>
                          </InputGroupAddon>
                             <Input type="text" placeholder="LinkedIn URL" name="linkedInURL" value={this.state.user.linkedInURL} onChange={this.changeFunction} />
                        </InputGroup>
                    </Col>
                    <Col xs="12" md="6">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-info"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Info" name="info" value={this.state.user.info} onChange={this.changeFunction} required />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-info"></i></InputGroupText>
                          </InputGroupAddon>
                             <Input type="textarea" placeholder="Brief Info" name="briefInfo" value={this.state.user.briefInfo} onChange={this.changeFunction} />
                        </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label> Mark as Attendance &nbsp;
                        <input type="checkbox" checked={this.state.user.isAttendance} onChange={this.toggleChange} />
                      </Label>
                    </div>  
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="12">
                      <Button type="submit" size="md" color="success" onClick={this.submitFunction} ><i className="icon-note"></i> Register</Button> &nbsp;&nbsp;                        
                      <Button onClick={this.resetField} type="reset" size="md" color="danger" ><i className="fa fa-ban"></i> Reset</Button>
                      <ToastContainer autoClose={4000} />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
         <div>
      
        </div>
      </div>
    )
  }
}
export default Registration;


