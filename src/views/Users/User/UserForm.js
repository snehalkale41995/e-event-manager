

import React from 'react';
import {Label, CardHeader, Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup} from 'reactstrap';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {DBUtil} from '../../../services';
import *as firebase from 'firebase';
import 'firebase/firestore';
import {createBrowserHistory } from 'history';  
var history = createBrowserHistory()
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        var history= {history}
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                emailId: '',
                contactNo: '',
                profile: ''
            },
            submitted: false,
            isChecked: true,
            profilesValue: '',
            profileData :[]
        };

        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
        this.toggleChange =this.toggleChange.bind(this);
        this.getProfileList = this.getProfileList.bind(this);
        this.changeprofile=this.changeprofile.bind(this);
    }


    componentWillMount()
     {
         
      this.getProfileList();
    }
     
     changeprofile (profilesValue) {
        const profile = 'profile';
        const user = this.state.user;
        user[profile] = profilesValue;
        this.setState({user: user});
    
        this.setState({profilesValue });
        console.log(this.state.user.profile);
    }


     getProfileList()
        {
          let thisRef = this;
          let listItem = [];
         let i;
       DBUtil.addChangeListener("Profiles", function(list)
       {
        list.forEach(function(document) {
        for(var i=0;i<document.data().profile.length;i++)
         {
         listItem.push({label:document.data().profile[i] , value:document.data().profile[i]})
         }});
     
        thisRef.setState(
             {profileData : listItem});
        })
      }


    changeFunction(event) {
       
        const { name, value } = event.target;
      
        const { user } = this.state;
      
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    submitFunction(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
       
        if (user.firstName && user.lastName && user.emailId) {
         
          let compRef = this;
         DBUtil.addObj("Attendee", user, function(response)
        {
             alert("added successfully")
             compRef.props.history.push('/user');
        })
        }
       }

   



      resetField()
      {
         this.setState({
            user: {
                firstName: '',
                lastName: '',
                emailId: '',
                contactNo: '',
                profile :''
            },
           isChecked : false
          
        });
        }
  
       toggleChange()
       {
           this.setState({isChecked : !this.state.isChecked})
          // console.log("chekbox",this.state.isChecked )
       }


    render() {
       
        const { user, submitted, profilesValue ,profileData} = this.state;
     
         let options =profileData;
     
        return (
            <div className="animated fadeIn">
             <div>
            <Link to="/user"> <Button type="button" color="secondary"> Back to List </Button></Link>
            </div>
            <br/>
            <br/>
              <Container>
            
                 <Row className="justify-content-center">
                 <Col md="12">
                 <Card className="mx-4">
                <CardHeader>
                 <i className="fa fa-align-justify"></i>
                  User Form
                </CardHeader>

           
                 <CardBody className="p-4">
                 
                  
                <form name="form" onSubmit={this.submitFunction}>

                    
                <FormGroup row>
                  <Col md="6" className={(submitted && !user.firstName ? ' has-error' : '')}>        
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-user"></i>
                    </InputGroupText>
                    </InputGroupAddon>
                  <Input type="text" placeholder="Enter First Name" name="firstName" value={this.state.user.firstName} 
                   onChange={this.changeFunction}/>
                    {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                 </InputGroup>
                 </Col>

                  <Col  md="6" className={(submitted && !user.lastName ? ' has-error' : '')}>        
                  <InputGroup>
                   <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-user"></i>
                    </InputGroupText>
                    </InputGroupAddon>
                  <Input type="text" placeholder="Enter Last Name" name="lastName" value={this.state.user.lastName} 
                   onChange={this.changeFunction}/>
                   {submitted && !user.lastName &&
                             <div className="help-block">last name is required</div>
                         }
                 </InputGroup>
                 </Col>
                </FormGroup>
  
                <br/>
              


                  <FormGroup row>
                  <Col md="6" className={(submitted && !user.emailId ? ' has-error' : '')}>        
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">
                   
                   <InputGroupText>@</InputGroupText>
                   
                    </InputGroupAddon>
                  <Input type="text" placeholder="Enter valid Email Id" name="emailId" value={this.state.user.emailId} 
                   onChange={this.changeFunction}/>
                   {submitted && !user.emailId &&
                             <div className="help-block">emailId is required</div>
                         }
                 </InputGroup>
                 </Col>

                  <Col  md="6">        
                  <InputGroup>
                 <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-phone"></i>
                    </InputGroupText>
                    </InputGroupAddon>
                  <Input type="numner" placeholder="Enter Contact Number " name="contactNo" value={this.state.user.contactNo} 
                   onChange={this.changeFunction}/>
                 </InputGroup>
                 </Col>

                </FormGroup>

                <br/>

                  
                
               
               


           <Row>
           <Col md="6" className={(submitted && !user.profiles ? ' has-error' : '')}>        
           <FormGroup>
           <Select
           onChange={this.changeprofile}
           placeholder="Select Profile"
            simpleValue
            value={profilesValue}
           options={options}
          />
          </FormGroup>
          </Col>
         </Row>
             <br/>
               <Row>
                  <Col xs="12">        
                  <FormGroup>
                 <input type="checkbox"  value = {this.state.isChecked}  onChange={this.toggleChange} />
                  <Label> Reset Password on sign on  </Label>
                  </FormGroup>
                 </Col>
                </Row>

               <Row>
               <Col xs="12">  
               <h1>   </h1>
               <br/>
               </Col>
               </Row>    

               <Row>
               <Col sm={{ size: 'auto', offset: 2 }}>
               <Button type="submit" color="primary">Create User</Button>
               </Col>
              <Col sm={{ size: 'auto', offset: 3 }}>
              <Button onClick={this.resetField} color="success"><i className="fa fa-dot-circle-o"></i>Reset</Button>
              </Col>
              </Row>
  
                 </form>
                </CardBody>
                </Card>
                </Col>
                </Row>
                 
                </Container>
          
            </div>
      
        );
    }
}

export default UserForm;