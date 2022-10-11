import React, { useState, useContext } from "react";
import Navbars from "../component/Navbars";
import Button from "react-bootstrap/Button";
import { Card, Row, Col } from "react-bootstrap";
import { API } from '../config/api';
import { useQuery } from 'react-query';
import Cover from "../image/cover1.png"
import { UserContext } from "../context/userContext";


function Mycollection() {
    const [state, dispatch] = useContext(UserContext);
    const [user, setUser] = useState(null)


    console.log("testing", state);
    const [collection, setCollection] = useState([])

    let { data: collections } = useQuery("collectionCache", async () => {

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        const response = await API.get(`/checkauth`, config);
        console.log("response collection", response);

        const collection = await API.get(`/user/${response.data?.data?.id}`)


        const resultResponse = collection.data?.data?.literatur;
        setUser(collection.data?.data?.collections)
        setCollection(resultResponse)
        console.log("ini collection", resultResponse);

        return resultResponse;
    });

    console.log("ini colection user", user);
    return (
        <>
            <div>
                <Navbars />
            </div>
            <h3 style={{ marginLeft: "115px", color: "white" }}> My Collection</h3>
            <div style={{ marginLeft: "115px", marginRight: "115px" }}>


                <Row xs={1} md={4} className="g-4">


                    {user?.map((data, index) => {
                        return (
                            <Col>
                                <Card style={{ border: "none" }}>
                                    <Card.Img variant="top" src={Cover} style={{ height: "350px", borderRadius: "10px" }} />
                                    {/* {data?.attache} */}
                                    <Card.Body style={{ backgroundColor: "black" }}>
                                        <Card.Title style={{ backgroundColor: "black", color: "white", marginLeft: "-17px" }}>{data?.literatur?.title}</Card.Title>
                                        <Card.Text style={{ color: "white" }}>
                                            <Row style={{ marginLeft: "-28px" }}>
                                                <Col>{data?.literatur?.author}</Col>
                                                <Col>{data?.literatur?.publicationdate}</Col>
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

export default Mycollection;