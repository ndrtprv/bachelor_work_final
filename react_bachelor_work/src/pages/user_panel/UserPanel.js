import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Form, Accordion } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { LANDING_ROUTE } from '../../utils/constants';
import './UserPanel.css';

function UserPanel(props) {

  const navigate = useNavigate();

  const [verifiedData, setVerifiedData] = useState(true);
  const [avatar, setAvatar] = useState(props.avatar);
  const [userData, setUserData] = useState({});

  const [formData, setFormData] = useState({
    phone_num: "",
    name: "",
    surname: "",
    bio: ""
  });

  const { phone_num, name, surname, bio } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

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
        console.log(err.message);
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const update = async (e) => {
    e.preventDefault();
    try {

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
            <Container className="justify-content-center">
              {
                verifiedData ? 
                <Form action="post" className="m-2">
                  <h4>Зміна даних</h4>
                  <Container>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3 registration-field" controlId="formBasicNumber">
                          <Form.Label><b>Номер телефону <span style={{color: "red"}}>*</span></b></Form.Label>
                          <Form.Control type="tel" placeholder="Введіть Ваш номер телефону" name="phone_num" value={phone_num} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3 registration-field" controlId="formBasicName">
                          <Form.Label><b>Ім'я <span style={{color: "red"}}>*</span></b></Form.Label>
                          <Form.Control type="text" placeholder="Введіть Ваше ім'я" name="name" value={name} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3 registration-field" controlId="formBasicSurname">
                          <Form.Label><b>Прізвище <span style={{color: "red"}}>*</span></b></Form.Label>
                          <Form.Control type="text" placeholder="Введіть Ваше прізвище" name="surname" value={surname} onChange={onChange} required />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3 registration-field" controlId="formBasicBio">
                          <Form.Label><b>Додатково</b></Form.Label>
                          <Form.Control as="textarea" type="text" resize="none" rows={8} placeholder="Введіть додаткові дані про вас" name="bio" value={bio} onChange={onChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Button variant="primary" type="submit" 
                        disabled={ (
                            formData.phone_num === userData.phone_num &&
                            formData.name === userData.name && 
                            formData.surname === userData.surname &&
                            formData.bio === userData.bio
                          ) || phone_num === "" || name === "" || surname === ""
                        } 
                        onClick={update}
                      >
                        Оновити дані
                      </Button>

                      <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                        <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                      </Form.Group>
                    </Row>
                  </Container>
                </Form>
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
        {
          verifiedData ? 
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Форма додавання оголошення</Accordion.Header>
              <Accordion.Body>
                <Form action="post">

                </Form>
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
          :
          <></>
        }
      </Container>
    </main>
  )
}

export default UserPanel