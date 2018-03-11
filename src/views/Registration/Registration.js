import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Container,Input, InputGroup, InputGroupText,InputGroupAddon,Badge,Row,Col,Progress,Dropdown,DropdownToggle,
  DropdownMenu,DropdownItem,Card,CardHeader,CardBody,CardFooter,CardTitle,Button,ButtonToolbar,
  ButtonGroup,ButtonDropdown,Label,Table,Form,FormGroup,FormText,} from 'reactstrap';
import {createBrowserHistory } from 'history';  
var history = createBrowserHistory();

class Registration extends Component {
    constructor(props) {
        super(props);
        var history= {history}
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                Email: '',
                City: '',
                Contact: '',
                Conference: '',
                Role: ''
            },
            submitted: false,
            isChecked: true
        };
       // this.toggle = this.toggle.bind(this);
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
       console.log('New Member',user)
       //alert('Success');
       //console.log(this.state.user);
       if (user.firstName && user.lastName && user.Email) {
        //console.log("yess")
        this.props.history.push('/login');
    }
       
    }
    resetField()
    {
       this.setState({
          user: {
            firstName: '',
            lastName: '',
            Email: '',
            City: '',
            Contact: "",
            Conference: "",
            Role: ''
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
      <div className="animated fadeIn">
       <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <Card className="mx-6">
                <CardBody className="p-4">  
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  {/* //////////////////////////////////////////////// */}
                  <FormGroup row>
                 <Col xs="12" md= "6" className={(submitted && !user.firstName ? ' has-error' : '')}  >
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="First Name" name="firstName" value={this.state.user.firstName} onChange={this.changeFunction}/>
                    
                    {submitted && !user.firstName &&

                            <div className="help-block">First Name is required</div>
                        }
                        
                  </InputGroup>
                  </Col>
                  {/* </FormGroup> */}

                  {/* ///////////////////////////////////////////// */}
                  {/* <FormGroup row> */}
                  <Col md= "6"  className={(submitted && !user.lastName ? ' has-error' : '')} >
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Last Name" name="lastName" value={this.state.user.lastName} onChange={this.changeFunction}/>
                    {submitted && !user.lastName &&
                             <div className="help-block">last name is required</div>
                         }
                  </InputGroup>
                  </Col>
                  </FormGroup>

                  {/* ///////////////////////////////////// */}
                  
                  <FormGroup row>
                  <Col xs="12"  md= "6" className={(submitted && !user.Email ? ' has-error' : '')}>
                  <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email"  name="Email" value={this.state.user.Email} onChange={this.changeFunction}/>
                    {submitted && !user.Email &&
                             <div className="help-block">Email Id is required</div>
                         }
                  </InputGroup>
                  </Col>
                  {/* </FormGroup>
                  {/* ///////////////////////////////////// */}
                  {/* <FormGroup row> */} 
                  <Col   md="6"  >
                  <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-phone"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Contact" maxLength="10"  name="Contact" value={this.state.user.Contact} onChange={this.changeFunction}/>
                  </InputGroup>
                  
                  </Col>
                  </FormGroup>
                {/* ///////////////////////////////////// */}

                  <FormGroup row>
                    <Col xs="12" md= "6">
                    <InputGroup className="mb-3">
                      <Input type="select" name="City" id="City" placeholder="City" checked={this.state.user.City}  onChange={this.changeFunction}>
                        <option value="">Select City</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Nashik">Nashik</option>
                      </Input>
                      </InputGroup>
                    </Col>
                    {/* </FormGroup>
                    <FormGroup row> */}
                    <Col  xs="12"  md= "6">
                    <InputGroup className="mb-3">
                      <Input type="select" name="Conference" id="Conference" placeholder="Conference" checked={this.state.user.Conference}  onChange={this.changeFunction}>
                        <option value="">Select Conference</option>
                        <option value="Conference 1">Conference 1</option>
                        <option value="Conference 2">Conference 2</option>
                        <option value="Conference 3">Conference 3</option>
                      </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                  <InputGroup className="mb-3">
                  <Col md="1">
                    <Label>Role </Label>
                  </Col>
                  <Col md="5">

                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio1" name="Role" value="Delegate" onChange={this.changeFunction} checked={this.state.user.Role === "Delegate"}/>
                      <Label className="form-check-label" check htmlFor="inline-radio1">Delegate</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio2" name="Role" value="Media" onChange={this.changeFunction} checked={this.state.user.Role === "Media"}/>
                      <Label className="form-check-label" check htmlFor="inline-radio2">Media</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio3" name="Role" value="Guest" onChange={this.changeFunction} checked={this.state.user.Role === "Guest"}/>
                      <Label className="form-check-label" check htmlFor="inline-radio3">Guest</Label>
                    </FormGroup>
                  </Col>
                  </InputGroup>
                </FormGroup>
                
                <FormGroup row>
                  <Col xs="6" md="3" >
                  <Button type="submit" size="md" color="primary" onClick={this.submitFunction} >Create Account</Button>
                  </Col>
                  <Col  md="3">
                <Button onClick={this.resetField} type="reset" size="md" color="danger" ><i className="fa fa-ban"></i> Reset</Button>
                </Col>
                </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
       

      </div>
    )
  }
}

export default Registration;


