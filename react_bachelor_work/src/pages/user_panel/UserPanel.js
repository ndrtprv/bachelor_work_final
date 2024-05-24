import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Form, Accordion } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { LANDING_ROUTE } from '../../utils/constants';
import './UserPanel.css';
import ChangeForm from '../../components/change_form/ChangeForm';
import NoticeForm from '../../components/notice_form/NoticeForm';
//import NoticeList from '../../components/notice_list/NoticeList';

function UserPanel(props) {

  const navigate = useNavigate();

  const [verifiedData, setVerifiedData] = useState(true);
  const [avatar, setAvatar] = useState(props.avatar);
  const [userData, setUserData] = useState({});

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'user/profile')
    .then(res => {
      if (res.data.status) {
        setUserData(res.data.user);
          
        if (res.data.user.verifiedAt === null) {
          setVerifiedData(false);
        }

        if (res.data.portrait !== null) {
          setAvatar(res.data.portrait);
        }
      } else {
        navigate(LANDING_ROUTE);
      }
    })
  });

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_URL + 'user/resend')
      .then(response => {
        console.log(response);
        if (response.data.status) {
          alert(response.data.message);
        }
      }).catch(err => {
        alert('Не вдалося надіслати листа за вказаною адресою. ' + err.message);
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <main>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
            <Avatar alt="Профіль" variant='circular' src={avatar !== props.avatar ? `data:${avatar.contentType};base64,${avatar.data}` : props.avatar} size="15em" />
          </Col>
          <Col md >
            <Container className="justify-content-center">
              <h3>{userData.name} {userData.surname}</h3>
            </Container>
            <Container className={verifiedData ? "justify-content-center" : "justify-content-center m-5"}>
              {
                verifiedData ? 
                <ChangeForm userData={userData} />
                :
                <Form action="post" className="m-12">
                  <h3><b>Ви не підтвердили свої дані. Зробіть це зараз.</b></h3>
                  <Button variant="primary" type="submit" onClick={handleSend} > 
                    Підтвердити дані
                  </Button>
                </Form>
              }
            </Container>
          </Col>
        </Row>
        {
          verifiedData ? 
          <>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Форма додавання оголошення</Accordion.Header>
              <Accordion.Body>
                <NoticeForm />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Форма додавання збору</Accordion.Header>
              <Accordion.Body>
                <Form action="post">

                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Форма додавання звіту</Accordion.Header>
              <Accordion.Body>
                <Form action="post">

                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          
          </>
          :
          <></>
        }
      </Container>
    </main>
  )
}

export default UserPanel