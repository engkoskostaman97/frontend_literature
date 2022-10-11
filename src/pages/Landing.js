import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Homes from '../image/home.png';
import Literatur from '../image/literatur.png'
import { UserContext } from '../context/userContext'
import { useContext } from "react";
// component
import Login from '../component/Login'
import Register from '../component/Register';

function Landing() {
    const [isLogin, setIsLogin] = useState(true);
    const [loginShow, setLoginShow] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);
    const user = localStorage.getItem('token')
    const [show, setShow] = useState(false);

    const [state, dispatch] = useContext(UserContext)
    const registerHere = (e) => {
        e.preventDefault();
        setRegisterShow(false);
        setLoginShow(true);
    };

    const loginHere = (e) => {
        e.preventDefault();
        setLoginShow(false);
        setRegisterShow(true);
    };

    const Navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        Navigate('/')
    }

    useEffect(() => {
        if (user) {
            setIsLogin(true)
        } else setIsLogin(false)
    }, [state, handleLogout]);
    return (

        <>
            <div>
                <img src={Literatur} alt="literatur" className='literatur'style={{marginLeft:"76px"}} />
            </div>
            <Container className="landing">
                <Row noGutters style={{ width: '100%' }}>
                    <Col md={5}>
                        <h1 className="tnr text-light mt-5" style={{ fontFamily: 'Times New Roman' }}>
                            <strong>
                                source <i>of</i> intelligence
                            </strong>
                        </h1>
                        <p className='text-light'>Sign-up and recieve unlimited access to all</p>
                        <p className='text-light'>of your literatures - share your literatures.</p>
                        <br />
                        <div className="mb-5">
                            <Button className="me-2" variant="danger" size="lg" onClick={() => setRegisterShow(true)}>
                                Sign Up
                            </Button>
                            <Button variant="light" size="lg" onClick={() => setLoginShow(true)}>
                                Sign In
                            </Button>
                        </div>
                        <Login
                            loginHere={loginHere}
                            loginShow={loginShow}
                            setLoginShow={setLoginShow}
                            setIsLogin={setIsLogin}
                        />
                        <Register
                            registerHere={registerHere}
                            registerShow={registerShow}
                            setRegisterShow={setRegisterShow}
                        />
                    </Col>
                    <div className='d-flex justify-content-end '>
                        <img src={Homes} alt="landing" className="landing-image" />
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Landing