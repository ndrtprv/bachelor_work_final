//import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LANDING_ROUTE/*, USER_ROUTE*/, LOGIN_ROUTE, SIGNUP_ROUTE } from '../../../utils/constants';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
//import Avatar from 'react-avatar';

function NavigationPanel(props) {

    /*const logOut = () => {
        user.setUser({})
        user.setIsLoggedIn(false)
    }*/

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-dark bg-dark" aria-label="navbar">
            <Container className="container-fluid">
                <NavLink to={LANDING_ROUTE} className="navbar-brand"><img src={props.brand} alt="ValorAid Network" className='mybrand' /></NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav me-auto mx-auto">
                        <NavDropdown title="Про нас" className="nav-item dropdown">
                            {Object.entries(props.data1).map(([path, label]) =>
                                <NavLink key={path} to={path} className="dropdown-item lat">{label}</NavLink>
                            )}
                        </NavDropdown>
                        {Object.entries(props.data2).map(([path, label]) =>
                            <NavLink key={path} to={path} className="nav-link lat">{label}</NavLink>
                        )}
                    </Nav>
                    {/*user.isLoggedIn ? 
                        <Nav className="nav navbar-right">
                            <NavLink to={USER_ROUTE} className="nav-link lat">
                                <Avatar alt="Профіль" src={props.avatar} size="2.4em" />
                            </NavLink>
                            <NavLink to={LANDING_ROUTE} className="nav-link lat">
                                <Button type="button" className="btn btn-warning my-2 rob-btn" onClick={() => logOut()}>Вийти</Button>
                            </NavLink>
                        </Nav>
                        :*/
                        <Nav className="nav navbar-right">
                            <NavLink to={LOGIN_ROUTE} className="nav-link lat">
                                <Button type="button" className="btn btn-outline-light me-2 my-2 rob-btn">Увійти</Button>
                            </NavLink>
                            <NavLink to={SIGNUP_ROUTE} className="nav-link lat">
                                <Button type="button" className="btn btn-warning my-2 rob-btn">Зареєструватися</Button>
                            </NavLink>
                        </Nav>    
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationPanel;