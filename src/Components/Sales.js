import React,{Component} from 'react';
import {Card, Row,Button} from 'reactstrap'
import '../styles/sales.css'
import DataComponent from './DataComponent';





class SalesComponent extends Component{
    render(){
        return(<div className="txtImport">
            <Card >
                <div className ="topRow">
                    <h1 >Sales</h1>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push(`/Home`);}} >
                            back
                    </button>
                </div>
            </Card>
        
            <Card className="container card2">
                <Row>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push(`/Home`);}} >
                        New
                    </button>
                </Row>
           
                <Row className="centerRow">
                    <input type="text" placeholder="Search"/>
                </Row>
                <Row className="dataComponent">
                    <DataComponent/>
                </Row>
            </Card>
        </div>
        );
    }
}

export default SalesComponent;