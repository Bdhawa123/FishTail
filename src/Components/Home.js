import React, {Component} from 'react';
import {Card, CardBody,CardText, CardTitle, Button,Row, Col} from 'reactstrap';
import '../styles/card.css';
import {withRouter} from 'react-router-dom'

class HomeComponent extends Component{
	
	changeComponent = (url)=>{
		this.props.history.push(`/${url}`);
	}

    render(){

		
        return(
            <div>
                <Row className="row_ht">
                    <Col sm="6">
                    <Card className="card_styling" onClick={()=>{this.changeComponent('Sales')}}>
                        <div className="centercontent_child">
                            <CardBody>
								
                                <CardTitle>Sales</CardTitle>  
                            </CardBody>
                        </div>
                    </Card>
                    </Col>
                    <Col sm = "6">
                        <Card className="card_styling" onClick={()=>{this.changeComponent('SManagement')}}> 
                            <div className="centercontent_child">
                                <CardBody>
                                    <CardTitle>Sales Management</CardTitle>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                    <Card className="card_styling" onClick={()=>{this.changeComponent('SReport')}}>
							<div className="centercontent_child">
								<CardBody>
									<CardTitle>Sales Report</CardTitle>
								</CardBody>
							</div>
                        </Card>
                    </Col>
                    <Col sm="6">
						<Card className="card_styling" onClick={()=>{this.changeComponent('Inventory')}}>
							<div className="centercontent_child">
								<CardBody>
									<CardTitle>Inventory Management</CardTitle>
								</CardBody>
							</div>
						</Card>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default withRouter(HomeComponent);