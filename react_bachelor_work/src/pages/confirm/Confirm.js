import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { USER_ROUTE } from '../../utils/constants';

function Confirm() {

    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'user/confirm/' + token)
        .then(response => {
            if (response.data.status) {
                navigate(USER_ROUTE);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    return (
        <div>Confirm</div>
    )
}

export default Confirm