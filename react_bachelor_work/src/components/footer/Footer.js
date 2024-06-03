import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

function Footer(props) {

  var cop_text = "© " + new Date().getFullYear() + " «ValorAid Network». Усі права захищені.";

  return (
    <footer className="footer text-center text-white foot-bottom">
      <Container >
        <section className="mt-5">
          <Row className="text-center d-flex justify-content-center pt-5">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold lat">
                Про нас
              </h6>
              <ul style={{listStyleType: 'none'}}>
                {Object.entries(props.data1).map(([path, label]) =>
                  <li key={path}>
                    <Link key={path} to={path} className="text-white">{label}</Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold lat">
                Допомога
              </h6>
              <ul style={{listStyleType: 'none'}}>
                {Object.entries(props.data2).map(([path, label]) =>
                  <li key={path}>
                    <Link key={path} to={path} className="text-white">{label}</Link>
                  </li>
                )}
              </ul>
            </div>
            {Object.entries(props.data3).map(([path, label]) =>
              <div className="col-md-2" key={path}>
                <h6 className="text-uppercase font-weight-bold lat">
                  <Link key={path} to={path} className="text-white">{label}</Link>
                </h6>
              </div>
            )}
          </Row>
        </section>
        <hr className="my-5" />
        <section className="mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p className='rob'>
                Разом ми можемо змінити Україну на краще. Долучайтеся до нас у нашій місії добра та підтримки!
              </p>
            </div>
          </div>
        </section>
        <section className="text-center mb-5">
          {Object.entries(props.data4).map(([path, label]) =>
            <Link key={path} to={label} className="text-white me-4">
              <i key={path} className={path}></i>
            </Link>
          )}
        </section>
      </Container>
      <div className="text-center p-3 foot-back">
        {cop_text} Розроблено <Link to="https://github.com/ndrtprv" className="text-white">Andrii Toporov</Link>
      </div>
    </footer>
  );
}

export default Footer;