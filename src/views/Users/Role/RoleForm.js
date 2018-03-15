import React, {Component} from 'react';
import { Container, Input, Row, Col, Card, CardHeader, CardBody,
         Button, Label, Table, Form, FormGroup, 
       } from 'reactstrap';
import RoleData from './RoleData.json'
import Feature from './Feature.js';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../../services';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


class RoleForm extends Component{
    
    constructor(props){
        super(props);
       
        this.state = {
             role : RoleData
        }

        this.changeRoleNameState = this.changeRoleNameState.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.updateFeatures = this.updateFeatures.bind(this);
        this.handleChangeChk = this.handleChangeChk.bind(this);
        this.getRoleList = this.getRoleList.bind(this);
    };

    componentWillMount() {
        this.resetFields();
        if (this.props.match.params.name != undefined){
            this.getRoleList(this.props.match.params.name);
        }       
    }

    // Method for get specific role data
    getRoleList(Param){
        let componentRef = this;
        var role = this.state.role; 
        DBUtil.addChangeListener("Roles", function (objectList) {
        objectList.forEach(function (doc) {
                if (doc.id == Param && doc.data().name == Param){
                    componentRef.setState({
                        role: doc.data()
                    }); 
                }
            });
        });
    }

    // Method for set role name 
    changeRoleNameState(e){
        const { name, value } = e.target;
        const { role } = this.state;
        this.setState({
            role: {
                ...role,
                [name]: value
            }});            
    }

    // Method for reset all fields 
    resetFields(){
        const { role } = this.state;       
        this.state.role.name = '';
        this.state.role.isSelectChk = false;
        var features = this.state.role.features;
        features.forEach(function(element) {
            element.access.forEach(function(item) {
                item.value = false;
            });
        });
        this.setState({
            role: {
                ...role,   
                [name]: '',           
                [features]: features
            }
        });
        toast.success("Role reset successfully.", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    // Method for submit & pass data to database
    submitFunction(event){
        event.preventDefault();        
        this.setState({ submitted: true });     
        const { role } = this.state;   
        //console.log('New Role : ', this.state.role);

        if (role.name) {
            let componentRef = this;
            let tableName = "Roles";
            let docName = role.name;
            let doc = {
              name: role.name,
              features: role.features,
              isSelectChk : role.isSelectChk,
              isDelete : role.isDelete
        }

        DBUtil.addDoc(tableName, docName, doc, function () {          
            toast.success("Role added successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              setTimeout(() => {
                  componentRef.props.history.push('/Role');     
              }, 3000);
          },
            function (err) {
              //console.log('Error', err);
              toast.error("Error: Role not saved.", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            });
        }
    }

    // Method for set child component of features checkboxes
    updateFeatures (e,featureId,accessId,item) {
            const target = e.target;
            var role = this.state.role;
            if (target.checked == false){
                role.isSelectChk = target.checked;
            }
            role.features.forEach(function(element) {
                if( element.id == featureId)
                {
                    element.access.forEach(function(item) {
                        if(item.id == accessId){
                            item.value = target.checked;
                        }
                    });
                }
            });
            this.setState({         
                role :  role     
            });
        }

    // Method for set select/unselect all checkboxes of role features
    handleChangeChk(e){
       this.state.role.isSelectChk = e.target.checked;
       var role = this.state.role;
       role.features.forEach(function(element) {
            element.access.forEach(function(item) {
                item.value = e.target.checked;
            });
        });
        this.setState({         
            role :  role     
        });
    }

    
    // Method for render all html 
    render(){
        const { role, submitted } = this.state;   
        return (
            <div className="app flex-row">                 
                <Container>
                <Link to="/role"> <Button type="button" color="secondary"> Back to List </Button></Link><br/><br/>
                    <Row>
                        <Col md="12">
                            <Card className="mx-4">
                                <CardBody className="p-4">  
                                    <h1>Role Creation</h1>  <br/>                        
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
                                                    <Label>Features : </Label> &nbsp;&nbsp;&nbsp;&nbsp; 
                                                    <Label>
                                                        <input type="checkbox" value={this.state.role.isSelectChk}
                                                        checked={this.state.role.isSelectChk}
                                                        onChange={this.handleChangeChk} />&nbsp;
                                                        Select All
                                                    </Label>
                                                    <br/>
                                                    <div className="row">
                                                        {this.state.role.features.map((features, i) => <Feature key = {i} 
                                                        data = {features}  updateFeatureData={this.updateFeatures} />)}
                                                    </div>
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
                                                <ToastContainer autoClose={4000} />
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
export default RoleForm;


