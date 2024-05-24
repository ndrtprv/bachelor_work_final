import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registration.css';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, USER_ROUTE } from '../../utils/constants';
import axios from 'axios';

import { LANDING_ROUTE } from '../../utils/constants';

function Registration() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        phone_num: "",
        password: "",
        name: "",
        surname: "",
        bio: "",
        avatar: undefined,
        isAdminCandidate: "",
        hideData: ""
    });

    const { login, phone_num, password, name, surname, bio, avatar, isAdminCandidate, hideData } = formData;

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };

    const [confirmationPassword, setConfirmationPassword] = useState("");

    const [agreement, setAgreement] = useState(false);

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
    
    const signup = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('login', login);
            form.append('phone_num', phone_num);
            form.append('password', password);
            form.append('name', name);
            form.append('surname', surname);
            form.append('bio', bio);
            form.append('isAdminCandidate', isAdminCandidate);
            form.append('hideData', hideData);

            if (avatar) {
                form.append('avatar', avatar);
            }

            await axios.post(process.env.REACT_APP_API_URL + 'user/signup', 
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(response => {
                if (response.data.status) {
                    navigate(LANDING_ROUTE);
                    alert("Повідомлення про підтвердження даних надіслано на вашу пошту. Дійсне 15 хвилин.");
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
                <h2>Реєстрація</h2>
                <Form.Group className="mb-3 registration-field" controlId="formBasicEmail">
                    <Form.Label><b>Email <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="email" placeholder="Введіть Ваш email" name="login" value={login} onChange={onChange} required />
                </Form.Group>

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

                <Form.Group className="mb-3 registration-field" controlId="formBasicBio">
                    <Form.Label><b>Додатково</b></Form.Label>
                    <Form.Control as="textarea" type="text" resize="none" placeholder="Введіть додаткові дані про вас" name="bio" value={bio} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicAvatar">
                    <Form.Label><b>Фото профілю</b></Form.Label>
                    <Form.Control type="file" accept="image/*" alt="Оберіть фото" name="avatar" onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicPassword">
                    <Form.Label><b>Пароль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" name="password" value={password} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicConfirmPassword">
                    <Form.Label><b>Підтвердження пароля <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль ще раз" name="confirmation_password"
                        value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)}  required 
                    />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicRole">
                    <Form.Label><b>Роль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Check type="radio" name={`isAdminCandidate`} label="Користувач" value={false} onClick={onChange} required />
                    <Form.Check type="radio" name={`isAdminCandidate`} label="Адмін" value={true} onClick={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicHide">
                    <Form.Label><b>Приховати дані? <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Check type="radio" name={`hideData`} label="Так" value={true} onClick={onChange} required />
                    <Form.Check type="radio" name={`hideData`} label="Ні" value={false} onClick={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Я приймаю умови використання даного сайту" name="agreement"
                        checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" 
                    disabled={
                        login === "" || phone_num === "" ||
                        name === "" || surname === "" ||
                        isAdminCandidate === "" || hideData === "" ||
                        password !== confirmationPassword ||
                        password === "" || confirmationPassword === "" ||
                        !agreement
                    } 
                    onClick={signup}
                >
                    Зареєструватися
                </Button>

                <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                    <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                </Form.Group>
            </Form>

            <Container style={{backgroundColor: 'beige', borderRadius: '0.5em', display: 'inline-flex', flexDirection: 'column'}} >
                <p>Уже зареєстровані? <NavLink to={LOGIN_ROUTE} >Авторизуватися</NavLink></p>
            </Container>
        </main>
    );
}

export default Registration;