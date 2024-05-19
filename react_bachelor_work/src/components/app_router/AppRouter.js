import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';
import { adminRoutes, userRoutes, publicRoutes } from '../../routes';
import { LANDING_ROUTE } from '../../utils/constants';

const AppRouter = observer(() => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'user/verify')
    .then(res => {
      if (res.data.status) {
        setIsLoggedIn(res.data.status);

        if (res.data.isAdmin) {
          setIsAdmin(res.data.isAdmin)
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }).catch(err => {
      console.log(err.message);
    })
  });

  return (
    <Routes>
      {isLoggedIn && isAdmin && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {isLoggedIn && userRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      <Route path='*' element={<Navigate to={LANDING_ROUTE} />} />
    </Routes>
  )
});

export default AppRouter;