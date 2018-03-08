


import {Table, Button} from 'reactstrap';
import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
class UserList extends Component {

  render() {
    return (
      <div className="animated fadeIn">

     <div>     
     <Link to={`${this.props.match.url}/userForm`}> <Button type="button" color="secondary"> Add new User </Button></Link>


     </div>
     <br/>
     <br/>
    <Table bordered hover size="xs">

        <thead>
          <tr>
            <th> Name</th>
            <th>Email Id</th>
            <th>Contact No</th>
            <th>Profiles</th>
            <th> </th>
            <th> </th>

          </tr>
        </thead>

        <tbody>
           <tr>
           <td>Mark pattinson</td>
            <td>Mark.pattinson@gmail.com</td>
            <td>+91-9890546789</td>
            <td>volunteer</td>
           <td> <Link to={`${this.props.match.url}/userForm/1`}> <Button type="button" color="primary"> Edit </Button></Link></td>
            <td><Button color="danger">Delete</Button></td>         
           </tr>


         <tr>
         <td>jacob black</td>
         <td>jacob.black@gmail.com</td>
         <td>+91-9743657890</td>
         <td>volunteer</td>
            <td> <Link to={`${this.props.match.url}/userForm/2`}> <Button type="button" color="primary"> Edit </Button></Link></td>
            <td><Button color="danger">Delete</Button></td>
            
          </tr>

          <tr>
          <td>joy pattinson</td>
          <td>joy.pattinson@gmail.com</td>
          <td>+91-9890546789</td>
          <td>volunteer</td>
            <td> <Link to={`${this.props.match.url}/userForm/3`}> <Button type="button" color="primary"> Edit </Button></Link></td>
            <td><Button color="danger">Delete</Button></td>
          </tr>


        </tbody>
      </Table>

   </div>
    )
  }
}

export default UserList;





