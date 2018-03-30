import { Row, Col, Card, CardBody,Table, Button } from 'reactstrap';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route, Redirect} from 'react-router-dom';
import { IntlProvider, FormattedDate ,FormattedTime } from 'react-intl';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {DBUtil} from '../../services';

class AttendeeList extends Component{
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
        let attendeeItems = []; let attendeeIDs = [];        
        objectList.forEach(function (doc) {
            if (doc.data().isDelete != true ){
                attendeeItems.push({
                    attendeeIDs: doc.id,
                    attendeeItems: doc.data()
                });
            }
        });
        componentRef.setState({attendee: attendeeItems})
        });
    }

    render() {
        let componentRef = this;
        this.rows = this.state.attendee.map(function (row) {
            return <tr key={row.attendeeItems.firstName + ' ' + row.attendeeItems.lastName}>
                <td>{row.attendeeItems.firstName + ' ' + row.attendeeItems.lastName}</td>
                <td>{row.attendeeItems.email == undefined ? '' : row.attendeeItems.email}</td>
                <td>{row.attendeeItems.contactNo == undefined ? '' : row.attendeeItems.contactNo}</td>
                <td>{row.attendeeItems.timestamp == undefined ? '' : <FormattedDate value={row.attendeeItems.timestamp.toString()}/>}</td>
                <td>{row.attendeeItems.registrationType== undefined ? '' : row.attendeeItems.registrationType}</td>
                <td><Link to={`${componentRef.props.match.url}/registration/${row.attendeeIDs}`} > 
                    <Button type="button" color="primary"><i className="fa fa-pencil"></i> Edit</Button></Link></td>
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
                                                <th>Action </th>
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

export default AttendeeList;