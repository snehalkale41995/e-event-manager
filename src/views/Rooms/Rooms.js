import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Container, Input, InputGroup, InputGroupText, InputGroupAddon, Badge, Row, Col, Progress, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardHeader, CardBody, CardFooter, CardTitle, Button, ButtonToolbar,
    ButtonGroup, ButtonDropdown, Label, Table, Form, FormGroup, FormText,
} from 'reactstrap';
import { createBrowserHistory } from 'history';
var history = createBrowserHistory();
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));


class Rooms extends Component {
    constructor(props) {
        super(props);
        var history = { history }
        this.items = [];
        this.state = {
            Room: {
                RoomName: '',
                Capacity: '',
                AvailableServices: []
            },
            submitted: false,
            isChecked: true,
            //show : " "
        };

        //this.FLAVOURS = ['P', 'K', 'S'];
        // this.toggle = this.toggle.bind(this);
        this.changeFunction = this.changeFunction.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetField = this.resetField.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
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
        let length = this.state.Room.AvailableServices.length;
        let s = this.state.Room.AvailableServices[length -1]
        let ss= s.split(',');
        this.state.Room.AvailableServices= ss;
        console.log('New Room', Room)
        //alert('Success');
        //console.log(this.state.Room);
        if (Room.RoomName && Room.Capacity) {
            //console.log("yess")
            this.props.history.push('/login');
        }
    }
    resetField() {
        this.setState({
            Room: {
                RoomName: '',
                Capacity: '',
                AvailableServices: []
            },
            isChecked: false
        });
    }
    toggleChange() {
        this.setState({ isChecked: !this.state.isChecked })
        console.log("checkbox", this.state.isChecked)
    }
//////////////////////////////

getInitialState () {
    return {
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,
        value: [],
        rtl: false,
    };
}
handleSelectChange (value) {
    this.state.Room.AvailableServices.push(value);
    console.log('You have selected:', value);
    this.setState({value });
}
toggleCheckbox (e) {
    this.setState({
        [e.target.name]: e.target.checked,
    });
}
toggleRtl (e) {
    let rtl = e.target.checked;
    this.setState({ rtl });
}
///////////////////////////////
    render() {
        const { Room, submitted, value ,crazy, disabled, stayOpen, } = this.state;
        //const options = FLAVOURS;
        //const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
      
        let optionItems = FLAVOURS.map((Fplanet) =>
            <option key={Fplanet.value}>{Fplanet.value}</option>
        );

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
                                       
                                        <Select
                                            closeOnSelect={!stayOpen}
                                            disabled={disabled}
                                            multi
                                            //onChange={this.changeFunction}
                                            onChange={this.handleSelectChange}
                                            options={options}
                                            placeholder="Select your favourite(s)"
                                            removeSelected={this.state.removeSelected}
                                            rtl={this.state.rtl}
                                            simpleValue
                                            value={value}
                                        />
                                        
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col xs="6" md="3" >
                                            <Button type="submit" size="md" color="primary" onClick={this.submitFunction} >Create Room</Button>
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


{/* <FormGroup row>
                  <Col xs ="12"  md="6"  >
                  <Select
                 // closeOnSelect={!stayOpen}
                  //disabled={disabled}
                  name="AvailableServices"
                  multi
                  onChange={this.handleSelectChange}
                  options={options}
                  placeholder="Select Available Services"
                  removeSelected={this.state.removeSelected}
                //  rtl={this.state.rtl}
                  simpleValue
                  value={item}
              />
             <div> {this.state.Room.AvailableServices} </div>
               </Col>
                  </FormGroup> */}