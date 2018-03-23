import React, { Component } from 'react'
import { auth } from '../../../services/Authentication/Auth'
import { Label, CardHeader, Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from 'reactstrap';

function setErrorMsg(error) {
  console.log('message', error.message);
  this.setState({ ErrorPresent: true })
  return {
    registerError: error.message
  }

}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        Password : "",
        emailId : "",
        firstName : "",
        lastName : "",
        contactNo : ""
      },
      registerError: "",
      ErrorPresent: false
    };
    this.OnChange = this.OnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.OnRedirect =  this.OnRedirect.bind(this);

  }
  OnChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault()
    let CompRef = this;
    auth(CompRef.state.user.emailId, CompRef.state.user.Password)
      .catch(e => this.setState({ registerError: e.message, ErrorPresent: true }))
  }

  render() {
    return (



      <div>
        <Row className="justify-content-left">
          <Col md="8">
            <Card className="">
              <CardHeader>
                <label className="regHeading">User Form</label>
              </CardHeader>
              <CardBody className="p-4">
                <form name="form" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Col md="6" >
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="First Name" name="firstName" value={this.state.user.firstName}
                          onChange={this.OnChange} />
                      </InputGroup>
                    </Col>
                    <Col md="6" >
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Last Name" name="lastName" value={this.state.user.lastName}
                          onChange={this.OnChange} />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <br />
                  <FormGroup row>
                    <Col md="6" >
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email Id" name="emailId" value={this.state.user.emailId}
                          onChange={this.OnChange} />
                      
                      </InputGroup>
                      {
                          this.state.registerError &&
                          <div className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error:</span>
                            &nbsp;{this.state.registerError}
                            {this.state.ErrorPresent}
                          </div>
                        }
                    </Col>
                    <Col md="6">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" placeholder="Contact Number " name="contactNo" value={this.state.user.contactNo}
                          onChange={this.OnChange} />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <br />
                  <Row>
                    <Col md="6" >
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="Password" value={this.state.user.Password}
                          onChange={this.OnChange} />
                      </InputGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                                        <Col md="6" >
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
                                    </Row> */}
                  <br />
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Button type="submit" color="success">Register</Button>
                      &nbsp;&nbsp;
                      {/* <Button onClick={this.resetField} color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


// <div className="col-sm-6 col-sm-offset-3">
// <h1>Register</h1>
// <form onSubmit={this.handleSubmit}>
//   <div className="form-group">
//     <label>Email</label>
//     <input className="form-control" name="Email"  onChange={this.OnChange} placeholder="Email"/>
//   </div>
//   <div className="form-group">
//     <label>Password</label>
//     <input type="password" name="Password" className="form-control" onChange={this.OnChange} placeholder="Password"  />
//   </div>
//   {
//     this.state.registerError &&
//     <div className="alert alert-danger" role="alert">
//       <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
//       <span className="sr-only">Error:</span>
//       &nbsp;{this.state.registerError} 
//       {this.state.ErrorPresent}
//     </div>
//   }
//   <button type="submit"  className="btn btn-primary">Register</button>
// </form>
// </div>