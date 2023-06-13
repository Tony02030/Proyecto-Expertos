import "./Home.css"
import arrayIntelligences from "./intelligences.json"
import { Carousel } from "react-bootstrap";
import React from "react";

export function Home({ user, setUser }) {
    return (
        <>
            <h1 className="my-text">
                Hola {user}, en este test conocerás qué tipo de inteligencia tienes.
            </h1>
            <Carousel interval={2000}>
            {arrayIntelligences.inteligencias.map((intelligence, index) => {
                return (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src={intelligence.url} alt={`Slide ${index + 1}`} />
                        <Carousel.Caption>
                            <h4 className="carousel-text">{intelligence.descripcion}</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })}
            </Carousel>
        </>
    );
}
