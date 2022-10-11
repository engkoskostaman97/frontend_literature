import React from 'react'
import NavbarAdmin from '../component/NavbarAdmin';
import { Table, Card, Dropdown } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";
const styles = {
    cardd: {
        backgroundColor: "black",
        margin: "20px",
    },
};

function Admin() {
    // Fetching product data from database
    let { data: literaturs } = useQuery('literaturssCache', async () => {
        const response = await API.get('/literaturs');
        console.log("ini", literaturs);
        return response.data.data;
    });
    return (
        <>
            <div><NavbarAdmin /></div>
            <div>
                <Card style={styles.card}>

                    <Card.Body className="text-light m-3">
                        <Card.Title className="mb-4 text-dark lg" >Book verification</Card.Title>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr className="text-dark">
                                    <th>ID</th>
                                    <th>Users or Author</th>
                                    <th>ISBN</th>
                                    <th>Literature</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {literaturs?.map((item, id) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.author}</td>
                                            <td>{item.isbn}</td>
                                            <td className='text-primary'>{item.attache}</td>
                                            <td className="text-success">Approve</td>
                                            <td>
                                                <Dropdown className="me-5">
                                                    <Dropdown.Toggle
                                                        variant="blue"
                                                        id="dropdown-basic"
                                                        style={{
                                                            backgroundColor: "none",
                                                            color: "blue",
                                                            border: "none",
                                                        }}
                                                        className="fs-4"
                                                    ></Dropdown.Toggle>
                                                    <Dropdown.Menu className="bg-dark">
                                                        <Dropdown.Item
                                                            href="/action-1"
                                                            className="text-success text-center"
                                                        >
                                                            <span>Approved</span>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            href="/action-2"
                                                            className="text-danger text-center"
                                                        >
                                                            <span>Cancel</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </>

    );
}



export default Admin;