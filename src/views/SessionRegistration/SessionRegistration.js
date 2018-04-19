import React, {Component} from 'react';
import { Row, Col, Card, CardBody, CardHeader, 
    CardFooter, FormGroup,Button
  } from 'reactstrap';

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
            response: []
        }
        this.getRegistrationResponseData = this.getRegistrationResponseData.bind(this);
        this.deleteRegistrationData = this.deleteRegistrationData.bind(this);
    }
    
    componentWillMount() {
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
                    sessionName: doc.data().session != undefined ? doc.data().session.eventName : ''
                });
            });  
            componentRef.setState({response : registrationList});
        });
    }

    // Method for delete records
    deleteRegistrationData(row){
        let compRef = this;
        DBUtil.getDocRef("RegistrationResponse").doc(row.id).delete().then(function (response) {
            compRef.getRegistrationResponseData();
            toast.success("Deleted successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        });
    }

    // Method for declare delete button
    ondeleteRegistration(cell, row) {
        let componentRef = this;
        return <Button type="button" onClick={() => componentRef.deleteRegistrationData(row)} color="danger">
            <i className="fa fa-trash"></i> Delete</Button>
    }

    render(){
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
                                </FormGroup>
                            </CardHeader>
                            <CardBody>
                                <div>
                                     <BootstrapTable ref='table' data={this.state.response} pagination={true} search={true} options={options}>
                                         <TableHeaderColumn dataField='id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                                         <TableHeaderColumn dataField='fullName' headerAlign='left' width='200'>Name</TableHeaderColumn>
                                         <TableHeaderColumn dataField='sessionName' headerAlign='left' width='300'>Session Name</TableHeaderColumn>
                                         <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteRegistration.bind(this)} headerAlign='left' width='100'>Delete</TableHeaderColumn>
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
