import React, {Component} from 'react';
import { Badge,  Row,  Col,  Card,  CardHeader,  CardBody,  Table,
  Pagination,  PaginationItem,  PaginationLink } from 'reactstrap';




class Attendance extends React.Component {  
    constructor () {
      super();
      this.data = 	[
        { 
            "name": "James Angus", 
            "date" : "22/11/2018", 
            "Registerfor": "Main Entrance" 
        },
        { 
            "name": "Milan Howen", 
            "date" : "11/11/2018", 
            "Registerfor": "Event - tiECon" 
        }	
    ];
    
    }
   
      render(){
        this.rows = this.data.map(function(row){
            return <tr >
                    <td>{row.name}</td>
                    <td>{row.date}</td>
                    <td>{row.Registerfor}</td>
                </tr>
            });

        return (
  <div className="animated fadeIn">
            <Row>
                <Col xs="12" >
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Attendance Table
                          </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Register for</th>
                                </thead>
                                {this.rows}
                            </Table>
                        </CardBody>
                    </Card>
                </Col>            </Row>
        </div>
        )
      

      }  
      
   
  }
  export default Attendance;


// class Attendance extends Component{
//     render() {
//         return (
//           <div className="animated fadeIn">
//             <Row>
//               <Col xs="12" >
//                 <Card>
//                   <CardHeader>
//                     <i className="fa fa-align-justify"></i> Attendance Table
//                   </CardHeader>
//                   <CardBody>
//                     <Table responsive>
//                       <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Date Registered</th>
//                         <th>Attendance For </th>
//                          {/*<th>Status</th> */}
//                       </tr>
//                       </thead>
//                       <tbody>
//                       <tr>
//                         <td>Samppa Nori</td>
//                         <td>2012/01/01</td>
//                         {/* <td>Member</td>
//                         <td>
//                           <Badge color="success">Active</Badge>
//                         </td> */}
//                       </tr>
//                       <tr>
//                         <td>Estavan Lykos</td>
//                         <td>2012/02/01</td>
//                         {/* <td>Staff</td>
//                         <td>
//                           <Badge color="danger">Banned</Badge>
//                         </td> */}
//                       </tr>
//                       <tr>
//                         <td>Chetan Mohamed</td>
//                         <td>2012/02/01</td>
//                         {/* <td>Admin</td>
//                         <td>
//                           <Badge color="secondary">Inactive</Badge>
//                         </td> */}
//                       </tr>
//                       <tr>
//                         <td>Derick Maximinus</td>
//                         <td>2012/03/01</td>
//                         {/* <td>Member</td>
//                         <td>
//                           <Badge color="warning">Pending</Badge>
//                         </td> */}
//                       </tr>
//                       <tr>
//                         <td>Friderik Dávid</td>
//                         <td>2012/01/21</td>
//                         {/* <td>Staff</td>
//                         <td>
//                           <Badge color="success">Active</Badge>
//                         </td> */}
//                       </tr>
//                       </tbody>
//                     </Table>
//                     {/* <Pagination>
//                       <PaginationItem>
//                         <PaginationLink previous href="#"></PaginationLink>
//                       </PaginationItem>
//                       <PaginationItem active>
//                         <PaginationLink href="#">1</PaginationLink>
//                       </PaginationItem>
//                       <PaginationItem>
//                         <PaginationLink href="#">2</PaginationLink>
//                       </PaginationItem>
//                       <PaginationItem>
//                         <PaginationLink href="#">3</PaginationLink>
//                       </PaginationItem>
//                       <PaginationItem>
//                         <PaginationLink href="#">4</PaginationLink>
//                       </PaginationItem>
//                       <PaginationItem>
//                         <PaginationLink next href="#"></PaginationLink>
//                       </PaginationItem>
//                     </Pagination> */}
//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row> 
//           </div>
    
//         )
//       }
// }



            
