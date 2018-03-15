import React, {Component} from 'react';
import {Input, Col, Label} from 'reactstrap';


class Feature extends Component {
    // Method for reder feature block for perent component
    render() {
        let data = this.props.data;
        var tempData = this.props;
        var checkList = data.access.map(function(item){
            return (
            <Label key={item.Id}> <input key={item.Id} type="checkbox" 
            name={item.title} value={item.value} checked={item.value}
             onChange={(e) => tempData.updateFeatureData(e,tempData.data.id,item.id)} />
             &nbsp;{item.title}&nbsp;&nbsp;</Label>)
          });
       return ( 
            <Col md="4" key={this.props.data.id}>
                <Label key={this.props.data.id}> {this.props.data.title}</Label><br/>  
                {checkList}
            </Col>
       );
    }
 }

export default Feature;