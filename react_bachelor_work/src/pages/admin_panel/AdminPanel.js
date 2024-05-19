import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LANDING_ROUTE } from '../../utils/constants';

function AdminPanel() {

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3003/user/verify')
    .then(res => {
      if (res.data.status && res.data.isAdmin) {
        console.log(res);
      } else {
        navigate(LANDING_ROUTE);
      }
    })
    .catch(err => {
      console.log(err.message);
    })
  });

  return (
    <div>AdminPanel</div>
  )
}

export default AdminPanel