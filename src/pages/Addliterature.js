
import React, { useState, useEffect } from "react";
import Navbars from "../component/Navbars";
import { Form, Card, Row, Col, Button, Alert } from "react-bootstrap";
import { BsPaperclip } from "react-icons/bs";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function Addliterature() {
    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
        title: "",
        publicationdate: "",
        pages: "",
        isbn: "",
        author: "",
        attache: "",
    });

    const [message, setMessage] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        console.log("punya si ", e.target.name);
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
        console.log("handle change", e.target.name);
        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type 
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.token}`,
                },
            };

            const formData = new FormData();
            formData.set("title", form?.title);
            formData.set("publicationdate", form?.publicationdate);
            formData.set("pages", form?.pages);
            formData.set("isbn", form?.isbn);
            formData.set("author", form?.author);
            formData.set("attache", form.attache[0], form.attache[0].name);

            console.log(form);

            const response = await API.post("/literatur", formData, config);
            console.log(response);

            navigate("/profile");

            // Handling response here 
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

    useEffect(() => {
        console.log(form);
    }, [form.fileattach]);


    return (
        <>
            <div>
                <Navbars />
            </div>
            <h3 style={{ marginLeft: "115px", color: "white" }}> Add Literature</h3>

            <div style={{ backgroundColor: "black", marginTop: "11vh" }}>
                <form
                    onSubmit={(e) => {
                        handleSubmit.mutate(e);
                    }}
                    className="  col-10 d-flex justify-content-center"
                    style={{ marginLeft: "120px" }}
                >
                    <div className="row g-2 justify-content-center">
                        <div className="d-grid gap-2">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={handleChange}
                                className="bg-dark text-white"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <Form.Control
                                type="text"
                                placeholder="Publication Date"
                                onChange={handleChange}
                                name="publicationdate"
                                className="bg-dark text-white"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <Form.Control
                                type="text"
                                placeholder="Pages"
                                name="pages"
                                onChange={handleChange}
                                className="bg-dark text-white"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <Form.Control
                                type="text"
                                placeholder="ISBN"
                                name="isbn"
                                onChange={handleChange}
                                className="bg-dark text-white"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <Form.Control
                                type="text"
                                placeholder="Author,Ex: Rizky"
                                name="author"
                                onChange={handleChange}
                                className="bg-dark text-white"
                            />
                        </div>

                        <div>
                            <div className="col-4">
                                <div className="form-floating">
                                    <Form.Group className=" mt-2 ms-2 d-flex ">
                                        {preview && (
                                            <div>
                                                <img
                                                    src={preview}
                                                    style={{
                                                        maxWidth: "320px",
                                                        maxHeight: "200px",
                                                        objectFit: "cover",
                                                    }}

                                                    className="text-danger"
                                                    alt={preview}
                                                />
                                            </div>
                                        )}
                                        <Form.Label
                                            for="fileattach"
                                            className="d-block p-2 bg-dark text-white rounded border"
                                            type="file"
                                            style={{ cursor: "pointer" }}
                                        >
                                            Attache Book File
                                            <BsPaperclip className="text-danger mx-2" />
                                        </Form.Label>
                                        <div>
                                            <Form.Control
                                                type="file"
                                                id="fileattach"
                                                name="attache"
                                                onChange={handleChange}
                                                accept="image/*,.pdf"
                                                hidden
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                            <button
                                class="btn btn-danger float-md-end btn-l d-grid gap-2 col-2"
                                type="submit"
                            >
                                Add Literature
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Addliterature;
