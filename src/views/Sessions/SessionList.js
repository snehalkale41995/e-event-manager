import React, {Component} from 'react';
import { Badge,  Row,  Col,  Card,  CardHeader,  CardBody,  Table,
Pagination,  PaginationItem,  PaginationLink , Button, Container} from 'reactstrap';
import {Link, Switch, Route, Redirect} from 'react-router-dom';


import {DBUtil} from '../../services';
import *as firebase from 'firebase';
import 'firebase/firestore';

class SessionList extends Component
{

    constructor(props)
    {
        super(props);
        this.state =
        {
          EventObj: []
        }
       this.getEventList= this.getEventList.bind(this);
    }


     componentWillMount()
     {
        this.getEventList();
    }

       

        getEventList()
        {
          let thisRef = this;
            let listItem = [];

       DBUtil.addChangeListener("Event", function(list)
       {
           
         list.forEach(function(document) {
           
           console.log("document", document.id);  
           console.log("document", document.data()); 
          
           listItem.push({eventId :document.id , eventInfo:document.data()})
         });
     
         thisRef.setState({EventObj : listItem});
         console.log("EventObj", thisRef.state.EventObj)
       })
  
        }



     
   render() {
     let componentRef = this;
        this.events = this
            .state
            .EventObj
            .map(function (event) {
              console.log("eventttttt", event)
                return <tr >
                   
                    <td>{event.eventInfo.eventName}</td>
                    <td>{event.eventInfo.room}</td>
                    <td>{event.eventInfo.extraServices}</td>
                    
                    <td>{ event.eventInfo.speakers.map((speaker)=>
                        {return(<li>{speaker}</li>)})} </td>
                    <td>{ event.eventInfo.volunteers.map((volunteer)=>
                        {return(<li>{volunteer}</li>)})} </td>
                  
                    <td> <Button color="danger">Delete</Button></td> 
                    <td> <Link to={`${componentRef.props.match.url}/sessionForm`}> <Button type="button" color="primary">Edit</Button></Link></td>
                </tr>
            });

        return (
            <div className="animated fadeIn">
            <div>     
      <Link to={`${this.props.match.url}/sessionForm`}> <Button type="button" color="secondary"> Add new Event </Button></Link>
          </div>       
          <br/>
          <br/>
                    <Container>
                    <Row className="justify-content-center">
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i>
                                   Event Table
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                           
                                            <th>eventName</th>
                                            <th>room</th>
                                            <th>extraServices</th>
                                            <th>speakers</th>
                                            <th>volunteers </th>
                                            <th> </th>
                                            <th> </th>
                                        </thead>
                                        {this.events}
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default SessionList;










































// import {Table, Button} from 'reactstrap';
// import React, {Component} from 'react';
// import {Link, Switch, Route, Redirect} from 'react-router-dom';

// import {DBUtil} from '../../services';

// class SessionList extends Component {

//   render() {
   
//     return (
//       <div className="animated fadeIn">

//      <div>     
//      <Link to={`${this.props.match.url}/sessionForm`}> <Button type="button" color="secondary"> Add new event </Button></Link>

//      </div>
//      <br/>
//      <br/>
//     <Table bordered hover size="xs">
//         <thead>
//           <tr>
//             <th>Event Name</th>
//             <th>Room</th>
//             <th>Speakers</th>
//             <th>Volunteers</th>
//             <th>Extra Services</th>
//             <th> </th>
//             <th> </th>

//           </tr>
//         </thead>
//         <tbody>
//            <tr>
//            <td>Nasscom</td>
//             <td>Room1</td>
//             <td>Nana Patekar</td>
//             <td>Volunteer1</td>
//             <td></td>
//            <td> <Button type="button" color="primary"> Edit </Button></td>
//             <td><Button color="danger">Delete</Button></td>     
//             {/* <td><input type="button" value="Open window" onclick={this.openWin} /> </td>    */}
//            </tr>
//          <tr>
//             <td>Tiecon</td>
//             <td>Room2</td>
//             <td>Satish Roy</td>
//             <td>Volunteer2</td>
//             <td></td>
//             <td>  <Button type="button" color="primary"> Edit </Button></td>
//             <td><Button color="danger">Delete</Button></td>
            
//           </tr>

//           <tr>
//            <td>Event Horizon</td>
//             <td>Room3</td>
//             <td>Neha Mahajan</td>
//             <td>Volunteer1</td>
//             <td></td>
//             <td>  <Button type="button" color="primary"> Edit </Button></td>
//             <td><Button color="danger">Delete</Button></td>
//           </tr>


//         </tbody>
//       </Table>

//    </div>
//     )
//   }
// }

// export default SessionList;
