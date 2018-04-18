import React, { Component } from 'react';
import {
    CardGroup, CardColumns, CardTitle, Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Label,
    Table, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as firebase from 'firebase';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'firebase/firestore';
import { DBUtil } from '../../services';
import Avatar from 'react-avatar';
import { ToastContainer, toast } from 'react-toastify';
import HeaderQue from '../../components/Header/HeaderQue';
import _ from 'lodash';
import FooterQueScreen from '../../components/Footer/FooterQueScreen';

const questionTable = "AskedQuestions";
class SessionQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionList: [],
            sessionValue: '',
            categoryValue: '',
            questionData: [],
            render:true,
        };
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.onSessionSelect = this.onSessionSelect.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
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
                }
            }).catch((error) => {

            });
    }
    onCategorySelect(value) {
        if (value != null) {
            this.setState({
                categoryValue: value.value
            });
            let filter = value.value;
            let session = this.state.sessionValue;
            this.getQuestions(session, filter);
        }
        else {
            this.setState({
                categoryValue: ''
            });
        }
    }
    onSessionSelect(value) {
        let list = Object.assign([],this.state.sessionList);
        if (value != null) {
            this.setState({
                sessionValue: value.value,
                sessionName: _.filter(list,{'value': value.value})[0].label
            });
            let session = value.value;
            let filter = this.state.categoryValue;
            this.getQuestions(session, filter);
        }
        else {
            this.setState({
                sessionValue: '',
                questionData: [],
                sessionName:''
            });
        }
    }
    getQuestions(session, filter) {

        let thisRef = this;
        let sessionId = session;
        //let questionSet = [];
        if (filter == "" || filter == undefined) {
            filter = 'timestamp'
        }
        let filterParam = filter;
        DBUtil.getDocRef(questionTable)
            .where("SessionId", "==", sessionId)
            .orderBy(filterParam, 'desc')
            .onSnapshot((snapshot) => {
                if (snapshot.size > 0) {
                    let questionSet = [];
                    snapshot.forEach(question => {
                        questionSet.push({
                            Question: question.data().Question,
                            askedBy: question.data().askedBy.fullName,
                            voteCount: question.data().voteCount,
                            askedAt: question.data().timestamp.toLocaleTimeString() +' , '+question.data().timestamp.toDateString()
                        })
                    });
                    thisRef.setState({
                        questionData: questionSet,
                        render:false
                    })
                }
                else {
                    thisRef.setState({
                        questionData: [],
                        render:true
                    })
                }
            });
    }
    render() {
        const { sessionList, sessionValue, categoryValue } = this.state;
        let sessionOptions = sessionList;
        let categoryOptions = [
            { label: 'Recent', value: 'timestamp' },
            { label: 'Top', value: 'voteCount' }
        ]
        if(this.state.questionData.length > 0){
            
            this.renderQuestions = this.state.questionData.map(question => {
                return (
                    <Col md='12'>
                        <Card style={{border: '#E7060E 1px solid'}}>
                            <div>
                            <CardTitle style={{padding:'12px',margin:0}}> " {question.Question} " </CardTitle>
                            <CardFooter  style={{padding:'4px 10px 4px 10px', borderTop:"1px #E7060E solid"}}>
                            <span style={{ fontSize: '12pt', color: '#E7060E'}}> -- {question.askedBy}</span>
                            <span style={{float:'right',marginTop: 3}} ><i className="icon-like" style= {{color: '#E7060E',fontSize: 'large',fontWeight: 'bold'}}> </i>   {question.voteCount}</span >
                            </CardFooter>
                            
                            </div>
                        </Card>
                        </Col>
                )
            })
        }
        else{
            this.renderQuestions = null;
        }
        return (
            <div className="app">
                <HeaderQue heading={this.state.sessionName}/>
                <div className="app-body">
                    <main className="main" style={{ marginLeft: 0 }}>
                        <div style={{ marginTop: 20 }} className="animated fadeIn">
                            <Container  style={{maxWidth: '100%', marginRight: 0,marginLeft: 0}}>
                                <Row className="justify-content-center">
                                    <Col md="12">
                                        <CardGroup style={{display:this.state.render?'block':'none'}}>
                                            <Card className="p-4">
                                                <CardBody>
                                                    <Row>
                                                        <Col xs="12" md="6">
                                                            <FormGroup row className="marginBottomZero">
                                                                <Col xs="12" md="3">
                                                                    <h5 >Sessions :</h5>
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
                                                                    <h5 >Category :</h5>
                                                                </Col>
                                                                <Col xs="12" md="9">
                                                                    <Select
                                                                        placeholder="--Select--"
                                                                        value={categoryValue}
                                                                        options={categoryOptions}
                                                                        clearable={true}
                                                                        onChange={this.onCategorySelect} />
                                                                </Col>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </CardGroup>
                                        <Row style={{marginTop:40}}>
                                            {this.renderQuestions}
                                        </Row>
                                        {/* </CardGroup> */}
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