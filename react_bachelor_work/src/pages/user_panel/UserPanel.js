import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LANDING_ROUTE } from '../../utils/constants';

function UserPanel() {

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'user/verify')
    .then(res => {
      if (res.data.status) {
        console.log(res);
      } else {
        navigate(LANDING_ROUTE);
      }
    })
  });

  return (
    <div>UserPanel</div>
  )
}

export default UserPanel