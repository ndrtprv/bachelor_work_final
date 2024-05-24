import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { USER_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function NoticeForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: "",
        kind: "",
        description: "",
        photo: undefined
    });

    const { type, kind, description, photo } = formData;

    const [agreement, setAgreement] = useState(false);

    const onChange = (e) => {
        if (e.target.name === "photo") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };

    axios.defaults.withCredentials = true;
    const sendNotice = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('type', type);
            form.append('kind', kind);
            form.append('description', description);

            if (photo) {
                form.append('photo', photo);
            }

            await axios.post(process.env.REACT_APP_API_URL + 'notice/add', 
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(response => {
                if (response.data.status) {
                    navigate(USER_ROUTE);
                    alert(response.data.message);
                }
            }).catch(err => {
                alert(err.message);
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Form action="post">
            <Form.Group className="mb-3 registration-field" controlId="formBasicType">
                <Form.Label><b>Тип допомоги <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Check type="radio" name={`type`} label="Допомога ЗСУ" value={"Допомога ЗСУ"} onClick={onChange} required />
                <Form.Check type="radio" name={`type`} label="Гуманітарна допомога" value={"Гуманітарна допомога"} onClick={onChange} />
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicKind">
                <Form.Label><b>Вид допомоги <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Select type="text" placeholder="Оберіть вид матеріальної допомоги" name="kind" value={kind} onChange={onChange} required >
                    <option value={""}></option>
                    <option value={"Авто"}>Авто</option>
                    <option value={"БПЛА"}>БПЛА</option>
                    <option value={"Медичне спорядження"}>Медичне спорядження</option>
                    <option value={"Продовольче"}>Продовольче</option>
                    <option value={"Непродовольче"}>Непродовольче</option>
                    <option value={"Інше"}>Інше</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicDescription">
                <Form.Label><b>Опис <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Control as="textarea" type="text" resize="none" placeholder="Введіть опис допомоги" name="description" value={description} onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicPhoto">
                <Form.Label><b>Фото (лише одне) <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Control type="file" accept="image/*" alt="Оберіть фото" name="photo" onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Я приймаю умови використання даного сайту" name="agreement"
                    checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required 
                />
            </Form.Group>

            <Button variant="primary" type="submit" 
                disabled={
                    type === "" || kind === "" ||
                    description === "" || photo === undefined ||
                    !agreement
                } 
                onClick={sendNotice}
            >
                Додати оголошення
            </Button>

            <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
            </Form.Group>
        </Form>
    )
}

export default NoticeForm