import React from 'react';
import {observer} from "mobx-react-lite";
import {Route, Routes, Navigate} from 'react-router-dom';
import { adminRoutes, userRoutes, publicRoutes } from '../../routes';
import { LANDING_ROUTE } from '../../utils/constants';

const AppRouter = observer(() => {

  return (
    <Routes>
      {/*user.isLoggedIn && user.isAdmin &&*/ adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {/*user.isLoggedIn &&*/ userRoutes.map(({path, Component}) =>
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