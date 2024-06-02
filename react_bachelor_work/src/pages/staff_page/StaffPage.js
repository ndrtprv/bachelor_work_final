import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function StaffPage(props) {

    const {id} = useParams();
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'staff/one/' + id)
        .then(response => {
            setAdmin(response.data.processedAdmin);
        }).catch(err => {
            console.log(err.message);
        })
    });

    return (
        <main>
            <Container className='mt-5'>
                <Row>
                    <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
                        <img src={admin.user.avatar !== null ? `data:${admin.user.avatar.contentType};base64,${admin.user.avatar.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} style={{maxWidth: '22em'}} />
                    </Col>
                    <Col md >
                        <Container className="justify-content-center">
                            <h3>{admin.user.name + ' ' + admin.user.surname}</h3>
                            <h5>{admin.role}</h5>
                            <p>Про себе:</p>
                            <p>
                                {
                                    admin.user.bio
                                    ?
                                    admin.user.bio
                                    :
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis nisl sollicitudin, accumsan dui vel, facilisis nulla. " +
                                    "Quisque eleifend ornare elit suscipit tristique. Vestibulum justo tortor, tincidunt vitae orci non, porttitor rhoncus tellus." + 
                                    " Curabitur non semper massa. Nullam feugiat iaculis."
                                }
                            </p>
                            <p>Контакти:</p>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default StaffPage