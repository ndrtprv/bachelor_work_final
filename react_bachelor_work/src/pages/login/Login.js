import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';
import { Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SIGNUP_ROUTE, FORGOT_ROUTE, USER_ROUTE } from '../../utils/constants';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const { login, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'user/nav')
        .then(res => {
            if (res.data.status) {
                navigate(USER_ROUTE);
            }
        }).catch(err => {
            alert(err.message);
        })
    });

    const logIn = async (e) => {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_API_URL + 'user/login', 
                {
                    login, password
                }
            ).then(response => {
                if (response.data.status) {
                    navigate(USER_ROUTE);
                }
            }).catch(err => {
                alert(err.message);
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <main style={{display: 'inline-flex', flexDirection: 'column'}} >
            
            <Form method="post">
                <h2>Вхід до системи</h2>
                <Form.Group className="mb-3 login-field" controlId="formBasicEmail">
                    <Form.Label><b>Email <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="email" placeholder="Введіть email" name="login" value={login} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3 login-field" controlId="formBasicPassword">
                    <Form.Label><b>Пароль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" name="password" value={password} onChange={onChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={login === "" || password === ""} onClick={logIn}>
                    Увійти
                </Button>

                <Form.Group className="mt-3 registration-field" >
                    <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                </Form.Group>
            </Form>
            
            <Container style={{backgroundColor: 'beige', borderRadius: '0.5em', display: 'inline-flex', flexDirection: 'column'}} >
                <p><NavLink to={FORGOT_ROUTE} >Забули пароль?</NavLink></p>
                <p>Не маєте користувача? <NavLink to={SIGNUP_ROUTE} >Зареєструватися</NavLink></p>
            </Container>
        </main>
    );
}

export default Login;