import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import AppRouter from './components/app_router/AppRouter';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { paths_data1, paths_data2, media_paths } from './utils/constants';

const App = observer(() =>  {

  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'));
        check().then(data => {
          user.setUser(data)
          user.setIsAuth(true)
        })
      }
      setLoading(false);
    }, 500);
  })

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
      <div className='App'>
        <BrowserRouter>
          <Header data1={paths_data1} data2={paths_data2} />
          <AppRouter />
          <Footer data1={paths_data1} data2={paths_data2} data3={media_paths} />
        </BrowserRouter>
      </div>
  );
})

export default App;