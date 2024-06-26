import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function StaffPage(props) {

    const {id} = useParams();
    const [avatar, setAvatar] = useState(props.avatar);
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'staff/one/' + id)
        .then(response => {
            setAdmin(response.data.processedAdmin);
            if (admin.user.avatar !== null) {
                setAvatar(admin.user.avatar);
            }
        }).catch(err => {
            console.log(err.message);
        })
    });

    if (!admin || !admin.user) {
        return <div>Завантаження...</div>;
    }

    return (
        <main>
            <Container className='mt-5'>
                <Row>
                    <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
                        <img src={avatar !== props.avatar ? `data:${avatar.contentType};base64,${avatar.avatar.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} style={{maxWidth: '22em'}} />
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
                            <p><i className='fa-solid fa-phone'></i> <a href={`tel:${admin.user.phone_num}`}>{admin.user.phone_num}</a></p>
                            <p><i className="fas fa-envelope"></i> <a href={`mailto:${admin.user.login}`}>{admin.user.login}</a></p>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default StaffPage;