import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';


import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  InputGroup,
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Container,
  InputGroupAddon,
  InputGroupText
} from  'reactstrap';





class SessionForm extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            EventObj: {
                eventName: '',
                room : '',
                extraServices:'',
                speakers: [],
                volunteers: []
            },
            submitted: false,
            speakersValue :'',
            volunteersValue: '',
            isChecked: true
        };

       
        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
       this.toggleChange=this.toggleChange.bind(this);
        this.multichangeSpeakers = this.multichangeSpeakers.bind(this);
        this.multichangeVolunteers = this.multichangeVolunteers.bind(this);
    }

    changeFunction(event) {
        const { name, value } = event.target;
        const { EventObj } = this.state;
        this.setState({
            EventObj: {
                ...EventObj,
                [name]: value
            }
        });
    }

    submitFunction(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { EventObj } = this.state;
        
        let length = EventObj.speakers.length;
       let lastElement = EventObj.speakers[length -1]
       let speakerArray= lastElement.split(',');
       this.state.EventObj.speakers= speakerArray;

       let len = EventObj.volunteers.length;
       let lastEle = EventObj.volunteers[len -1]
       let volunteersArray= lastEle.split(',');
       this.state.EventObj.volunteers= volunteersArray;


        console.log('EventObj', EventObj)
       
       
    }
    resetField() {
        this.setState({
            EventObj: {
                eventName: '',
                room: '',
                extraServices:'',
                speakers: [],
                volunteers: []
                
                
            },
           
            removeSelected: true,
            speakersValue: '',
            volunteersValue:'',
            isChecked: false
        });
    }
    

multichangeSpeakers (speakersValue) {
    this.state.EventObj.speakers.push(speakersValue);
    this.setState({speakersValue });
}

multichangeVolunteers (volunteersValue) {
  this.state.EventObj.volunteers.push(volunteersValue);
  this.setState({volunteersValue });
}

toggleChange()
{
    this.setState({isChecked : !this.state.isChecked})
    console.log("chekbox",this.state.isChecked )
}


    render() {
        const { EventObj, submitted, speakersValue, volunteersValue } = this.state;
        
		return (
           <div> 
          <div>

          <td><Link to="/session"> <Button type="button" color="primary"><i className="fa fa-chevron-left"></i> Back to List </Button><br/></Link></td>
           </div>     
          <div className="flex-row align-items-center">
            <br/>
          <Row className="justify-content-left">
          <Col md="6">
          <Card className="">
         <CardHeader color="primary">
         <strong>Event Form</strong>

         </CardHeader>
          <CardBody className="p-4">
          
           
         <form name="form" onSubmit={this.submitFunction}>

             
           <Row>
           <Col xs="12" className={(submitted && !EventObj.eventName ? ' has-error' : '')}>        
           <FormGroup>
           <Label> Event Name : </Label>
           <Input type="text" placeholder="Event Name" name="eventName" value={this.state.EventObj.eventName}  onChange={this.changeFunction} />
           {submitted && !EventObj.eventName && <div className="help-block">Event Name is required</div> }
           </FormGroup>
           </Col>
           </Row>


             
           <Row>
           <Col xs="12" className={(submitted && !EventObj.room ? ' has-error' : '')}>        
           <FormGroup>
           <Label>room :</Label>
           <Input type="select" name="room" value={this.state.EventObj.room} onChange={this.changeFunction}>
           <option>select room</option>
            <option>room1</option>
           <option>room2</option>
           <option>room3</option>
           <option>room4</option>
           </Input>
           {submitted && !EventObj.room && <div className="help-block">please select room</div> }
          </FormGroup>
          </Col>
         </Row>


           <Row>
           <Col xs="12" className={(submitted && !EventObj.speakers ? ' has-error' : '')}>        
           <FormGroup>
           <Label> select speakers </Label>
           <Select
           multi
           onChange={this.multichangeSpeakers}
           placeholder="---Select---"
            simpleValue
            value={speakersValue}
            options={[
             { value: 'sp1', label: 'sp1' },
             { value: 'sp2', label: 'sp2' },
             { value: 'sp3', label: 'sp3' },
             { value: 'sp4', label: 'sp4' },
             ]}
          />
          </FormGroup>
          </Col>
         </Row>


         <Row>
           <Col xs="12" className={(submitted && !EventObj.speakers ? ' has-error' : '')}>        
           <FormGroup>
           <Label> select volunteers </Label>
           <Select
           multi
           onChange={this.multichangeVolunteers}
           placeholder="---Select---"
            simpleValue
            value={volunteersValue}
            options={[
             { value: 'vol1', label: 'vol1' },
             { value: 'vol2', label: 'vol2' },
             { value: 'vol3', label: 'vol3' },
             { value: 'vol4', label: 'vol4' },
             ]}
          />
          </FormGroup>
          </Col>
         </Row>


         <Row>
           <Col xs="12">        
           <FormGroup>
           <Label> Extra Services : </Label>
           <Input type="textarea" placeholder="extra services" name="extraServices" value={this.state.EventObj.extraServices}  onChange={this.changeFunction} />
          </FormGroup>
           </Col>
           </Row>     

           
        <Row>
           <Col xs="12">        
           <FormGroup>
          <input type="checkbox"  value = {this.state.isChecked}  onChange={this.toggleChange} />
           <Label className="regLabelForm"> Registration required </Label>
           </FormGroup>
          </Col>
         </Row>

        <Row>
        <Col xs="12">  
        <h1>   </h1>
        <br/>
        </Col>
        </Row>    

        

        <FormGroup row className="noBottomMargin">
            <Col xs="6" md="12" >
                <Button type="submit" color="success">Create Event</Button>
                &nbsp;&nbsp;
                <Button onClick={this.resetField} color="danger"><i className="fa fa-ban"></i>Reset</Button>
            </Col>
        </FormGroup>

          </form>
         </CardBody>
         </Card>
         </Col>
         </Row>
         
     </div>
</div>
        )
    }
}

export default SessionForm;
