import React, {Component} from 'react';
// import {
//     Container, Input, InputGroup, InputGroupText, InputGroupAddon, Badge, Row, Col, Progress, Dropdown, DropdownToggle,
//     DropdownMenu, DropdownItem, Card, CardHeader, CardBody, CardFooter, CardTitle, Button, ButtonToolbar,
//     ButtonGroup, ButtonDropdown, Label, Table, Form, FormGroup, FormText,
// } from 'reactstrap';

class Role extends Component{
    constructor(props){
        super(props);

        this.state = {
            roleName: '',           
            roleFeatures: [{
                Id: 1,
                Name: 'User',
                isChecked: false
            },
            {
                Id: 2,
                Name: 'Role',
                isChecked: false
            },
            {
                Id: 3,
                Name: 'Session',
                isChecked: false
            },
            {
                Id: 4,
                Name: 'Reports',
                isChecked: false
            },
            {
                Id: 5,
                Name: 'Attendance',
                isChecked: false
            }            
        ],
        showErrorLabel: false      
        }

        this.updateRoleNameState = this.updateRoleNameState.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.resetFrom = this.resetFrom.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        //this.showError = this.showError.bind(this);
    };

    updateRoleNameState(e){
        this.setState({roleName: e.target.value, showErrorLabel: false});
    }

    resetFrom(){
        this.setState({roleName: ''});
        this.state.roleName = '';
        var features = this.state.roleFeatures;
        features.forEach(function(element) {
            if(element.isChecked == true){
                element.isChecked = false
            }            
        }, this);
        this.setState({
            roleFeatures: features
        });
    }

    saveForm(){
        // if(this.state.roleName == ''){
        //     this.setState({
        //         showErrorLabel: true
        //     });
        // }
        console.log('Role name: ', this.state.roleName);
        console.log('Features' , this.state.roleFeatures);
    }

    handleInputChange(event) {
        console.log(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var features = this.state.roleFeatures;
        features.forEach(function(element) {
            if(element.Name == target.value){
                element.isChecked = target.checked
            }            
        }, this);
        this.setState({
            roleFeatures: features
        });
      }

    //   showError(){
    //       if(this.state.showErrorLabel){
    //         return  <label id="lblerror">test</label>
    //       }
    //   }

    render(){
        var tempThis = this;
        var checkList = this.state.roleFeatures.map(function(item){
            return <label key={item.Id}><input key={item.Id} name="isGoing" type="checkbox" value={item.Name} checked={item.isChecked} onChange={tempThis.handleInputChange} /> &nbsp;{item.Name}&nbsp;&nbsp; </label>;
          })
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                     <form > 
                        <div>
                            <label>Name</label>&nbsp;&nbsp;
                            <input type = 'text' value = {this.state.roleName} onChange = {this.updateRoleNameState} />
                           {/* {this.showError} */}
                        </div>  
                        <div>   
                            <label>Features</label>&nbsp;&nbsp;
                            { checkList }
                        </div>          
                        <div>
                            <button type="button" name="save" onClick={this.saveForm}>Save</button> &nbsp;
                            <button className="" type="button" name="reset" onClick={this.resetFrom}>Reset</button>
                        </div>                         
                    </form> 
                </div>    
            </div>
        </div>
        );
    }
}

export default Role;
