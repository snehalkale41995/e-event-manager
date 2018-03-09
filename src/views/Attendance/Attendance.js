import React, { Component } from 'react';
import {
    Badge, Row, Col, Card, CardHeader, CardBody, Table,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import { IntlProvider, FormattedDate ,FormattedTime } from 'react-intl';
class Attendance extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            itemsID: []
        }
    }

    componentWillMount() {
        let Users = [];
        let UsersID = [];
        let componentRef = this;
        DBUtil.getDocRef("Attendance")
            //firebasedb.collection("Attendance")
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    UsersID.push(doc.id);
                    Users.push({ UserID: doc.id, UserData: doc.data() });
                });
               // console.log(" docs  ", Users);
                componentRef.setState({
                    items: Users,
                    itemsID: UsersID
                })
                Users = [];
                UsersID = [];
            });

    }
    //format="short"
    render() {
        this.rows = this.state.items.map(function (row) {
            return <tr >
                <td>{row.UserID}</td>
                <td>{row.UserData.confRoom}</td>
                <td><FormattedDate value={row.UserData.timesteamp.toString()} />   <FormattedTime value={row.UserData.timesteamp.toString()} format="hhmm" /> </td>

            </tr>
        });

        return (
            <div className="animated fadeIn">
                <IntlProvider locale="en">
                    <Row>
                        <Col xs="12" >
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Attendance Table
                          </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <th>Name</th>
                                            <th>Registered for</th>
                                            <th>Date</th>

                                        </thead>
                                        {this.rows}
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
export default Attendance;


