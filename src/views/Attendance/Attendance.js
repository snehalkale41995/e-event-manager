import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import { IntlProvider, FormattedDate ,FormattedTime } from 'react-intl';
class Attendance extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
            //itemsID: []
        }
    }

    componentWillMount() {
        let componentRef = this;
        DBUtil.addChangeListener("Attendance", function (objectList) {
            let Users = [];
            let UsersID = [];
            
            objectList.forEach(function (doc) {
                UsersID.push(doc.id);
                Users.push({
                    UserID: doc.id,
                    UserData: doc.data()
                });
               // console.log(" docs  ", Users);
                componentRef.setState({
                    items: Users
                   // itemsID: UsersID
                })
                Users = [];
               // UsersID = [];
            });
            componentRef.setState({items: Users, itemsID: UsersID})
        });

    }
    //format="hhmm"
    //format="short"
    render() {
        this.rows = this.state.items.map(function (row) {
            return <tr >
                <td>{row.UserID}</td>
                <td>{row.UserData.confRoom}</td>
                <td><FormattedDate value={row.UserData.timesteamp.toString()} />   
                  <FormattedTime value={row.UserData.timesteamp.toString()}  /> </td>
                </tr>
            });

        return (
            <div className="animated fadeIn">
           
                <IntlProvider locale="en">
                
                    <Row>
                        <Col md="12" >
                            <Card>
                                {/* <CardHeader>
                                    <i className="fa fa-align-justify"></i> Attendance Table
                          </CardHeader> */}
                                <CardBody className="p-4">
                                <h1>Attendance Table</h1>
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
