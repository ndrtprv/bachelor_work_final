import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteUser() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(process.env.REACT_APP_API_URL + 'user/deleteUser')
            .then(response => {
                alert(response.data.message);
            }).catch(err => {
                alert(err.message);
            });
        } catch (e) {
          alert(e.response.data.message);
        }
    }

    return (
        <>
        <Button className='btn-warning' onClick={handleShow}>Видалити користувача</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Видалення користувача</Modal.Title>
            </Modal.Header>
            <Modal.Body>Ви дійсно хочете видалити користувача?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Відмінити
                </Button>
                <Button className='btn-warning' variant="primary" onClick={handleDelete}>
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default DeleteUser