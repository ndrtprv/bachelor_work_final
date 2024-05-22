import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { adminRoutes, userRoutes, publicRoutes } from '../../routes';
import { LANDING_ROUTE } from '../../utils/constants';

function AppRouter() {

  return (
    <Routes>
      {adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {userRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      <Route path='*' element={<Navigate to={LANDING_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter;