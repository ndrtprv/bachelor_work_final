import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap';

function NoticeList() {

    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'notice/getUsersNotices')
        .then(res => {
            setNotices(res.data);
        });
    });

    return (
        <Accordion>
            {notices.map((notice, index) =>
                <Accordion.Item key={index} eventKey={'' + index}>
                    <Accordion.Header>{notice.id + '\t' + notice.kind}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                <Col>
                                    {notice.photos.map((photo, index) =>
                                        <img key={index} src={`data:${photo.contentType};base64,${photo.src_photo}`} alt={notice.id + ' ' + notice.kind} style={{maxWidth: '25em'}} />
                                    )}
                                </Col>
                                <Col>
                                    <p>Тип допомоги: {notice.type}</p>
                                    <p>Вид допомоги: {notice.kind}</p>
                                    <p>Опис:</p>
                                    <p>{notice.description}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            )}
        </Accordion>
    )
}

export default NoticeList;