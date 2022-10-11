import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { AiOutlineSearch } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Cover from "../image/cover1.png";
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../config/api';


function Searchresault() {
    // Fetching product data from database
    let { data: literaturs } = useQuery('literaturssCache', async () => {
        const response = await API.get('/literaturs');
        console.log("ini", literaturs);
        return response.data.data;
    });
    //declare state
    const [dataFilter, setDataFilter] = useState([]);

    function handleChangeLiterature(e) {
        if (!e.target.value) {
            setDataFilter(literaturs);
            return;
        }
        const filter = literaturs?.filter((item) => {
            return item.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setDataFilter(filter);
    }

    useEffect(() => {
        if (literaturs) setDataFilter(literaturs);
    }, [literaturs]);


    return (
        <>
            <div className="d-grid gap-2" >
                <Form>
                    <Row>
                        <Col
                            xs={7}
                            style={{
                                marginLeft: "120px",
                                justifyContent: "center",
                            }}
                        >
                            <Form.Control
                                placeholder="Search for literature"
                                onChange={handleChangeLiterature}
                            />
                        </Col>
                        <Col>
                            <Button
                                as={Link} to="/search"
                                className="ml-2"
                                type="submit"
                                style={{
                                    padding: 5,
                                    backgroundColor: "red",
                                }}
                            // href="/search" 
                            >
                                <AiOutlineSearch size="26px" color="white" />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                <div style={{ marginLeft: "115px", marginTop: "20px", color: "white" }}>
                    <p>Anytime</p>
                    <DropdownButton id="dropdown-basic-button" title="Since " variant="light">
                        <Dropdown.Item href="/action-1">2017</Dropdown.Item>
                        <Dropdown.Item href="/action-2">2020</Dropdown.Item>
                        <Dropdown.Item href="/action-3">2015</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <br />
            <div style={{ marginLeft: "115px", marginTop: "10px", marginRight: "115px" }} >
                <Row xs={1} md={4} className="g-4">
                    {dataFilter?.map((data, index) => {
                        return (
                            <Col>
                                <Link to={`/detail/${data.id}`} className="text-decoraction-none" style={{ textDecoration: "none" }} >
                                    <Card style={{ border: "none", color: "red" }}>
                                        <Card.Img variant="top" src={Cover} style={{ height: "300px", widht: "200px", borderRadius: "10px" }} />
                                        {data?.attache}
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
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </div>




        </>
    )
}

export default Searchresault