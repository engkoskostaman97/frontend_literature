import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../image/literatur.png"
function Navbars() {
    return (
        <>
            <Navbar>
                <Navbar
                    fixed="top"
                    bg="black"
                    variant="dark"
                    expand="lg"
                    className="navbg"
                    style={{ height: "10vh" }}
                >
                    <Container>
                        <Nav>
                            <Nav.Link>
                                <Link to="/profile" className="navlink text-white text-decoration-none">
                                    Profile
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/mycollection" className="navlink text-white text-decoration-none">
                                    My Collection
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/addliterature" className="navlink text-white text-decoration-none">
                                    Add Literature
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/" className="navlink text-white text-decoration-none">
                                    Logout
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <Navbar.Brand as={Link} to="/home" style={{ marginLeft: "380px" }}>
                            <img src={Logo} alt="" />
                        </Navbar.Brand>

                    </Container>
                </Navbar>
            </Navbar>

        </>
    )
}

export default Navbars;