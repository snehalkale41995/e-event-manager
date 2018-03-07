


import {Table, Button} from 'reactstrap';
import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
class SessionList extends Component {

  render() {
    return (
      <div className="animated fadeIn">

     <div>     
     <Link to={`${this.props.match.url}/sessionForm`}> <Button type="button" color="secondary"> Add new event </Button></Link>


     </div>
     <br/>
     <br/>
    <Table bordered hover size="xs">

        <thead>
          <tr>
            <th>Event Name</th>
            <th>Room</th>
            <th>Speakers</th>
            <th>Volunteers</th>
            <th>Extra Services</th>
            <th> </th>
            <th> </th>

          </tr>
        </thead>

        <tbody>
           <tr>
           <td>Nasscom</td>
            <td>Room1</td>
            <td>Nana Patekar</td>
            <td>Volunteer1</td>
            <td></td>
           <td> <Link to={`${this.props.match.url}/sessionForm/1`}> <Button type="button" color="primary"> Edit </Button></Link></td>
            <td><Button color="danger">Delete</Button></td>         
           </tr>


         <tr>
           <td>Tiecon</td>
            <td>Room2</td>
            <td>Satish Roy</td>
            <td>Volunteer2</td>
            <td></td>
            <td> <Link to={`${this.props.match.url}/sessionForm/2`}> <Button type="button" color="primary"> Edit </Button></Link></td>
            <td><Button color="danger">Delete</Button></td>
            
          </tr>

          <tr>
           <td>Event Horizon</td>
            <td>Room3</td>
            <td>Neha Mahajan</td>
            <td>Volunteer1</td>
            <td></td>
            <td> <Link to={`${this.props.match.url}/sessionForm/3`}> <Button type="button" color="primary"> Edit </Button></Link></td>
            <td><Button color="danger">Delete</Button></td>
          </tr>


        </tbody>
      </Table>

   </div>
    )
  }
}

export default SessionList;





