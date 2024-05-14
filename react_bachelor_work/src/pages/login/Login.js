import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {observer} from 'mobx-react-lite';
import './Login.css';
import { Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SIGNUP_ROUTE } from '../../utils/constants';

const Login = observer(() =>  {

    return (
        <main>
            <Form method="post">
                <Form.Group className="mb-3 login-field" controlId="formBasicEmail">
                    <Form.Label><b>Email</b></Form.Label>
                    <Form.Control type="email" placeholder="Введіть email" />
                </Form.Group>

                <Form.Group className="mb-3 login-field" controlId="formBasicPassword">
                    <Form.Label><b>Пароль</b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Увійти
                </Button>
            </Form>
            
            <Container>
                <p>Не маєте користувача? <NavLink to={SIGNUP_ROUTE} >Зареєструватися</NavLink></p>
            </Container>
        </main>
    );
});

export default Login;