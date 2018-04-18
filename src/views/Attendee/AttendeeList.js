import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, 
    CardFooter, FormGroup, Button
  } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from "moment";
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import QRCode from 'qrcode'

class AttendeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDropDown: [],
            attendeeData: []
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Method for get all Attendees data 
    componentWillMount() {
        let componentRef = this;
        
        DBUtil.getDocRef("UserProfiles")
        .get().then((snapshot) => {
            let profileList = [];
            snapshot.forEach(function (doc) {
                profileList.push({                    
                    label: doc.data().profileName,
                    value: doc.data().profileName
                });
            });   
            componentRef.setState({profileDropDown : profileList});
        });
    }

    // Method for print ID card
    openWin(user) {
        let briefInfo;
        let CompanyName = '';
        let attendeeLabel = '';
        let attendeeCount = '';
        let attendeeCode = ''
        if (user.attendeeLabel)
            attendeeLabel = user.attendeeLabel;
        if (user.attendeeCount)
            attendeeCount = user.attendeeCount;
        attendeeCode = attendeeLabel + "-" + attendeeCount;
        if (user.briefInfo != undefined) {
            briefInfo = user.briefInfo;
            CompanyName = briefInfo.split('\n')[0];
        }
        else {
            CompanyName = '';
        }

        var newWindow = window.open('', '', 'width=1000,height=1000');
        setTimeout(() => newWindow.document.title = '' + attendeeCode + '', 0);
        newWindow.document.writeln("<html>");
        newWindow.document.writeln("<body>");
        newWindow.document.write("<div style='width:394px;height:490px;text-align:center;margin-left:0;margin-top:0;'>")
        newWindow.document.write("<div style='height:100%;'>")
        //layer1
        newWindow.document.write("<div style='height:29%;'> </div>")
        //layer2
        newWindow.document.write("<div style='padding: 0 30px;'><h1 style='font-size: 1.8rem;font-family:'Arial';padding: 10px 0 0 0;margin: 0;margin-bottom:-10px;'>" + user.name + "</h1>")
        newWindow.document.write("<p style='margin-top:-16px;font-size: 1.2rem;font-family:'Avenir-Book';'>" + CompanyName + "</p>")
        newWindow.document.write("</div>")
        //layer2a
        newWindow.document.write("<div style='text-align: left;padding: 30px 30px;padding-bottom:0;margin-top:45px;'>")
        newWindow.document.write("<img style='width:60px;height:60px;margin-left:-4px;margin-bottom:-4px;' src='" + this.state.Qrurl + "'/>")
        newWindow.document.write("<div style='text-align:left;font-weight:bold;font-size:13px;font-family:'Arial';margin-top:-4px;padding: 0 0px;padding-right:0px;margin-left:4px;'>" + attendeeCode + "</div> <br/>")
        newWindow.document.write("</div>")
        //layer3
        newWindow.document.write("<div style='border-left:1px solid #666;border-right:1px solid #666;'>")
        newWindow.document.write("</div>")
        newWindow.document.write("</div>")
        newWindow.document.write("</div>")
        newWindow.document.writeln("</body></html>");
        newWindow.document.close();

        setTimeout(function () {
            newWindow.print();
            newWindow.close();
        }, 500);
    }

    // Method for generate QR code
    onGenerateQRcode(user) {
        let generatedQR;
        let compRef = this;
        let id = user.id;
        let Label = user.attendeeLabel
        let Count = user.attendeeCount;
        let AttendeeCode = Label + "-" + Count;
        QRCode.toDataURL("TIE" + ":" + AttendeeCode + ":" + id)
            .then(url => {
                generatedQR = url;
                compRef.setState({ Qrurl: url })
                setTimeout(() => {
                    compRef.openWin(user);
                }, 250);
            })
    }

    // Method for edit attendee (Screen redirect from attendee to registration module)
    onEditAttendee(cell, row) {
        let componentRef = this;
        return <Link to={`${componentRef.props.match.url}/registration/${row.id}`}>
            <Button type="button" color="primary"><i className="fa fa-pencil"></i> Edit</Button>
        </Link>
    }

    // Method for print individual QR code
    onPrintAttendeeQRCode(cell, row) {
        let componentRef = this;
        return <Button type="button" onClick={() => componentRef.onGenerateQRcode(row)} color="success">
            <i className="icon-note"></i>Print</Button>
    }

    // Method for get selected row keys for print all QR Code
    getSelectedRowKeys() {
        //alert("We got Selected Row Keys");
    }

    handleSelectChange(value) {
        let attendeeList = [], attendeeData = [];
        this.setState({
            value           
        });
        if(value != null){
            // Query for get attendance data by session Id
            DBUtil.getDocRef("Attendee")
            .get().then((snapshot) => {
                snapshot.forEach(function (doc) {
                    let attendeeObj = doc.data();
                    if((attendeeObj.profileServices instanceof Array  
                        && attendeeObj.profileServices.includes(value)) || (attendeeObj.profileServices[0] == value)){
                        attendeeData.push({                    
                            id: doc.id,
                            name: attendeeObj.firstName + ' ' + attendeeObj.lastName,
                            email: attendeeObj.email,
                            password:attendeeObj.password,
                            contactNo: attendeeObj.contactNo,
                            timestamp: attendeeObj.timestamp != undefined ? moment(attendeeObj.timestamp).format('DD-MM-YYYY') : '',
                            attendeeLabel: attendeeObj.attendeeLabel,
                            attendeeCount: attendeeObj.attendeeCount,
                            attendeeCode: attendeeObj.attendeeLabel != undefined && attendeeObj.attendeeCount != undefined ? attendeeObj.attendeeLabel + "-" + attendeeObj.attendeeCount : '',
                            briefInfo: attendeeObj.briefInfo,
                            profileServices: value
                        });
                    }
                });   
               
                this.setState({attendeeData : attendeeData});
            });
        }
        else {
            // Set default value for current state
            this.setState({attendeeData : attendeeData});
        }
    }

    render() {

        const { value } = this.state; 
        const profileOptions = this.state.profileDropDown;

        // Define constant for sorting
        const options = {
            defaultSortName: 'attendeeCode',
            defaultSortOrder: 'asc',
            sizePerPageList: [{
                text: '250', value: 250
              },{
                text: '500', value: 500
              },{
                text: '1000', value: 1000
              }, {
                text: 'All', value: this.state.attendeeData.length
              } ], // you can change the dropdown list for size per page
              sizePerPage: 250,  // which size per page you want to locate as default
        };
        // Define constant for checkbox      
        const selectRowProp = {
            mode: 'checkbox'
        };

        return (
            <div>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <FormGroup row className="marginBottomZero">
                                            <Col xs="12" md="9">
                                                <h1 className="regHeading paddingTop8">Attendee List</h1>
                                            </Col>
                                            <Col xs="12" md="3">
                                                <Select
                                                    placeholder="Select Profile"
                                                    simpleValue
                                                    value={value}
                                                    options={profileOptions}
                                                    onChange={this.handleSelectChange}
                                                    />
                                            </Col>
                                    </FormGroup>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <Link to={`${this.props.match.url}/registration`}>
                                            <Button type="button" color="primary">
                                                <i className="fa fa-plus"></i>
                                                Add Attendee
                                            </Button>
                                        </Link> &nbsp;&nbsp;
                                        <Button type="button" onClick={this.getSelectedRowKeys.bind(this)} color="success">
                                            <i className="fa fa-print"></i>
                                            Print QR Code For All
                                        </Button>
                                        <BootstrapTable ref='table' data={this.state.attendeeData} pagination={true} search={true}
                                            selectRow={selectRowProp} options={options} >
                                            <TableHeaderColumn dataField='id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                                            <TableHeaderColumn dataField='attendeeCode' headerAlign='left' width='100' dataSort>Code</TableHeaderColumn>
                                            <TableHeaderColumn dataField='password' headerAlign='left' width='200' dataSort>Password</TableHeaderColumn>
                                            <TableHeaderColumn dataField='name' headerAlign='left' width='200' dataSort>Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='email' headerAlign='left' width='200'>Email</TableHeaderColumn>
                                            <TableHeaderColumn dataField='contactNo' headerAlign='left' width='100'>Contact No</TableHeaderColumn>
                                            <TableHeaderColumn dataField='profileServices' headerAlign='left' width='140'>Profile</TableHeaderColumn>
                                            <TableHeaderColumn dataField='timestamp' headerAlign='left' width='100'>Date</TableHeaderColumn>
                                            <TableHeaderColumn dataField='edit' dataFormat={this.onEditAttendee.bind(this)} headerAlign='left' width='100'>Delete</TableHeaderColumn>
                                            <TableHeaderColumn dataField='print' dataFormat={this.onPrintAttendeeQRCode.bind(this)} headerAlign='left' width='100'>Print</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </CardBody> 
                            </Card>
                        </Col>   
                    </Row>
                </div>
            </div>
        )
    }
}
export default AttendeeList;