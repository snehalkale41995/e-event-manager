import {Table, Button} from 'reactstrap';
import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';

import {DBUtil} from '../../services';

class SessionList extends Component {

  render() {
    DBUtil.getList('Roles', (objectsList) => {
      objectsList.forEach((doc) => {
        let obj = doc.data();
        let objString = JSON.stringify(obj);
        console.log(doc.id +' : '+objString);
      });
    }, (ex) => {
      console.log('From Sessions List Page');
    });

    return (
      <div className="animated fadeIn">

     <div>     
     <Link to={`${this.props.match.url}/sessionForm`}> <Button type="button" color="primary"> <i className="fa fa-plus"></i> Add event </Button></Link>

     </div>     
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
            <td><Button type="button" color="primary"><i className="fa fa-pencil"></i>  Edit </Button></td>
            <td><Button color="danger"><i className="fa fa-trash"></i> Delete</Button></td>     
            {/* <td><input type="button" value="Open window" onclick={this.openWin} /> </td>    */}
           </tr>
         <tr>
            <td>Tiecon</td>
            <td>Room2</td>
            <td>Satish Roy</td>
            <td>Volunteer2</td>
            <td></td>
            <td><Button type="button" color="primary"><i className="fa fa-pencil"></i>  Edit </Button></td>
            <td><Button color="danger"><i className="fa fa-trash"></i> Delete</Button></td>
            
          </tr>

          <tr>
           <td>Event Horizon</td>
            <td>Room3</td>
            <td>Neha Mahajan</td>
            <td>Volunteer1</td>
            <td></td>
           <td><Button type="button" color="primary"><i className="fa fa-pencil"></i>  Edit </Button></td>
            <td><Button color="danger"><i className="fa fa-trash"></i> Delete</Button></td>
          </tr>


        </tbody>
      </Table>

   </div>
    )
  }
}

export default SessionList;
