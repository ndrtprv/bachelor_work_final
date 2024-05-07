import React, { useContext } from 'react';
import {observer} from "mobx-react-lite";
import {Route, Routes} from 'react-router-dom';
import { adminRoutes, userRoutes, publicRoutes } from '../../routes';
import { Context } from '../..';

const AppRouter = observer(() => {

  const {user} = useContext(Context);

  return (
    <Routes>
      {user.isLoggedIn && user.isAdmin && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {user.isLoggedIn && userRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact />
      )}
    </Routes>
  )
});

export default AppRouter;