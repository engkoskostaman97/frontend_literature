import React from 'react'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from "../image/literatur.png";
import Image2 from "../image/Ellipse 1.png";
import Image3 from "../image/logout1.png";
function NavbarAdmin() {
    return (
        <>
            <Navbar bg="dark" expand="lg" className="sticky-sm-top" style={{ widht: "40px", height: "70px" }}>
                <Container variant="dark">
                    <Navbar.Brand href="/list">
                        <img
                            alt=""
                            src={Logo}
                            width="70"
                            backgroundColor={"black"}
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Brand >
                        <Navbar variant="dark" bg="dark" expand="lg" style={{ widht: "30px", height: "20px" }} >
                            <Container fluid>
                                <Navbar.Toggle aria-controls="navbar-black-example" className='bg-dark' />
                                <Navbar.Collapse id="navbar-black-example" className='bg-dark'>
                                    <Nav >
                                        <img
                                            alt=""
                                            src={Image2}
                                            className="image-dropdown"
                                        />{' '}
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant='dark'>
                                                <hr></hr>
                                                <Dropdown.Item href="/" className='d-flex ' >
                                                    <img src={Image3} alt="image4" className="image-logout" />
                                                    <p className='text-danger  mx-2 mt-3 mb-2'>Log out</p>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Navbar.Brand>
                </Container>
            </Navbar >

        </>
    )
}

export default NavbarAdmin;