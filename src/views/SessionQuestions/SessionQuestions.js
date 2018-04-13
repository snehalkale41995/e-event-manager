import React, { Component } from 'react';
import {
    CardGroup, Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label,
    Table, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import Avatar from 'react-avatar';
import { ToastContainer, toast } from 'react-toastify';
import HeaderQue from '../../components/Header/HeaderQue';
import FooterQueScreen from '../../components/Footer/FooterQueScreen';

class SessionQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionList: [],
            sessionValue: '',
            categoryValue: ''
        };
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.onSessionSelect = this.onSessionSelect.bind(this);
        // this.setApporveRejectButtonByStatus = this.setApporveRejectButtonByStatus.bind(this);
        // this.onApproved = this.onApproved.bind(this);
        // this.onRejected = this.onRejected.bind(this);      
    }

    // Method For render/set default data
    componentWillMount() {
        let thisRef = this;
        let sessionData = [];
        DBUtil.getDocRef("Sessions")
            .get().then((snapshot) => {
                if (snapshot.size > 0) {
                    snapshot.forEach(doc => {
                        if (doc.data().sessionType != 'break') {
                            sessionData.push({ label: doc.data().eventName, value: doc.id });
                        }
                    })
                    thisRef.setState({
                        sessionList: sessionData
                    })
                    console.log('sessions', sessionData);
                }
            }).catch((error) => {

            });
    }
    onCategorySelect(value) {
        console.log("onCategorySelect Value", value);
        if (value != null) {
            this.setState({
                categoryValue: value.value
            });
        }
        console.log("state category Value", this.state);
    }
    onSessionSelect(value) {
        console.log("onSessionSelect Value", value);
        if (value != null) {
            this.setState({
                sessionValue: value.value
            });
        }
        console.log("state session Value", this.state);
    }

    render() {
        const { sessionList, sessionValue, categoryValue } = this.state;
        let sessionOptions = sessionList;
        let categoryOptions = [
            { label: 'Recent', value: 'Recent' },
            { label: 'Top', value: 'Top' }
        ]
        return (
            <div className="app">
                <HeaderQue />
                <div className="app-body">
                    <main className="main">
                        <div style={{ marginTop: 20 }} className="animated fadeIn">
                            <Container >
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <CardGroup style={{ width: 851 }}>
                                            <Card style={{ marginLeft: -511, marginTop: -20 }} className="p-4">
                                                <CardBody>
                                                    <Row>
                                                        <Col xs="12" md="6">
                                                            <FormGroup row className="marginBottomZero">
                                                                <Col xs="12" md="3">
                                                                    <h4 >Sessions :</h4>
                                                                </Col>
                                                                <Col xs="12" md="9">
                                                                    <Select
                                                                        placeholder="--Select--"
                                                                        value={sessionValue}
                                                                        options={sessionOptions}
                                                                        onChange={this.onSessionSelect} />
                                                                </Col>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup row className="marginBottomZero">
                                                                <Col xs="12" md="3">
                                                                    <h4 >Category :</h4>
                                                                </Col>
                                                                <Col xs="12" md="9">
                                                                    <Select
                                                                        placeholder="--Select--"
                                                                        value={categoryValue}
                                                                        options={categoryOptions}
                                                                        onChange={this.onCategorySelect} />
                                                                </Col>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </CardGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </main>
                </div>
                <FooterQueScreen />
            </div>
        );
    }
}
export default SessionQuestions;