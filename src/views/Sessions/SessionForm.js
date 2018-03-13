import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';

import * as firebase from 'firebase';
import 'firebase/firestore';
import {DBUtil} from '../../services';
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
            speakerData :[],
            volunteersValue: '',
            volunteerData :[],
            roomsValue: '',
            roomData :[],
            isChecked: true
        };

       
        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
        this.toggleChange=this.toggleChange.bind(this);
        this.multichangeSpeakers = this.multichangeSpeakers.bind(this);
        this.multichangeVolunteers = this.multichangeVolunteers.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
         this.getAllList = this.getAllList.bind(this);
    }

   
      componentWillMount()
     {
       this.getAllList();

     }

     getAllList()
     { 
       let thisRef = this;
        let listSpeakers = [];
        let listVolunteers = [];
        let listRooms = []
        let i, j, k;
        
        
        
        //for speaker multiselect
         DBUtil.addChangeListener("Speakers", function(list)
       {
        list.forEach(function(document) {
            console.log(document.data(), "document.data()")
        for(var i=0;i<document.data().speaker.length;i++)
         {
         listSpeakers.push({label:document.data().speaker[i] , value:document.data().speaker[i]})
         }});
        console.log(listSpeakers, "listSpeakers");
        thisRef.setState(
             {speakerData : listSpeakers});
        })

     
        ///for volunteer multiselect
        DBUtil.addChangeListener("Volunteers", function(listResponse)
       {
        listResponse.forEach(function(doc) {
            console.log(doc.data(), "doc.data()")
        for(var j=0;j<doc.data().volunteer.length;j++)
         {
         listVolunteers.push({label:doc.data().volunteer[j] , value:doc.data().volunteer[j]})
         }});
        console.log(listVolunteers, "listVolunteers");
        thisRef.setState(
             {volunteerData : listVolunteers});
        })
    
        ////for room dropdownlist
    DBUtil.addChangeListener("Rooms", function(response)
    {
      response.forEach(function(Roomdoc)
      {
        listRooms.push({label:Roomdoc.id , value:Roomdoc.id})
      })
         console.log(listRooms, "listRooms");
    })
     thisRef.setState(
             {roomData : listRooms});

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
       console.log("in submit speakers", this.state.EventObj.speakers)

       let len = EventObj.volunteers.length;
       let lastEle = EventObj.volunteers[len -1]
       let volunteersArray= lastEle.split(',');
       this.state.EventObj.volunteers= volunteersArray;


        console.log('EventObj', EventObj)

         let compRef = this;
         DBUtil.addObj("Event", EventObj, function(response)
        {
          alert("added successfully")
          compRef.props.history.push('/session');
        })
 
       
       
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
    

 changeRoom(roomsValue) {
        const room = 'room';
        const EventObj = this.state.EventObj;
        EventObj[room] = roomsValue;
        this.setState({EventObj: EventObj});
    
        this.setState({roomsValue });
        console.log(this.state.EventObj.room);
    }



multichangeSpeakers (speakersValue) {
    this.state.EventObj.speakers.push(speakersValue);
    this.setState({speakersValue });
    console.log(this.state.EventObj.speakers, "this.EventObj.speakers")
}

multichangeVolunteers (volunteersValue) {
  this.state.EventObj.volunteers.push(volunteersValue);
  this.setState({volunteersValue });
  console.log(this.state.EventObj.volunteers, "this.EventObj.volunteers")
}

toggleChange()
{
    this.setState({isChecked : !this.state.isChecked})
    console.log("chekbox",this.state.isChecked )
}


    render() {
        const { EventObj, submitted, speakersValue, volunteersValue , speakerData , volunteerData, roomsValue, roomData} = this.state;
        
         let options = speakerData;
         let volunteerOptions = volunteerData;
         let roomOptions = roomData ;
         console.log(options, "options");
          console.log(volunteerOptions, "volunteerOptions");
		return (
           <div className="animated fadeIn"> 

          <div>
          <Link to="/session"> <Button type="button" color="secondary"> Back to List </Button></Link>
          </div>     
          <br/>
          <br/>
         
          <Container>
          <Row className="justify-content-center">
          <Col md="12">
          <Card className="mx-4">
        <CardHeader>
        <i className="fa fa-align-justify"></i>
         Event Form
        </CardHeader>
          <CardBody className="p-4">
          
           
         <form name="form" onSubmit={this.submitFunction}>

             
            <FormGroup row>
           <Col md="6" className={(submitted && !EventObj.eventName ? ' has-error' : '')}>        
           <InputGroup>
            <InputGroupAddon addonType="prepend">
            <InputGroupText>
            <i className="icon-user"></i>
             </InputGroupText>
             </InputGroupAddon>
           <Input type="text" placeholder="Event Name" name="eventName" value={this.state.EventObj.eventName}  onChange={this.changeFunction} />
           {submitted && !EventObj.eventName && <div className="help-block">Event Name is required</div> }
           </InputGroup>
           </Col>
           </FormGroup>

           <br/>
          
         
          <FormGroup row>
                  <Col md="6">        
                  <FormGroup>
                <Label> Select Room  :</Label>
                  <Select
           onChange={this.changeRoom}
           placeholder="----Select Room-----"
            simpleValue
            value={roomsValue}
           options={roomOptions}
          />
                 </FormGroup>
                 </Col>

                  <Col  md="6">        
                  <FormGroup>
             <Label> Select Speakers : </Label>
                 <Select
           multi
           onChange={this.multichangeSpeakers}
           placeholder="-----Select speakers-------"
            simpleValue
            value={speakersValue}
           options={options}
          />
                 </FormGroup>
                 </Col>

                </FormGroup>

         


         <Row>
           <Col xs="12">        
           <FormGroup>
           <Label> select volunteers </Label>
           <Select
           multi
           onChange={this.multichangeVolunteers}
           placeholder="---Select---"
            simpleValue
            value={volunteersValue}
           options={volunteerOptions}
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

          <br/>  
        <Row>
           <Col xs="12">        
           <FormGroup>
           <input type="checkbox"  value = {this.state.isChecked}  onChange={this.toggleChange} />
           <Label> Registration required </Label>
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
        <Button type="submit" color="primary">Create Event</Button>
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

        )
    }
}

export default SessionForm;
