import React, { useRef } from "react";
import Card from 'react-bootstrap/Card';
import Navbars from '../component/Navbars';
import Cover from "../image/cover1.png"
import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { useReactToPrint } from "react-to-print";
function Detail() {

    let { id } = useParams();

    let { data: literaturs } = useQuery("productCache", async () => {
        const response = await API.get("/literatur/" + id);
        return response.data.data;
    });
    console.log("ini", literaturs);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const body = JSON.stringify({
                literatur_id: parseInt(id),
            });
            await API.post("/collection", body, config);
            navigate("/mycollection");
        } catch (error) {
            console.log(error);
        }
    };





    return (
        <>
            <div>
                <Navbars />
            </div>
            <div class="container">
                <div class="row bg-faded">
                    <div class="col-4">
                        <Card style={{ width: '18rem', height: "30rem" }} className="text-danger">
                            <Card.Img src={Cover} />
                            {literaturs?.attache}

                        </Card>
                    </div>
                    <div class="col-6" style={{ backgrounColor: "black" }}>
                        <div style={{ backgrounColor: "black" }} className="text-light">
                            <h2>{literaturs?.title}</h2>
                            <br></br>
                            <p className='text-secondary'>{literaturs?.author}</p>
                            <h2>Publication date</h2>
                            <br></br>
                            <p className='text-secondary'>{literaturs?.publicationdate}</p>
                            <h2>Pages</h2>
                            <br></br>
                            <p className='text-secondary'>{literaturs?.pages}</p>
                            <h2 className='text-danger'>ISBN</h2>
                            <br></br>
                            <p className='text-secondary'>{literaturs?.isbn}</p>
                            <button className='bg-danger text-light ' >
                                <a style={{ color: "white", textDecoration: "none" }} href={literaturs?.attache} target="_blank" className="">Download</a>
                            </button>
                        </div>
                    </div>
                    <div class="col-2">
                        <button className='bg-danger text-light' onClick={handleSubmit} >
                            Add My Collection
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Detail