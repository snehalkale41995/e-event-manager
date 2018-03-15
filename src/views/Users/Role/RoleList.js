import {Table, Button} from 'reactstrap';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route, Redirect} from 'react-router-dom';

import * as firebase from 'firebase';
import 'firebase/firestore';
import {DBUtil} from '../../../services';
import { ToastContainer, toast } from 'react-toastify';

class RoleList extends Component{
    constructor(props){
        super(props);

        this.state = {
            role: []
        }

        this.getRoleList = this.getRoleList.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
    }

    componentWillMount() {
        this.getRoleList();
    }

    // Method for get all role data 
    getRoleList(){
        let componentRef = this;
        DBUtil.addChangeListener("Roles", function (objectList) {
        let roleItems = [];        
        objectList.forEach(function (doc) {
            if (doc.data().isDelete != true ){
                roleItems.push({
                    roleItems: doc.data()
                });
            }
        });
        componentRef.setState({role: roleItems})
        });
    }

    // Method for delete role
    deleteRole(item){
        let param = [{
            docName: item.roleItems.name,
            deleteFlag: true
        }];
         DBUtil.deleteDoc("Roles",param)
         toast.success("Role deleted successfully.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        setTimeout(() => {
            this.getRoleList();
        }, 2000);
    }

    render() {
       let componentRef = this;
       this.roleList = this.state.role.map(function(item){
            return (
                <tr key={item.roleItems.name}>
                    <td>{item.roleItems.name}</td>
                    <td><Link to={`${componentRef.props.match.url}/RoleForm/${item.roleItems.name}`} > 
                    <Button type="button" color="primary">Edit</Button></Link></td>
                    <td><Button color="danger" onClick={(e) => componentRef.deleteRole(item)}>Delete</Button></td>                   
                </tr>
            )
        });
       
        return(
            <div className="animated fadeIn">
                 <div>     
                      <Link to={`${this.props.match.url}/RoleForm`}> 
                      <Button type="button" color="secondary"> Add New Role </Button></Link>
                      <ToastContainer autoClose={2000} />
                 </div>
                 
                 <br/>
                 <br/>
                <Table bordered hover size="xs">
                    <thead>
                        <tr>
                            <th> Role Name</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.roleList}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default RoleList;