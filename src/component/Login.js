import React, { useContext, useState } from "react";
import { Modal, Alert, FormText } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function ModalLogin({
    loginShow,
    setLoginShow,
    loginHere,
    setIsLogin,
}) {
    function ShowPass() {
        let x = document.getElementById("ShowPass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    let Navigate = useNavigate();
    const navigate = useNavigate

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Data body
            const body = JSON.stringify(form);

            // Configuration
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            };

            // Insert data for login process
            const response = await API.post("/login", body, config);

            console.log(response);

            // Checking process
            if (response.data.code == 200) {
                // Send data to useContext
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });

                // Status check
                if (response.data.data.status === "admin") {
                    Navigate("/admin")
                } else {
                    Navigate("/home");
                }

            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Login failed
                    </Alert>
                );
                console.log("else")

                setMessage(alert);
            }


        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Login failed
                </Alert>
            );
            console.log("catch")
            setMessage(alert);
            console.log(error);
        }
    });

    return (
        <Modal
            size="md"
            show={loginShow}
            onHide={() => setLoginShow(false)}
            centered
        >
            <Modal.Body className="bg-Modal">
                <div className="card-auth p-4">
                    <div
                        style={{
                            fontSize: "30px",
                            lineHeight: "49px",
                            fontWeight: "700",
                            color: "white",
                        }}
                        className="mb-3"
                    >
                        Login
                    </div>
                    {message && message}
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className="mt-3 form">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={handleChange}
                                className="px-3 py-2 mt-3"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="ShowPass"
                                value={password}
                                onChange={handleChange}
                                className="px-3 py-2 mt-3"
                            />
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="Show"
                                onClick={ShowPass}
                                className="mt-3"
                            />
                            <label for="Show" className="ms-1 text-light">
                                Show Password
                            </label>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn1" onClick={() => setIsLogin(false)}>
                                Login
                            </button>
                            <p className="warning">
                                Don't have an account?
                                <button onClick={loginHere} className="btnHere">
                                    Click here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
