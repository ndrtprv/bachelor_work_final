import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './Landing.css';
import uaf_help from '../../resources/uaf_help.jpg';
import humanitarian from '../../resources/humanitarian.jpg';
import volunteer from '../../resources/volunteer.jpg';
import about_fund from '../../resources/about_fund.jpg';
import fundraise from '../../resources/fundraise.jpg';
import results from '../../resources/results.jpg';
import LandingCarousel from '../../components/carousel/LandingCarousel';
import { ABOUT_ROUTE, FUNDRAISINGS_ROUTE, RESULTS_ROUTE, STAFF_ROUTE } from '../../utils/constants';
import Feedback from '../../components/feedback/Feedback';
import axios from 'axios';

function Landing(props) {

  const headerFeedback = "Зворотній зв'язок";
  const textFeedback = "Якщо вас цікавлять певні питання, зв'яжіться з нами, заповнивши форму.";
  const classNameContainer = "d-flex flex-column justify-content-center";
  const classNameForm = "p-2";

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'staff/main')
    .then(response => {
      setAdmins(response.data.adminsProcessed);
    }).catch(err => {
      console.log(err.message);
    });
  });

  return (
    <main>
      <LandingCarousel uaf_help={uaf_help} humanitarian={humanitarian} volunteer={volunteer} />
      <div className="container marketing">
        <div className="row featurette start_elem">
          <div className="col-md-7 txt_field">
            <h2 className="featurette-heading lat-h2">Про благодійний фонд</h2>
            <p className="lead">"ValorAid Network" - це благодійний фонд, який об'єднує зусилля для надання підтримки на передовій лінії ЗСУ та надання гуманітарної допомоги тим, хто постраждав від наслідків конфлікту. Наш фонд зобов'язаний підтримувати і вдягати героїв на фронті та протягом мирних днів надавати допомогу потребуючим для відновлення життя.</p>
            <p className='rob-btn'>
              <NavLink to={ABOUT_ROUTE} className="nav-link lat">
                <Button type="button" className="btn btn-info" >Докладніше</Button>
              </NavLink>
            </p>
          </div>
          <div className="col-md-5">
            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={about_fund} width="100%" height="100%" /></svg>
          </div>
        </div>
        <hr className="featurette-divider"/>
        <div className="row">
          <h2 className="featurette-heading lat-h2">Склад благодійного фонду</h2>
          {admins.map((admin, index) =>
            <div className="col-lg-4" key={index}>
              <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><image href={admin.user.avatars ? `data:${admin.user.avatars.contentType};base64,${admin.user.avatars.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} width="140" height="140" /></svg>
              <h3 className='lat-h3'>{admin.user.name + ' ' + admin.user.surname}</h3>
              <p className='rob'>{admin.role}</p>
              <p className='rob-btn'>
                <NavLink to={STAFF_ROUTE + `/${admin.admin_id}`} className="nav-link lat">
                  <Button type="button" className="btn btn-secondary" >Деталі »</Button>
                </NavLink>
              </p>
            </div>
          )}
        </div>
        <hr className="featurette-divider"/>
        <div className="row featurette">
          <div className="col-md-7 order-md-2 txt_field">
            <h2 className="featurette-heading lat-h2">Збори</h2>
            <p className="lead">Місце, де ви можете долучитися до нашої місії та внести свій внесок у підтримку ЗСУ та допомогу тим, хто постраждав від війни. Тут ви зможете знайти різноманітні можливості пожертвувань та долучитися до наших проектів для спільного досягнення позитивних змін.</p>
            <p className='rob-btn'>
              <NavLink to={FUNDRAISINGS_ROUTE} className="nav-link lat">
                <Button type="button" className="btn btn-info" >Актуальні збори</Button>
              </NavLink>
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={fundraise} width="100%" height="100%" /></svg>
          </div>
        </div>
        <hr className="featurette-divider"/>
        <div className="row featurette">
          <div className="col-md-7 txt_field">
            <h2 className="featurette-heading lat-h2">Звіти</h2>
            <p className="lead">Ми ділимося докладними звітами про використання пожертвувань та реалізовані проекти. Тут ви зможете дізнатися, як ваша підтримка сприяє покращенню життя воїнів ЗСУ та тих, хто потерпів від війни, і бачити конкретні результати нашої спільної діяльності.</p>
            <p className='rob-btn'>
              <NavLink to={RESULTS_ROUTE} className="nav-link lat">
                <Button type="button" className="btn btn-info" >Усі звіти</Button>
              </NavLink>
            </p>
          </div>
          <div className="col-md-5">
            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={results} width="100%" height="100%" /></svg>
          </div>
        </div>
        <hr className="featurette-divider"/>
        <div className="row featurette">
          <Feedback isSmall={false} headerFeedback={headerFeedback} textFeedback={textFeedback} classNameContainer={classNameContainer} classNameForm={classNameForm} />
        </div>
      </div>
    </main>
  );
}

export default Landing;