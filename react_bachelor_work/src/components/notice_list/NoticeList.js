import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Pagination, Row } from 'react-bootstrap';

function NoticeList() {

    const [notices, setNotices] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_URL + 'notice/getUsersNotices', {activePage: activePage})
        .then(res => {

            setNotices(res.data.noticesProcessed);

            let num;
            let pageArray = [];
            for (num = 1; num <= res.data.pages; num++) {
                pageArray.push(num);
            }

            setPages(pageArray);
        });
    });

    const handleClickPage = (e) => {
        e.preventDefault();
        console.log(e.target.text);
        setActivePage(parseInt(e.target.text));
        axios.post(process.env.REACT_APP_API_URL + 'notice/getUsersNotices', {activePage: activePage})
        .then(res => {

            console.log(res.data.noticesProcessed)
            setNotices(res.data.noticesProcessed);

            let num;
            let pageArray = [];
            for (num = 1; num <= res.data.pages; num++) {
                pageArray.push(num);
            }

            setPages(pageArray);
        });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        console.log(parseInt(e.target.name));
    }

    return (
        <Container className='mt-2 p-1' style={{borderStyle: 'solid', borderWidth: '0.2em', borderColor: 'gray'}}>
            <div className="mt-2">
                <h5>Ваші оголошення</h5>
            </div>
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
                                        <Button className='btn-warning' name={notice.id} onClick={handleDelete} >Видалити оголошення</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
            <Pagination style={{margin: '1em 1em 0 1em'}}>
                {pages.map((page, index) => 
                    <Pagination.Item key={index} active={page === activePage} onClick={handleClickPage}>
                        {page}
                    </Pagination.Item>
                )}
            </Pagination>
        </Container>
    )
}

export default NoticeList;