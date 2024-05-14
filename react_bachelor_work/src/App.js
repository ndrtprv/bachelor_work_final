import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {observer} from "mobx-react-lite";
import AppRouter from './components/app_router/AppRouter';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { paths_data1, paths_data2, media_paths } from './utils/constants';

const App = observer(() =>  {

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