import React, {Component} from 'react';
import { Row, Col, Card, CardBody, CardHeader, 
    CardFooter, FormGroup,Button, Label
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import { ToastContainer, toast } from 'react-toastify';  
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class SessionRegistration extends Component{
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            eventDropDown: [],
            attendeeCount: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.getRegistrationResponseData = this.getRegistrationResponseData.bind(this);
        this.deleteRegistrationData = this.deleteRegistrationData.bind(this);
    }
    
    componentWillMount() {
        let componentRef = this;
        DBUtil.getDocRef("Sessions")
        .get().then((snapshot) => {
            let events  = [], eventList = [], eventsID = [];
            snapshot.forEach(function (doc) {
                if(doc.data().sessionType != "break"){
                    eventList.push({                    
                        label: doc.data().eventName,
                        value: doc.id
                    });
                }
            });   
            componentRef.setState({eventDropDown : eventList});
        });

       this.getRegistrationResponseData();
    }

    // Method for get all Registration Response data 
    getRegistrationResponseData(){
        let componentRef = this;
        DBUtil.getDocRef("RegistrationResponse")
        .get().then((snapshot) => {
            let registrationList = [];
            snapshot.forEach(function (doc) {
                registrationList.push({                    
                    id: doc.id,
                    fullName: Object.keys(doc.data().attendee).length != 0 ?  doc.data().attendee.firstName + ' ' + doc.data().attendee.lastName : '',
                    sessionName: doc.data().session != undefined ? doc.data().session.eventName : '',
                    email: Object.keys(doc.data().attendee).length != 0 ? doc.data().attendee.email : ''
                });
            });              
            componentRef.setState({response : registrationList, attendeeCount: registrationList.length});
        });
    }


    handleSelectChange(value) {
        let registrationList = []; 
        this.setState({
            value           
        });
        if(value != null){
            // Query for get attendance data by session Id
            DBUtil.getDocRef("RegistrationResponse")
            .where("sessionId", "==", value)
            .get().then((snapshot) => {
                snapshot.forEach(function (doc) {
                    registrationList.push({                    
                        id: doc.id,
                        sessionId: doc.data().sessionId,
                        fullName: Object.keys(doc.data().attendee).length != 0 ?  doc.data().attendee.firstName + ' ' + doc.data().attendee.lastName : '',
                        sessionName: doc.data().session != undefined ? doc.data().session.eventName : '',
                        email: Object.keys(doc.data().attendee).length != 0 ? doc.data().attendee.email : ''
                    });
                });  
                this.setState({response : registrationList, attendeeCount: registrationList.length});
            });
        }
        else {
            // Set default value for current state
            this.getRegistrationResponseData();
        }
    }

    // Method for delete records
    deleteRegistrationData(row){
        let compRef = this;
        DBUtil.getDocRef("RegistrationResponse").doc(row.id).delete().then(function (response) {
            compRef.handleSelectChange(row.sessionId);
            toast.success("Deleted successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        });
    }

    // Method for declare delete button
    ondeleteRegistration(cell, row) {
        let componentRef = this;
        return  <Link to={this}  onClick={() => componentRef.deleteRegistrationData(row)}>
                    <i className="fa fa-trash"></i>
                </Link>        
    }

    render(){
        const { value } = this.state; 
        const eventOptions = this.state.eventDropDown;

        // Define constant for sorting
        const options = {
            sizePerPageList: [{
                text: '250', value: 250
                },{
                text: '500', value: 500
                },{
                text: '1000', value: 1000
                }, {
                text: 'All', value: this.state.response.length
                } ], // you can change the dropdown list for size per page
                sizePerPage: 250,  // which size per page you want to locate as default
        };

        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <FormGroup row className="marginBottomZero">
                                        <Col xs="12" md="9">
                                            <h1 className="regHeading paddingTop8">Session Registration List</h1>
                                        </Col>
                                        <Col xs="12" md="3">
                                                <Select
                                                    placeholder="Select Session"
                                                    simpleValue
                                                    value={value}
                                                    options={eventOptions}
                                                    onChange={this.handleSelectChange}
                                                    />
                                            </Col>
                                </FormGroup>
                            </CardHeader>
                            <CardBody>
                                <div><Label>Count : </Label> {this.state.attendeeCount} </div>
                                <div>
                                     <BootstrapTable ref='table' data={this.state.response} pagination={true} search={true} options={options}  exportCSV={ true }>
                                         <TableHeaderColumn dataField='id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                                         <TableHeaderColumn dataField='fullName' headerAlign='left' width='160' csvHeader='Name'>Name</TableHeaderColumn>
                                         <TableHeaderColumn dataField='email' headerAlign='left' width='160' csvHeader='Email'>Email</TableHeaderColumn>
                                         <TableHeaderColumn dataField='sessionName' headerAlign='left' width='300' csvHeader='Session Name'>Session Name</TableHeaderColumn>
                                         <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteRegistration.bind(this)} headerAlign='left' width='100' export={false}>Action</TableHeaderColumn>
                                         <TableHeaderColumn dataField='sessionId' headerAlign='left' export={false} hidden></TableHeaderColumn>
                                     </BootstrapTable>
                                     <ToastContainer autoClose={2000} />
                                </div>  
                            </CardBody> 
                        </Card>
                    </Col>   
                </Row>
            </div>
        );
    }
}

export default SessionRegistration;
