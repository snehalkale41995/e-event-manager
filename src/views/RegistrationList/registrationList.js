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


class RegistrationList extends Component{
    constructor(props){
        super(props);

        this.state = {          
            registrationList :{
                users: [
                            {
                                id: 1,
                                name : 'Sagar Agale',
                                email : 'sagar.agale@eternussolutions.com',
                                response : [
                                    {
                                        questionId: 1,
                                        question: 'Who is the creative side of the event design industry?',
                                        answer: 'Event planner'
                                    },
                                    { 
                                        questionId: 2,
                                        question: 'What does an event manager do?',
                                        answer: 'An event manager helps choose themes of the event.'
                                    }    
                                ],
                                isActivated : true,
                                isDeactivated : false
                            },
                            {
                                id: 2,
                                name : 'Akshay Teli',
                                email : 'akshay.teli@eternussolutions.com',
                                response : [{ 
                                        questionId: 1,
                                        question: 'What does an event manager do?',
                                        answer: 'An event manager helps choose themes of the event.'
                                    },
                                    {
                                        questionId: 2,
                                        question: 'Who is the creative side of the event design industry?',
                                        answer: 'Event planner'
                                    },
                                ],
                                isActivated : true,
                                isDeactivated : false
                            },
                            {
                                id: 3,
                                name : 'Mahesh Kedari',
                                email : 'mahesh.kedari@eternussolutions.com',
                                response : [{
                                    questionId: 1,
                                    question: 'What person in event design help with choosing bands and vendors as well as themes and colors?',
                                    answer: 'Event administrator'
                                }],
                                isActivated : true,
                                isDeactivated : false                                                       
                            }
                        ],
            }
        };

        this.setToActiveRegistration = this.setToActiveRegistration.bind(this);
        this.setToInactiveRegistration = this.setToInactiveRegistration.bind(this);
    }

    setToActiveRegistration (item, e) {
        console.log('Active Click...!!');
        console.log("Active Registration No " + item.id + " Activate status is " + item.isActivated);
    }

    setToInactiveRegistration (item, e) {
        console.log('Deactive Click...!!')
        console.log("Active Registration No " + item.id + " Deactivate status is" + item.isDeactivated);
    }

    render(){
        let rowComponents  = this.state.registrationList.users.map(function(row){
            let tdResponse = row.response.map(function(item){
                return (<span key={item.questionId}>{item.questionId} &nbsp; {item.question} <br/>Answer :&nbsp; {item.answer}<br/></span>)
             });
        return <tr key ={row.id}>
                <td key={row.id}>{row.id}</td>
                <td key={row.name}>{row.name}</td>
                <td key={row.email}>{row.email}</td>
                <td>
                    {tdResponse}
                </td>
                <td>
                    <Badge color="success" onClick={(e) =>this.setToActiveRegistration(row, e)}>Active</Badge>&nbsp;&nbsp;
                    <Badge color="red" onClick={(e) =>this.setToInactiveRegistration(row, e)}>Inactive</Badge> 
                </td>
            </tr>
        },this);

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Registration List
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Response</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowComponents}
                            </tbody>
                            </Table>
                        </CardBody>
                        </Card>
                    </Col>   
                </Row>
            </div>
        );
    }
}

export default RegistrationList;