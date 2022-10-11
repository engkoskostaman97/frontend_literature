import React, { useRef } from "react";
import {
    Form,
    Col,
    Modal,
    Button,
} from "react-bootstrap";

import { BsPaperclip } from "react-icons/bs";


const styles = {
    col: {
        width: "465px",
    },
    color: {
        backgroundColor: "rgba(210, 210, 210, 0.25)",
        resize: "none",
        borderColor: "white",
        boxShadow: "none",
    },
};

const Editprofile = ({ show, handleClose }) => {
    const fileInput = useRef(null);
    const handleFileInput = (e) => fileInput.current.click();
    const handleSubmit = (e) => {
        e.preventDefault();

        handleClose();
    };


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                style={{ justifyContent: "center" }}
                className=' container d-flex align-items-center ms-1'
            >
                <div style={{ width: "700px" }}>
                    <Modal.Header className="bg-dark text-white border-0">
                        <Modal.Title className="fw-bold ">Edite Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white border-0">
                        <Form>
                        

                                <Col>
                                    {/* Attach */}
                                    <Form.Group className="mb-3 ms-1" controlId="attach">
                                        <input type="file" className="d-none" ref={fileInput} />
                                        <Button
                                            style={styles.color}
                                            onClick={handleFileInput}
                                            className="text-secondary"
                                        >
                                            Attach Thumbnail <BsPaperclip className="text-danger" />
                                        </Button>
                                    </Form.Group>
                                </Col>
            
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Control
                                    style={styles.color}
                                    type="text"
                                    placeholder="Gender"
                                    className="mb-3 text-white "
                                    name="gender"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Control
                                    style={styles.color}
                                    type="number"
                                    placeholder="No Handphone"
                                    className="mb-3 text-white "
                                    name="phone"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="addres">
                                <Form.Control
                                    style={styles.color}
                                    type="text"
                                    placeholder="Addres"
                                    className="mb-3 text-white "
                                    name="addres"
                                />
                            </Form.Group>
                            <Form.Group style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    className="text-light text-center col-4 fw-bold"
                                    style={{ backgroundColor: "red", border: "none" }}
                                    onClick={handleSubmit}
                                >
                                    Add
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}

export default Editprofile