import React,{Component,useContext} from 'react';
import {Card, Row,Button} from 'reactstrap'
import '../styles/sales.css'
import DataComponent from './DataComponent';
import {StyleContext} from '../contexts/StyleContext';



// const {blur,toggleBlur} = useContext(StyleContext);

const SalesComponent = (props)=>{
    const {blur,toggleBlur} = useContext(StyleContext);
        console.log(toggleBlur)

        return(<div className="txtImport">
            <Card >
                <div className ="topRow">
                    <h1 >Sales</h1>
                    <button className="btn btn-primary" onClick={()=>{props.history.push(`/Home`);}} >
                            back
                    </button>
                </div>
            </Card>
        
            <Card className="container card2">
                <Row>
                    <button className="btn btn-primary" onClick={toggleBlur} >
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

export default SalesComponent;