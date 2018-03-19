import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Container, Input, InputGroup, InputGroupText, InputGroupAddon, Badge, Row, Col, Progress, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardHeader, CardBody, CardFooter, CardTitle, Button, ButtonToolbar,
    ButtonGroup, ButtonDropdown, Label, Table, Form, FormGroup, FormText,
} from 'reactstrap';
import Select from 'react-select';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import 'react-select/dist/react-select.css';
import { createBrowserHistory } from 'history';

var history = createBrowserHistory();
let ArrayService = [];

class Rooms extends Component {
    constructor(props) {
        super(props);
        var history = { history }
        this.items = []; 
        this.state = {
            Room: {
                RoomName: '',
                Capacity: '',
                bufferCapacity : '',
                AvailableServices: []
            },
            ServiceDropDown: [],
            submitted: false,
            isChecked: true
        };
        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);   
    }

    componentWillMount() {
        let componentRef = this;
        DBUtil.addChangeListener("AvailableServices", function (objectList) {
            let Services = [];
            let ArrayService = [];
            objectList.forEach(function (doc) {
               Services.push(doc.data());
            });            
            const ServicesArray = Services[0].Services;
            ServicesArray.forEach(function (item){
                ArrayService.push({label : item , value : item });
            });
            componentRef.setState({ServiceDropDown : ArrayService})
        });
    }

    changeFunction(event) {
        const { name, value } = event.target;
        const { Room } = this.state;
        this.setState({
            Room: {
                ...Room,
                [name]: value
            }
        });
    }

    submitFunction(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { Room } = this.state;
       // console.log('New Room', Room)
        if (Room.RoomName && Room.Capacity ) {
            if(this.state.Room.AvailableServices.length > 0){
                let length = this.state.Room.AvailableServices.length;
                let serviceString = this.state.Room.AvailableServices[length - 1]
                if(serviceString == ""){
                    this.state.Room.AvailableServices = [];
                }
                else{
                    let serviceArray = serviceString.split(',');
                    this.state.Room.AvailableServices = serviceArray;
                }
            } 
            //parameters to add doc function
            let componentRef = this;
            let tableName = "Rooms";
            let docName = Room.RoomName;
            let doc= {
                RoomName: Room.RoomName,
                Capacity: Room.Capacity,
                bufferCapacity: Room.bufferCapacity,
                AvailableServices: Room.AvailableServices
            }
            DBUtil.addDoc(tableName, docName, doc ,function(){          //add doc to firebase
                console.log('added');
                alert("Room " + docName + " successfully added" );
                componentRef.props.history.push('/dashboard');
            },
            function(err){
                console.log('Error' , err);
            });
          //  this.props.history.push('/login');
        }
    }
    resetField() {
        this.setState({
            Room: {
                RoomName: '',
                Capacity: '',
                bufferCapacity : '',
                AvailableServices: [], 
            },
            isChecked: false
        });
    }
   
    handleSelectChange(value) {
        this.state.Room.AvailableServices.push(value);
        this.setState({ value });
    }
    
    render() {
        const { Room, submitted, value ,ServiceDropDown} = this.state;   
        const options = this.state.ServiceDropDown;

        return (
            <div className="animated fadeIn">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12">
                            <Card className="mx-6">
                                <CardBody className="p-4">
                                    <h1>Room</h1>
                                    <FormGroup row>
                                        <Col xs="12" md="6" className={(submitted && !Room.RoomName ? ' has-error' : '')}  >
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-home"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Room Name" name="RoomName" value={this.state.Room.RoomName} onChange={this.changeFunction} />
                                            </InputGroup>
                                            <Row>
                                                <Col md="6">
                                                    {submitted && !Room.RoomName &&
                                                        <div style={{color: "red"}} className="help-block">*Required</div>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6"  >
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="icon-pie-chart"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="number" placeholder="Capacity" name="Capacity" value={this.state.Room.Capacity} onChange={this.changeFunction} />
                                            </InputGroup>
                                            <Row>
                                                <Col md="6">
                                                {submitted && !Room.Capacity &&
                                                <div style={{color: "red"}} className="help-block">*Required</div>
                                            }
                                                </Col>
                                            </Row>
                                        </Col>
                                       
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col xs="12"  md="6"  >
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="icon-pie-chart"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="number" placeholder="Buffer Capacity" name="bufferCapacity" value={this.state.Room.bufferCapacity} onChange={this.changeFunction} />
                                            </InputGroup>
                                        </Col>
                                        <Col  md="6" className={(submitted && !Room.AvailableServices ? ' has-error' : '')}>
                                            <FormGroup>
                                                <Select
                                                    multi
                                                    onChange={this.handleSelectChange}
                                                    placeholder="Select Services"
                                                    simpleValue
                                                    value={value}
                                                    options={options}
                                                />
                                            </FormGroup>
                                        </Col>                                      
                                        </FormGroup>
                                    <FormGroup row>
                                        <Col xs="6" md="3" >
                                            <Button type="button" size="md" color="primary" onClick={this.submitFunction} >Create Room</Button>
                                        </Col>
                                        <Col md="3">
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

export default Rooms;
    