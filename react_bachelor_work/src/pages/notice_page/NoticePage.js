import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function NoticePage() {

  const {id} = useParams();
  const [notice, setNotice] = useState({});

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'notice/getNotice/' + id)
    .then(response => {
      setNotice(response.data.processedNotice);
    }).catch(err => {
      console.log(err.message);
    })
  });

  if (!notice || !notice.photos) {
    return <div>Завантаження...</div>;
  }

  return (
    <main>
      <Container className='mt-5'>
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
            <img src={`data:${notice.photos[0].contentType};base64,${notice.photos[0].src_photo}`} alt={notice.id + ' ' + notice.typeDescription} style={{maxWidth: '22em'}} />
          </Col>
          <Col md >
            <Container className="justify-content-center">
              <h3>{notice.typeDescription}</h3>
              <h5>{notice.kind}</h5>
              <p>Деталі:</p>
              <p>{notice.description}</p>
              <p>Контакти:</p>
              <p>Автор: {notice.user.name + " " + notice.user.surname}</p>
              <p><i className='fa-solid fa-phone'></i> <a href={`tel:${notice.user.phone_num}`}>{notice.user.phone_num}</a></p>
              <p><i className="fas fa-envelope"></i> <a href={`mailto:${notice.user.login}`}>{notice.user.login}</a></p>
            </Container>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default NoticePage