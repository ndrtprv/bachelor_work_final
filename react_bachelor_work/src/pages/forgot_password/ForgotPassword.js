import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

function ForgotPassword() {

  const [login, setLogin] = useState("");
  const [notification, setNotification] = useState(undefined);

  const forgotPassword = async (e) => {
    try {
      e.preventDefault();
      console.log('Кнопку натиснуто!');
      await axios.post('http://localhost:3003/user/forgot-password', 
        {
          login
        }
      ).then(response => {
        if (response.data.status) {
          setNotification('Перевірте пошту, на яке надійшло посилання для скидання паролю.');
        } else {
          console.log("Провал!");
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