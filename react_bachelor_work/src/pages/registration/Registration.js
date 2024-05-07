import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registration.css';
import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {registration} from '../../http/userApi';
import {Context} from '../../index';

import { LANDING_ROUTE } from '../../utils/constants';

const Registration = observer(() => {

    const {user} = useContext(Context);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        phone: "",
        password: "",
        name: "",
        surname: "",
        bio: ""
    });

    const { login, phone, password, name, surname, bio } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const [confirmationPassword, setConfirmationPassword] = useState("");

    const [agreement, setAgreement] = useState(false);

    const signup = async () => {
        try {
            let data = await registration(formData.login, formData.phone, formData.password, formData.name, formData.surname, formData.bio);
            console.log(data);
            user.setUser(user);
            user.setIsAuth(true);
            navigate(LANDING_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <main>
            <Form>
                <Form.Group className="mb-3 registration-field" controlId="formBasicEmail">
                    <Form.Label><b>Email <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="email" placeholder="Введіть Ваш email" name="login" value={login} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicNumber">
                    <Form.Label><b>Номер телефону <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="tel" placeholder="Введіть Ваш номер телефону" name="phone" value={phone} onChange={onChange} required />
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

                <Form.Group className="mb-3 registration-field" controlId="formBasicRadio">
                    <Form.Label><b>Роль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Check type="radio" name="chooseRole1" label="Користувач" required />
                    <Form.Check type="radio" name="chooseRole2" label="Адмін" />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Я приймаю умови використання даного сайту" name="agreement"
                        checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" 
                    disabled={password !== confirmationPassword || password === "" || confirmationPassword === "" || !agreement} 
                    onClick={signup}
                >
                    Зареєструватися
                </Button>

                <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                    <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                </Form.Group>
            </Form>
        </main>
    );
})

export default Registration;