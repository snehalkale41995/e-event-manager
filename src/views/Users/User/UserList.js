import React, {Component} from 'react';
import { Badge,  Row,  Col,  Card,  CardHeader,  CardBody,  Table,
  Pagination,  PaginationItem,  PaginationLink , Button} from 'reactstrap';
  import {Link, Switch, Route, Redirect} from 'react-router-dom';



class UserList extends React.Component {  
    constructor (props) {
      super(props);
      this.state =
      {
       data :	[
        { 
            "id" : 1,
            "name": "Mark passinson", 
            "emailid" : "Mark.pattinson@gmail.com", 
            "contactNo": "+91-9890546789",
            "profile": "volunteer"

        },
        { 
            "id" : 2,
            "name": "Snehal Kale", 
            "emailid" : "Snehal.Kale@gmail.com", 
            "contactNo": "+91-9897897876",
            "profile": "Charter member"
        }	,
        { 
            "id" : 3,
            "name": "Arkita Toshniwal", 
            "emailid" : "Arkita.Toshniwal@gmail.com", 
            "contactNo": "+91-8909876688",
            "profile": "Attendee"

        },
        { 
            "id" : 4,
            "name": "Shivani Kadam", 
            "emailid" : "Shivani.Kadam@gmail.com", 
            "contactNo": "+91-7275722466",
            "profile": "volunteer"
        },
        { 
            "id" : 5,
            "name": "Swapnil pathak", 
            "emailid" : "Swapnil.pathak@gmail.com", 
            "contactNo": "+91-8642347890",
            "profile": "sponser"

        },
        { 
            "id" : 6,
            "name": "Sonali Bhat", 
            "emailid" : "Sonali.Bhat@gmail.com", 
            "contactNo": "+91-7678909089",
            "profile": "Charter member"
        }	
    ],
       Qrurl : '' 
  }

    this.openWin = this.openWin.bind(this);
    this.fetchDetails= this.fetchDetails.bind(this);
    this.createQR = this.createQR.bind(this);
    }



       createQR(row) {
         console.log(row)
       console.log("increateQR");
          let nameArray;
          nameArray = row.name.split(" ");
         
          let fname= nameArray[0]
          let lname =nameArray[1]
          let contactNo = row.contactNo;
          let emailid = row.emailid;
          let profile = row.profile;
          console.log(contactNo, emailid, profile )
         
	 let  cardDetails= {
				version: '3.0',
				lastName: lname,
				firstName: fname,
				organization: 'Eternus Solutions',
				cellPhone: contactNo,
				role: profile,
				email: emailid
			};
			
			let generatedQR = qrCode.createVCardQr(cardDetails, { typeNumber: 12, cellSize: 2 });
		
			// var card = `<div style='height: 5.8in;width: 4.3in;'>
			// <div style='border-bottom: 2px solid black;'><img style="width:4.3in;height:1in" src='https://www.tiecon.org/wp-content/uploads/2015/08/tiecon.png'/></div>
			// <div id='print'>
			// <div><h1>Harshit Jyoti</h1></div>
			// <div>`+generatedQR+`</div>
			// </div>
			// <div style='position:fixed;bottom:0px;border-top: 2px solid black;'><img style="width:4.3in;height:1in" src='https://www.tiecon.org/wp-content/uploads/2015/08/tiecon.png'/></div>
      // </div>`;
      console.log(generatedQR);
      this.setState({ Qrurl : generatedQR})
			
   }


     fetchDetails(row)
     {
       console.log("hello",row.id);
       console.log(this, "this")
        this.createQR(row); 
        

          
        setTimeout(() => {
           this.openWin(row)
        }, 250);
     }



    openWin(row) {
     console.log("hello form openwin")
   
     console.log("this in openwin",this.state.Qrurl)
     console.log("row in openwin", row)
     let name =   row.name;
     let contactNo = row.contactNo;
     let emailid = row.emailid;
     let profile = row.profile;


    var newWindow = window.open('','','width=200,height=100');
    newWindow.document.writeln("<html>");
    newWindow.document.writeln("<body>");
   
    newWindow.document.writeln("<div> QR code : <br/> <br/></div>")
    newWindow.document.writeln("" + this.state.Qrurl + 
       "");
    newWindow.document.writeln("<div> Name : "   + "" + name +  "</div>" + "<br/>")
  
    newWindow.document.writeln("<div> Email Id: "   + "" + emailid +  "</div>" + "<br/>")
   
     newWindow.document.writeln("<div> Contact No : "   + "" + contactNo +  "</div>" + "<br/>")

     newWindow.document.writeln("<div> Profile : "   + "" + profile +  "</div>" + "<br/>")

    newWindow.document.writeln("</body></html>");
    newWindow.document.close();

    setTimeout(function() {
    newWindow.print();
    newWindow.close();
}, 1000);
 
    }







   
      render(props){
          
           let componentRef = this;
        this.rows = this.state.data.map(function(row){
              
            return <tr key= {row.id} >
                    <td>{row.name}</td>
                    <td>{row.emailid}</td>
                    <td>{row.contactNo}</td>
                    <td>{row.profile}</td>
                    <td><Button  onClick={() => componentRef.fetchDetails(row)} color="secondary">Print card</Button></td>     
                    <td> <Button color="danger">Delete</Button></td> 
                   <td> <Link to={`${componentRef.props.match.url}/userForm`}> <Button type="button" color="primary">Edit</Button></Link></td>                 </tr>
                 });

        return (
            
        <div>
           
   <div>     
     <Link to={`${this.props.match.url}/userForm`}> <Button type="button" color="secondary"> Add new User </Button></Link>
     </div>       
  <br/>
  <br/>
  <div className="animated fadeIn">
            <Row>
                <Col xs="12" >
                    <Card>
                        <CardHeader>
                          User List
                          </CardHeader>
                        <CardBody>
                            <Table bordered hover size="xs">
                                <thead>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>contact No</th>
                                    <th>profile</th>
                                    <th>       </th>
                                    <th>       </th>
                                    <th>       </th>
                                </thead>
                                {this.rows}
                            </Table>
                        </CardBody>
                    </Card>
                </Col>            </Row>
        </div>
        </div>
        )
      

      }  
      
   
  }


export default UserList;





