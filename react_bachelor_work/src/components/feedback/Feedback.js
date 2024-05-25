import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";

function Feedback(props) {

    const [feedbackData, setFeedbackData] = useState({
        name: "",
        email: "",
        topic: "",
        text: "",
    });
    
    const { name, email, topic, text } = feedbackData;
    
    const onChange = (e) => {
        setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
    };

    const classNameContainer = !props.isSmall ? props.classNameContainer : "";

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_API_URL + 'feedback/send', feedbackData)
            .then(response => {
                console.log(response);
                if (response.data.status) {
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
        <Container className={classNameContainer}>
            {
                !props.isSmall ?
                <>
                    <h2 className="featurette-heading lat-h2">{props.headerFeedback}</h2>
                    <p className="lead">{props.textFeedback}</p>
                </>
                :
                <></>
            }
            <Form method="post" id="form-box" className={props.classNameForm} onSubmit={handleSendMessage}>
                <Form.Group className="input-group mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i> <b><span style={{color: "red"}}>*</span></b></span>
                    </div>
                    <Form.Control type="text" name="name" placeholder="Введіть ваше ім'я" value={name} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="input-group mt-2 mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-envelope"></i> <b><span style={{color: "red"}}>*</span></b></span>
                    </div>
                    <Form.Control type="email" name="email" placeholder="Введіть ваш email" value={email} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="input-group mt-2 mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-at"></i> <b><span style={{color: "red"}}>*</span></b></span>
                    </div>
                    <Form.Control type="text" name="topic" placeholder="Тема листа" value={topic} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="input-group mt-2 mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-comment-alt"></i> <b><span style={{color: "red"}}>*</span></b></span>
                    </div>
                    <Form.Control as="textarea" type="text" name="text" id="text" placeholder="Ваше повідомлення..." cols="30" rows="4" value={text} onChange={onChange} required></Form.Control>
                </Form.Group>
        
                <Form.Group className="mt-2">
                    <Form.Control type="submit" name="submit" id="submit" className="btn btn-primary btn-block" 
                        disabled={name === "" || email === "" || topic === "" || text === ""} value="Відправити" 
                    />
                </Form.Group>

                <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                    <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Feedback;