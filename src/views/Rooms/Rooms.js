import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Container, Input, InputGroup, InputGroupText, InputGroupAddon, Badge, Row, Col, Progress, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardHeader, CardBody, CardFooter, CardTitle, Button, ButtonToolbar,
    ButtonGroup, ButtonDropdown, Label, Table, Form, FormGroup, FormText,
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { createBrowserHistory } from 'history';
var history = createBrowserHistory();

const Services = [
    { label: 'Projector', value: 'Projector' },
    { label: 'VOIP', value: 'VOIP' },
    { label: 'LAN connection', value: 'LAN connection' },
];

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
            submitted: false,
            isChecked: true
        };
        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
       // this.toggleChange = this.toggleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
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
        console.log('New Room', Room)
        //&& Room.AvailableServices.length != 0
        if (Room.RoomName && Room.Capacity ) {
            //console.log("yess")
            this.props.history.push('/login');
        }
    }
    resetField() {
        this.setState({
            Room: {
                RoomName: '',
                Capacity: '',
                bufferCapacity : '',
                AvailableServices: []
            },
            isChecked: false
        });
    }
    // toggleChange() {
    //     this.setState({ isChecked: !this.state.isChecked })
    //     console.log("checkbox", this.state.isChecked)
    // }
    
    handleSelectChange(value) {
        this.state.Room.AvailableServices.push(value);
       // console.log('You have selected:', value);
        this.setState({ value });
    }
    
    ///////////////////////////////
    render() {
        const { Room, submitted, value } = this.state;   
        const options = Services;

        return (
            <div className="animated fadeIn">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12">
                            <Card className="mx-4">
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

                                                {submitted && !Room.RoomName &&
                                                    <div className="help-block">Room Name is required</div>
                                                }

                                            </InputGroup>
                                        </Col>
                                        <Col md="6"  >
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="icon-pie-chart"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="number" placeholder="Capacity" name="Capacity" value={this.state.Room.Capacity} onChange={this.changeFunction} />
                                            </InputGroup>
                                            {submitted && !Room.Capacity &&
                                                <div className="help-block">Capacity is required</div>
                                            }
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

