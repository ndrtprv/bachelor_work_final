import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { LOGIN_ROUTE, USER_ROUTE } from '../../utils/constants';

function ResetPassword() {

    const navigate = useNavigate();
    const {token} = useParams();

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

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

    const resetPassword = async (e) => {
        try {
            e.preventDefault();
            await axios.post(process.env.REACT_APP_API_URL + 'user/reset-password/' + token, 
                {
                    password
                }
            ).then(response => {
                if (response.data.status) {
                    navigate(LOGIN_ROUTE);
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
      
            <Form method="post">
                <h2>Змінити пароль</h2>

                <Form.Group className="mb-3 registration-field" controlId="formBasicPassword">
                    <Form.Label><b>Новий пароль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicConfirmPassword">
                    <Form.Label><b>Підтвердження нового пароля <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль ще раз" name="confirmation_password"
                        value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)}  required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" 
                    disabled={password !== confirmationPassword || password === "" || confirmationPassword === ""}
                    onClick={resetPassword}
                >
                    Змінити пароль
                </Button>

                <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                    <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                </Form.Group>
            </Form>
        </main>
    );
}

export default ResetPassword