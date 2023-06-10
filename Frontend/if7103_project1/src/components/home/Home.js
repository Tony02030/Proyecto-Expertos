import "./Home.css"
import { Carousel } from "react-bootstrap";
import React from "react";
import img1 from "../../img/1.png";
import img2 from "../../img/2.png";
import img3 from "../../img/3.png";
import img4 from "../../img/4.png";
import img5 from "../../img/5.png";
import img6 from "../../img/6.png";
import img7 from "../../img/7.png";
import img8 from "../../img/8.png";
import img9 from "../../img/9.png";
import img10 from "../../img/10.png";
import img11 from "../../img/11.png";
import img12 from "../../img/12.png";

const imagePaths = {img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12};

export function Home({ user, setUser }) {
    return (
        <>
            <h1>
                Hola {user}, en este test conocerás qué tipo de inteligencia tienes.
            </h1>

            <Carousel interval={500}>
                {Object.values(imagePaths).map((image, index) => (
                <Carousel.Item key={index}>
                    <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}