import { NavLink, useNavigate } from 'react-router-dom';
import { LANDING_ROUTE, USER_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, ADMIN_ROUTE } from '../../../utils/constants';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import axios from 'axios';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';

function NavigationPanel(props) {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatar, setAvatar] = useState(props.avatar);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'user/nav')
        .then(res => {
            if (res.data.status) {
                setIsLoggedIn(res.data.status);

                if (res.data.isAdmin) {
                    setIsAdmin(res.data.isAdmin)
                }

                if (res.data.portrait !== null) {
                    setAvatar(res.data.portrait);
                }
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        }).catch(err => {
            console.log(err.message);
        })
    });
    
    const logOut = () => {
        axios.get('http://localhost:3003/user/logout')
        .then(res => {
            if (res.data.status) {
                navigate(LANDING_ROUTE);
            }
        }).catch(e => {
            console.log(e);
        })
    }

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
                    {
                        isLoggedIn ? 
                        <Nav className="nav navbar-right">
                            <NavLink to={USER_ROUTE} className="nav-link lat">
                                <Avatar alt="Профіль" src={avatar !== props.avatar ? `data:${avatar.contentType};base64,${avatar.data}` : props.avatar} size="2.4em" />
                            </NavLink>
                            {
                                isAdmin ? 
                                <NavLink to={ADMIN_ROUTE} className="nav-link lat">
                                    <Button type="button" className="btn btn-primary my-2 rob-btn" >Адмін панель</Button>
                                </NavLink>
                                : 
                                <></>
                            }
                            <NavLink to={LANDING_ROUTE} className="nav-link lat">
                                <Button type="button" className="btn btn-warning my-2 rob-btn" onClick={logOut}>Вийти</Button>
                            </NavLink>
                        </Nav>
                        :
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