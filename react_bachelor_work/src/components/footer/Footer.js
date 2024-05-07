import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Footer(props) {

  var cop_text = "© " + new Date().getFullYear() + " «ValorAid Network». Усі права захищені.";
  const merged_data = {...props.data1, ...props.data2};

  return (
    <footer className="footer text-center text-white foot-bottom">
      <Container className="container">
        <section className="mt-5">
          <div className="row text-center d-flex justify-content-center pt-5">
            {Object.entries(merged_data).map(([path, label]) =>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold lat">
                  <Link key={path} to={path} className="text-white">{label}</Link>
                </h6>
              </div>
            )}
          </div>
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
          {Object.entries(props.data3).map(([path, label]) =>
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