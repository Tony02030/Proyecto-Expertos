import { Carousel } from "react-bootstrap";
import logo from "../../img/logo.svg";

export function Home ({ user , setUser }) {
    return(
        <>
            <h1>Hola {user}, con esta prueba conocerás qué tipo de inteligencia tienes.</h1> 
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={logo}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>    
            </Carousel>
        </>
    )
}