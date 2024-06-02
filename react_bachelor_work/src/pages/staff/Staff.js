import { useEffect, useState } from 'react';
import './Staff.css';
import axios from 'axios';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { STAFF_ROUTE } from '../../utils/constants';

function Staff(props) {

    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'staff/main')
        .then(response => {
            setAdmins(response.data.adminsProcessed);
        }).catch(err => {
            console.log(err.message);
        });
    });

    return (
        <main>
            <Container className='d-flex justify-content-md-center mt-5'>
                <Row>
                    {admins.map((admin, index) => 
                        <Col key={index} lg={4} className='p-2'>
                            <Card style={{width: '12rem'}}>
                                <CardImg variant="top" style={{padding: '0.5em'}} src={admin.user.avatars ? `data:${admin.user.avatars.contentType};base64,${admin.user.avatars.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} />
                                <CardBody>
                                    <CardTitle>{admin.user.name + " " + admin.user.surname}</CardTitle>
                                    <CardText>{admin.role}</CardText>
                                    <NavLink to={STAFF_ROUTE + `/${admin.admin_id}`} className="nav-link lat">
                                        <Button variant="primary">Докладніше</Button>
                                    </NavLink>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </main>
    );
}

export default Staff;