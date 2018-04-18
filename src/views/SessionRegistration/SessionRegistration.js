import React, {Component} from 'react';
import { Button } from 'reactstrap';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import { ToastContainer, toast } from 'react-toastify';  
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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
                    attendeeId:  doc.data().attendeeId,
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
        return (
            <div>
                <BootstrapTable ref='table' data={this.state.response} pagination={true} search={true}>
                    <TableHeaderColumn dataField='id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='attendeeId' headerAlign='left' width='300'>Attendee Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='sessionName' headerAlign='left' width='500' >Session Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteRegistration.bind(this)} headerAlign='left'>Delete</TableHeaderColumn>
                </BootstrapTable>
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

export default SessionRegistration;
