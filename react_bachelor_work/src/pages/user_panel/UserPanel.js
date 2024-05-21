import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LANDING_ROUTE } from '../../utils/constants';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';

function UserPanel(props) {

  const navigate = useNavigate();
  const [verifiedData, setVerifiedData] = useState(true);
  const [avatar, setAvatar] = useState(props.avatar);
  const [userData, setUserData] = useState({});

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.REACT_APP_API_URL + 'user/profile')
      .then(res => {
        if (res.data.status) {
          setUserData(res.data.userData);
        
          if (res.data.verified === null) {
            setVerifiedData(false);
          }

          if (res.data.portrait !== null) {
            setAvatar(res.data.portrait);
          }
        } else {
          navigate(LANDING_ROUTE);
        }
      })
    }, 60000);
    return () => clearInterval(interval);
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
        console.log(err.message);
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Avatar alt="Профіль" src={avatar !== props.avatar ? `data:${avatar.contentType};base64,${avatar.data}` : props.avatar} size="5em" />
          </Col>
          <Col>
            <Container className="justify-content-center">
              <p>{userData.name} {userData.surname}</p>
            </Container>
            <Container className="justify-content-center">
              {
                verifiedData ? 
                <></>
                :
                <Form action="post">
                  <h3><b>Ви не підтвердили свої дані. Зробіть це зараз.</b></h3>
                  <Button variant="primary" type="submit" onClick={handleSend} >
                    Підтвердити дані
                  </Button>
                </Form>
              }
            </Container>
          </Col>
        </Row>
      </Container>
      
    </main>
  )
}

export default UserPanel