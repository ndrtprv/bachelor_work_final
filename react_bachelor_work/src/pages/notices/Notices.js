import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardImg, Col, Container, Pagination, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { NOTICES_ROUTE } from '../../utils/constants';

function Notices() {

  const [notices, setNotices] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.post(process.env.REACT_APP_API_URL + 'notice/getNotices', {activePage: activePage})
    .then(response => {
      if (response.data.message !== "It's empty!") {
        setNotices(response.data.noticesProcessed);

        let num;
        let pageArray = [];
        for (num = 1; num <= response.data.pages; num++) {
          pageArray.push(num);
        }

        setPages(pageArray);
      }
    })
  });

  const handleClickPage = (e) => {
    e.preventDefault();
    console.log(e.target.text);
    setActivePage(parseInt(e.target.text));
    axios.post(process.env.REACT_APP_API_URL + 'notice/getNotices', {activePage: activePage})
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

  return (
    <Container>
      {
        notices.length !== 0 ?
        <>
          <Row style={{borderStyle: 'solid', borderColor: 'gray', borderWidth: '0.15em', margin: '3em', padding: '0.5em'}}>
            {notices.map((notice, index) => 
              <Col key={index} style={{justifyContent: 'space-around', alignContent: 'center', margin: '0.15em'}} lg={4}>
                <Card style={{ width: '13rem', alignContent: 'center' }} >
                  <CardImg variant="top" src={`data:${notice.photos[0].contentType};base64,${notice.photos[0].src_photo}`} alt={notice.id + ' ' + notice.kind} />
                  <Card.Body>
                    <Card.Title>{notice.kind}</Card.Title>
                    <Card.Text>
                      Автор: {notice.user.name + " " + notice.user.surname}
                    </Card.Text>
                    <NavLink to={NOTICES_ROUTE + `/${notice.id}`} className="nav-link lat">
                      <Button variant="primary">Докладніше</Button>
                    </NavLink>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
          <Row>
            <Pagination style={{margin: '1em 1em 0 1em'}}>
              {pages.map((page, index) => 
                <Pagination.Item key={index} active={page === activePage} onClick={handleClickPage}>
                  {page}
                </Pagination.Item>
              )}
            </Pagination>
          </Row>
        </>
        :
        <Row style={{borderStyle: 'solid', borderColor: 'gray', borderWidth: '0.25em', margin: '3em'}}>
          <Col style={{alignItems: 'center', padding: '8em', textAlign: 'center'}}>
            <h5>Оголошення відсутні</h5>
          </Col>
        </Row>
      }
    </Container>

  )
}

export default Notices