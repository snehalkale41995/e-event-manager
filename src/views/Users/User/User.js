

import React from 'react';
import {Label, CardHeader, Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup} from 'reactstrap';



class User extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                emailId: '',
                contactNo: '',
                profile: ''
            },
            submitted: false,
            isChecked: true
        };

        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
        this.toggleChange =this.toggleChange.bind(this);
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
         console.log("user", user)
        
        if (user.firstName && user.lastName && user.emailId) {
          console.log("yess")
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
           console.log("chekbox",this.state.isChecked )
       }


    render() {
       
        const { user, submitted } = this.state;
       
        return (
            <div className="app flex-row align-items-center">
                 <Container>
                 <Row className="justify-content-center">
                 <Col md="6">
                 <Card className="mx-4">
                <CardHeader color="primary">
                <strong>User Creation Form</strong>

                </CardHeader>
                 <CardBody className="p-4">
                 
                  
                <form name="form" onSubmit={this.submitFunction}>

                    
                  <Row>
                  <Col xs="12" className={(submitted && !user.firstName ? ' has-error' : '')}>        
                  <FormGroup>
                  <Label> First Name : </Label>
                  <Input type="text" placeholder="Enter First Name" name="firstName" value={this.state.user.firstName} 
                   onChange={this.changeFunction}/>
                    {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                 </FormGroup>
                 </Col>
                </Row>


                    
                  <Row>
                  <Col xs="12" className={(submitted && !user.lastName ? ' has-error' : '')}>        
                  <FormGroup>
                  <Label> Last Name : </Label>
                  <Input type="text" placeholder="Enter Last Name" name="lastName" value={this.state.user.lastName} 
                   onChange={this.changeFunction}/>
                   {submitted && !user.lastName &&
                             <div className="help-block">last name is required</div>
                         }
                 </FormGroup>
                 </Col>
                </Row>


                  <Row>
                  <Col xs="12" className={(submitted && !user.emailId ? ' has-error' : '')}>        
                  <FormGroup>
                  <Label> Email Id : </Label>
                  <Input type="text" placeholder="Enter valid Email Id" name="emailId" value={this.state.user.emailId} 
                   onChange={this.changeFunction}/>
                   {submitted && !user.emailId &&
                             <div className="help-block">emailId is required</div>
                         }
                 </FormGroup>
                 </Col>
                </Row>

                      

                  <Row>
                  <Col xs="12">        
                  <FormGroup>
                  <Label> Contact Number : </Label>
                  <Input type="numner" placeholder="Enter Contact Number " name="contactNo" value={this.state.user.contactNo} 
                   onChange={this.changeFunction}/>
                 </FormGroup>
                 </Col>
                </Row>
               
             
                <Row>
               <Col xs="12">  
               <FormGroup>
               <Label>Profile :</Label>
              <Input type="select" name="profile" checked={this.state.user.profile}  onChange={this.changeFunction}>
              <option>select profile</option>
              <option>Volunteers</option>
              <option>Delegates</option>
              <option>Sponsors</option>
              <option>Charter members</option>
              </Input>
              </FormGroup>
              </Col>
              </Row>
           
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

export default User;