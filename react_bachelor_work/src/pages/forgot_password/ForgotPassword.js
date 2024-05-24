import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { USER_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const navigate = useNavigate();
  
  const [login, setLogin] = useState("");
  const [notification, setNotification] = useState(undefined);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'user/nav')
    .then(res => {
      if (res.data.status) {
        navigate(USER_ROUTE);
      }
    }).catch(err => {
      console.log(err.message);
    })
  });
  
  const forgotPassword = async (e) => {
    try {
      e.preventDefault();
      await axios.post(process.env.REACT_APP_API_URL + 'user/forgot-password', 
        {
          login
        }
      ).then(response => {
        if (response.data.status) {
          setNotification('Перевірте пошту, на яке надійшло посилання для скидання паролю.');
        }
      })
      .catch(err => {
        console.log(err.message);
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <main className='mt-5'>
      {notification !== undefined ? 
        <Container style={{backgroundColor: 'green'}}>
          {notification}
        </Container>
        : <></>
      }
      
      <Form method="post" >
        <h2>Забули пароль?</h2>

        <Form.Group className="mb-3 login-field" controlId="formBasicEmail">
          <Form.Label><b>Ваш email</b></Form.Label>
          <Form.Control type="email" placeholder="Введіть ваш email" name="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={forgotPassword}>
          Відправити посилання на пошту
        </Button>
      </Form>
    </main>
  );
}

export default ForgotPassword;