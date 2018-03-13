import React, {Component} from 'react';
import {
    Container, Input, InputGroup, InputGroupText, InputGroupAddon, Badge, Row, Col, Progress, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardHeader, CardBody, CardFooter, CardTitle, Button, ButtonToolbar,
    ButtonGroup, ButtonDropdown, Label, Table, Form, FormGroup, FormText,
} from 'reactstrap';

class Role extends Component{
    constructor(props){
        super(props);

        this.state = {
            role : {
                name: '',   
                features: [{
                        id: 1,
                        name: 'User',
                        isChecked: false
                    },
                    {
                        id: 2,
                        name: 'Role',
                        isChecked: false
                    },
                    {
                        id: 3,
                        name: 'Session',
                        isChecked: false
                    },
                    {
                        id: 4,
                        name: 'Reports',
                        isChecked: false
                    },
                    {
                        id: 5,
                        name: 'Attendance',
                        isChecked: false
                    }            
                ],
            },
            submitted: false    
        };

        this.changeRoleNameState = this.changeRoleNameState.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    changeRoleNameState(e){
        const { name, value } = e.target;
        const { role } = this.state;
        this.setState({
            role: {
                ...role,
                [name]: value
            }});            
    }

    resetFields(){
        const { role } = this.state;       
        this.state.role.name = '';
        var features = this.state.role.features;
        features.forEach(function(element) {
            if(element.isChecked == true){
                element.isChecked = false
            }            
        }, this);
        this.setState({
            role: {
                ...role,   
                [name]: '',           
                [features]: features
            }
        });
    }

    submitFunction(event){
        event.preventDefault();        
        this.setState({ submitted: true });        
        console.log('Role name: ', this.state.role.name);
        console.log('Features' , this.state.role.features);
    }

    handleInputChange(event) {
        const target = event.target;
        var features = this.state.role.features;
        features.forEach(function(element) {
            if(element.name == target.value){
                element.isChecked = target.checked
            }            
        }, this);

        const { test, value } = event.target;
        const { role } = this.state;
        this.setState({
            role: {
                ...role,
                [features]: features
            }
        });
      }

    render(){
        const { role, submitted } = this.state;   
        var tempThis = this;
        var checkList = this.state.role.features.map(function(item){
            return <label key={item.id}><input key={item.id} type="checkbox" name="features" value={item.name} checked={item.isChecked} onChange={tempThis.handleInputChange} /> &nbsp;{item.name}&nbsp;&nbsp; </label>;
          })
       
        return (
            <div className="app flex-row"> 
                <Container>
                    <Row>
                        <Col md="6">
                            <Card className="mx-4">
                                <CardHeader color="primary">
                                    <strong>Role Creation</strong>
                                </CardHeader>
                                <CardBody className="p-4">                            
                                    <form name="form" onSubmit={this.submitFunction}> 
                                        <Row>
                                            <Col xs="12" className={(submitted && !this.state.role.name ? ' has-error' : '')}>        
                                                <FormGroup>
                                                    <Label> Name : </Label>
                                                    <Input type="text" placeholder="Enter Role Name" name="name" value={this.state.role.name} 
                                                        onChange={this.changeRoleNameState}/>
                                                        { submitted && !this.state.role.name &&
                                                                <div className="help-block">Role name is required</div>
                                                        }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">        
                                                <FormGroup>
                                                    <Label>Features : </Label> <br/>
                                                    { checkList }  
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">  
                                                <br/>
                                            </Col>
                                        </Row>  
                                        <Row>
                                            <Col sm={{ size: 'auto'}}>
                                                <Button type="submit" color="primary">Submit</Button>
                                            </Col>
                                            <Col sm={{ size: 'auto'}}>
                                                <Button onClick={this.resetFields} color="primary">Reset</Button>
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

export default Role;
