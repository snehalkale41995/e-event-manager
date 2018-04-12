import React, {Component} from 'react';
import {
     CardGroup, Container, Row, Col,Card, CardHeader, CardBody, CardFooter, Button, Label,
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

class SessionQuestions extends Component{
    constructor(props){
        super(props);
        this.state = {  
            sessionList : [],
            sessionValue : ''
        };
        // this.getRegistrationResponse = this.getRegistrationResponse.bind(this);
        // this.handleSelectChange = this.handleSelectChange.bind(this);
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
                        if(doc.data().sessionType != 'break'){
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

    render(){
        const {sessionList , sessionValue} = this.state;
        let options = sessionList;
        return (
            <div className="app">
                <HeaderQue />
                <div className="app-body">
                <div className="animated fadeIn">
                <Container>
                <Row className="justify-content-center">
                  <Col md="8">
                    <CardGroup>
                      <Card className="p-4">
                        <CardBody>
                            <FormGroup row className="marginBottomZero">
                                    <Col xs="12" md="9">
                                        <h1 className="regHeading paddingTop8">Sessions :</h1>
                                    </Col>
                                    <Col xs="12" md="3">
                                    <Select  placeholder="--Select--" simpleValue value={sessionValue} options={options} />
                                    </Col>
                            </FormGroup>
                            </CardBody>
                            </Card>
                          </CardGroup>
                        </Col>
                      </Row>
                    </Container>
            </div>
                </div>
                <FooterQueScreen />
            </div>



        );
    }
}

export default SessionQuestions;