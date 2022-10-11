
import React, { useState, useContext, useEffect } from "react";
import avatar from "../image/profile.png";
import name from "../assets/profile/name.png";
import email from "../assets/profile/email.png";
import status from "../assets/profile/status.png";
import gender from "../assets/profile/gender.png";
import phone from "../assets/profile/phone.png";
import address from "../assets/profile/address.png";
import Navbars from "../component/Navbars";
import Editprofile from "../component/Editprofile";
import Cover from "../image/cover1.png"
import { UserContext } from "../context/userContext";
import { API } from '../config/api'
import { useQuery } from 'react-query'


import { Card, Row, Col } from "react-bootstrap";

function Profile() {
    // const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);
    // const handleClose = () => setShow(false);

    const [state, dispatch] = useContext(UserContext);

    const [user, setUser] = useState(null)


    console.log("testing user literatur", state);



    const [literatur, setLiteratur] = useState([])

    let { data: literaturs } = useQuery("literaturCache", async () => {

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        const response = await API.get(`/checkauth`, config);
        console.log("response literatur", response);

        const liter = await API.get(`/user/${response.data?.data?.id}`)

        const resultResponse = liter.data.data.literatur;
        setUser(liter.data?.data)
        setLiteratur(resultResponse)
        console.log("ini", resultResponse);

        return resultResponse;
    });

    console.log(user);

    return (
        <>
            <div>
                <Navbars />
            </div>
            <h3 style={{ marginLeft: "110px", color: "white" }}> Profile</h3>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-desc">
                        <div className="profile-data">
                            <div className="profile-icon">
                                <img src={email} alt="" />
                            </div>
                            <div className="profile-details">
                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    {state?.user?.email}
                                </span>
                                <span>Email</span>
                            </div>
                        </div>
                        <div className="profile-data">
                            <div className="profile-icon">
                                <img src={gender} alt="" />
                            </div>
                            <div className="profile-details">
                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    {" "}
                                    {user?.gender}
                                </span>
                                <span>Gender</span>
                            </div>
                        </div>
                        <div className="profile-data">
                            <div className="profile-icon">
                                <img src={phone} alt="" />
                            </div>
                            <div className="profile-details">
                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    {user?.phone}
                                </span>
                                <span>Mobile Phone</span>
                            </div>
                        </div>
                        <div className="profile-data">
                            <div className="profile-icon">
                                <img src={address} alt="" />
                            </div>
                            <div className="profile-details">
                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    {user?.address}
                                </span>
                                <span>Address</span>
                            </div>
                        </div>
                        {/* <div>
                            <button className='btn-edite'>Edite Profile</button>
                        </div> */}
                    </div>

                    <div className="profile-img">
                        <img src={avatar} alt="avatar" className="profile-avatar" style={{ height: "300px", weight: "100px", objectFit: "cover" }} />
                        <button className="profile-button">Change Photo Profile</button>
                        {/* <Editprofile show={show} handleClose={handleClose} /> */}
                    </div>
                </div>
            </div>
            <h3 style={{ marginLeft: "110px", color: "white" }}> My Literature</h3>
            <br />
            <div style={{ marginLeft: "115px", marginRight: "115px" }}>

                <Row xs={1} md={4} className="g-4">


                    {literatur?.map((data, index) => {
                        return (
                            <Col>
                                <Card style={{ border: "none" }} className="text-danger">
                                    <Card.Img variant="top" src={Cover} style={{ height: "300px", borderRadius: "10px" }} />
                                    {data.attache}
                                    <Card.Body style={{ backgroundColor: "black" }}>
                                        <Card.Title style={{ backgroundColor: "black", color: "white", marginLeft: "-17px" }}>{data.title}</Card.Title>
                                        <Card.Text style={{ color: "white" }}>
                                            <Row style={{ marginLeft: "-28px" }}>
                                                <Col>{data.author}</Col>
                                                <Col style={{ marginLeft: "140px" }}>{data.publicationdate}</Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>

        </>
    );
}

export default Profile;
