import { Row, Col, Card, CardBody,Table } from 'reactstrap';
import React, { Component } from 'react';
import { IntlProvider, FormattedDate ,FormattedTime } from 'react-intl';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {DBUtil} from '../../services';

class Attendee extends Component{
    constructor(props){
        super(props);
        this.state = {
            attendee: []
        }
    }

    // Method for get all Attendees data 
    componentWillMount() {
        let componentRef = this;
        DBUtil.addChangeListener("Attendee", function (objectList) {
        let attendeeItems = [];        
        objectList.forEach(function (doc) {
            if (doc.data().isDelete != true ){
                attendeeItems.push({
                    attendeeItems: doc.data()
                });
            }
        });
        componentRef.setState({attendee: attendeeItems})
        });
    }

    render() {
        this.rows = this.state.attendee.map(function (row) {
            return <tr key={row.attendeeItems.firstName}>
                <td>{row.attendeeItems.firstName + ' ' + row.attendeeItems.lastName }</td>
                <td>{row.attendeeItems.email}</td>
                <td>{row.attendeeItems.contactNo}</td>
                <td><FormattedDate value={row.attendeeItems.timestamp.toString()}/> </td>
                <td>{row.attendeeItems.registrationType}</td>
            </tr>
            });
        return (
            <div className="animated fadeIn">
                <IntlProvider locale="en">
                    <Row>
                        <Col md="12" >
                            <Card>
                                <CardBody className="p-4">
                                <h1>Attendee List</h1>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact No</th>
                                                <th>Date</th>
                                                <th>Registration type </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.rows}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </IntlProvider>             
            </div>
        )
    }
}

export default Attendee;