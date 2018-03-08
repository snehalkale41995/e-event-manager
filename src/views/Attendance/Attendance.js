import React, { Component } from 'react';
import {
    Badge, Row, Col, Card, CardHeader, CardBody, Table,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebasedb } from '../../index';



class Attendance extends React.Component {
    constructor() {
        super();
        this.state = {
            items : []
        }
        this.data = [
            {
                "name": "James Angus",
                "date": "22/11/2018",
                "Registerfor": "Main Entrance"
            },
            {
                "name": "Milan Howen",
                "date": "11/11/2018",
                "Registerfor": "Event - tiECon"
            }
        ];

    }
    // getInitialState() {
    //     return {
    //       items: [],
    //      // text: ''
    //     };
    //   }
    
    componentWillMount() {
        let items = [];
        firebasedb.collection("Users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var item = doc.data();
                item['.key'] = doc.key;
                items.push(item);
                //obj.push(doc.data());
                //let objString = JSON.stringify(obj);
                console.log(this.items);
            });
            this.setState({
                items: items
            });
        });
    }


    render() {
        // let obj = [];
        // firebasedb.collection("Users").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         var item = doc.data();
        //         item['.key'] = doc.key;
        //         items.push(item);
        //         //obj.push(doc.data());
        //         //let objString = JSON.stringify(obj);
        //         console.log(items);
        //     });
        //     this.setState({
        //         items: items
        //       });
        // });
   
        this.rows = this.state.items.map(function (row) {
            return <tr >
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.contactNo}</td>
            </tr>
        });

        return (
            <div className="animated fadeIn">
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
                                        <th>Date</th>
                                        <th>Register for</th>
                                    </thead>
                                    {this.rows}
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>            </Row>
            </div>
        )
    }
}
export default Attendance;

