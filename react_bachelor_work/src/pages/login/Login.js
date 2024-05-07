import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';

function Login() {
    return (
        <main>
            <Form>
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
        </main>
    );
}

export default Login;