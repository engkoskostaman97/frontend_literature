
import React, { useContext, useState } from "react";
import { Modal, Alert, FormText } from "react-bootstrap";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { API } from "../config/api";

export default function Register({
  registerShow,
  setRegisterShow,
  registerHere,
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
  let api = API();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { fullname, email, password, gender, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate()
  const handleSubmit = useMutation(async (e) => {

    console.log("test bro")
    try {
      e.preventDefault();


      // Data body
      const body = JSON.stringify(form);

      // Configuration Content-type
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data user to database
      const response = await API.post("/register", body, config)
      console.log(response)
      if (response.data.data.code == 200) {
        // Send data to useContext
        dispatch({
          type: " SUCCESS",
          payload: response.data.data,
        });

        const alert = (
          <Alert variant="success" className="py-1">
            Register success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="success" className="py-1">
            Register success
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
      show={registerShow}

      onHide={() => setRegisterShow(false)}
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
            className="mb-2"
          >
            Register
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
              <input
                type="text"
                placeholder="FullName"
                name="fullname"
                value={fullname}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="text"
                placeholder="Gender (L/P)"
                name="gender"
                value={gender}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="number"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={address}
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
              <button type="submit" className="btnRegister" onClick={() => setRegisterShow(false)}  >Register</button>
              <p className="warning">
                Already have an account?
                <button className="btnHere" onClick={registerHere} >
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