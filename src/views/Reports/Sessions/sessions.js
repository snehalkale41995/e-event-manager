import React, { Component } from 'react';
import {
    Row, Col, Button, Badge, Card, CardBody, CardHeader,
    CardFooter, FormGroup
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../../services';
import _ from 'lodash';
import { IntlProvider, FormattedDate, FormattedTime } from 'react-intl';
import { firebaseConfig, firestoredb } from '../../../services/config';
class SessionReport extends React.Component {
    constructor() {
        super();
        this.state = {
            attendanceList: [],
            eventDropDown: [],
            attendee: [],
            attendance: [],
            attendanceData: [],
            tableVisible: false,
            attendanceDataFiltered: [],
            roles: new Set()
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    // Method for get attendance data
    componentWillMount() {
        let componentRef = this;
        let attendance = [], eventList = [], eventsID = [], attendee = [];
     
        let sessionList = localStorage.getItem('sessionList');
        var sessions = JSON.parse(sessionList);

        for (var key in sessions) {
            eventList.push({
                label: sessions[key]['sessionInfo']['eventName'],
                value: sessions[key]['id']
            });
        }
     
         this.setState({ eventDropDown: eventList });

        // DBUtil.getDocRef("Attendee")
        //     .get().then((snapshot) => {
        //         snapshot.forEach(function (doc) {
        //             let data = doc.data();
        //             attendee.push({
        //                 fullName: data.fullName,
        //                 userRole: data.roleName,
        //                 userId: doc.id,
        //             });
        //         });

        //         DBUtil.getDocRef("Attendance")
        //             .onSnapshot((snapshot) => {
        //                 snapshot.forEach(function (doc) {
        //                     let data = doc.data();
        //                     if (!data.userName || data.userName.trim() == "") {
        //                         let user = _.filter(attendee, { userId: data.userId })[0];
        //                         data.userName = user ? user.fullName : data.userName;
        //                         data.userRole = user ? user.userRole : data.userRole;
        //                     }
        //                     attendance.push({
        //                         fullName: data.userName,
        //                         profiles: data.userRole,
        //                         userId: data.userId,
        //                         session: data.sessionId,
        //                         entry: data.timestamp,
        //                     });
        //                 });

        //                 attendance = _.orderBy(attendance, ['userId', 'entry'], ['asc', 'desc']);
        //                 attendance = _.uniqBy(attendance, 'userId');
        //                 componentRef.setState({ eventDropDown: eventList, attendance });
        //                 this.refresh();
        //             })
        //     });
    }
    refresh() {
        this.handleSelectChange(this.state.value);
    }
    renderCounts() {
        let color = ["primary", "secondary", "success", "info", "warning", "danger", "link"]
        let sessions = this.state.roles;
        let sessionsCount = [];
        sessions.forEach(item => {
            sessionsCount.push({ label: item, count: _.filter(this.state.attendanceData, { profiles: item }).length })
        });
        return (sessionsCount.map((item, index) =>
            <Button style={{ marginRight: 20, marginBottom: 20 }} color={color[index] ? color[index] : color[1]} onClick={this.renderTable.bind(this, item.label)} outline>
                {item.label} <Badge color="secondary">{item.count}</Badge>
            </Button>
        )
        );
    }
    renderTable(role) {
        let attendanceData = Object.assign([], this.state.attendanceData);
        this.setState({
            attendanceDataFiltered: _.filter(attendanceData, { profiles: role }),
            tableVisible: true
        });
    }
    // Method For handle changed value of dropdown & fill attendance list table
    handleSelectChange(value) {
        let tableVisible = this.setState.tableVisible
        let attendanceList = [], attendeeList = Object.assign([], this.state.attendance), attendanceData = [];

        let roles = new Set();
        if (value != null) {
            attendanceData = _.filter(attendeeList, { session: value });
            // Query for get attendance data by session Id
            attendanceData.forEach(function (data) {
                roles.add(data.profiles);
            });
            // Set default value for current state
            this.setState({
                attendanceData: Object.assign([], attendanceData), roles, value,
                tableVisible: false
            });

            this.renderCounts();
        }
    }

    // getAttendeeDetails(attendanceList){
    //     let componentRef = this;
    //     let attendee = [], attendanceData = [], profileString = '';
    //     let roles = new Set();
    //     // Loop for set multiple attendee's data to attendanceData state
    //     for(var i= 0;i< attendanceList.length; i++){
    //         // Query for get attendee by using attendance user Id
    //         var docRef =  DBUtil.getDocRef("Attendee").doc(attendanceList[i].data.userId);
    //         docRef.get().then(function(doc) {
    //             attendee = doc.data();
    //             let serviceString = '', serviceArray = '';
    //             if(attendee.profileServices != undefined){
    //                 if (attendee.profileServices) {
    //                     serviceString = attendee.profileServices['0'];
    //                 }
    //             }
    //             profileString = serviceString;


    //             var fullName = '';
    //             if(attendee.fullName != undefined) {
    //                 fullName = attendee.fullName;
    //             } else {
    //                 fullName = attendee.firstName + ' '+attendee.lastName; 
    //             }
    //             let data = {
    //                 id: doc.id,
    //                 fullName: fullName,
    //                 profiles: profileString
    //             }
    //             // Push data to attendanceData
    //             console.log(attendanceData);
    //             attendanceData = _.uniqBy(attendanceData,'id');
    //             attendanceData.push(data);
    //             componentRef.setState({attendanceData, roles});
    //             roles.add(profileString);

    //         });
    //     }

    // }

    render() {
        const { value } = this.state;
        const options = this.state.eventDropDown;

        // Define constant for sorting
        const sortingOptions = {
            defaultSortName: 'fullName',
            defaultSortOrder: 'asc',
            sizePerPage: 50,
            paginationPosition: 'top',
            hideSizePerPage: true
        };
        let counts = this.renderCounts();
        return (
            <div>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <FormGroup row className="marginBottomZero">
                                        <Col xs="12" md="8">
                                            <h1 className="regHeading paddingTop8">Live Session Attendance Report</h1>
                                        </Col>
                                        <Col xs="10" md="3">
                                            <Select
                                                placeholder="Select Session"
                                                simpleValue
                                                value={value}
                                                options={options}
                                                onChange={this.handleSelectChange}
                                            />
                                        </Col>
                                        <Col xs="1" md="1" style={{ display: counts.length == 0 ? 'none' : 'block' }} className='refresh' ><i style={{ fontWeight: 'bold' }} onClick={this.refresh} title='Refresh' className="icon-refresh"></i>
                                        </Col>
                                    </FormGroup>
                                </CardHeader>
                                <div style={{ padding: '10px 20px' }}>
                                    {counts}
                                </div>
                                <CardBody style={{ display: this.state.tableVisible ? 'block' : 'none' }}>
                                    <BootstrapTable ref='table' data={this.state.attendanceDataFiltered} pagination={true} options={sortingOptions}>
                                        <TableHeaderColumn dataField='id' headerAlign='left' isKey hidden>ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='fullName' headerAlign='left' width='200' dataSort>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='profiles' headerAlign='left' width='250'>Profile Name</TableHeaderColumn>
                                    </BootstrapTable>
                                </CardBody>
                                <div style={{ display: counts.length != 0 ? 'none' : 'block', margin: 'auto', paddingBottom: 15 }}>Please select a Session</div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default SessionReport;
