import { useEffect, useState } from "react";
import "./Match.css"
import Table from 'react-bootstrap/Table';

export function Match({ idUser }) {
    const [showMessage, setShowMessage] = useState(false)
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        fetchData();
        fetchData2();
    });

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/similar/' + idUser);
            if (!response.ok) {
                setShowMessage(true)
            } else {
                const jsonData = await response.json();
                setData(jsonData);
            }
        } catch (error) {
            setShowMessage(true)
            console.error(error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/id/' + idUser);
            if (response.ok) {
                const jsonData = await response.json();
                setData2(jsonData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h2>Personas afines contigo basado en sus repuestas</h2>
            {data2.user_intelligence &&(
                <div className="alert alert-info" id="myMessage2">
                    Tu inteligencia actual es: {data2.user_intelligence}
                </div>
            )}
            {showMessage && (
                <div className="alert alert-danger" id="myMessage">
                    Debes realizar la Prueba de inteligencia para ver a las personas afines contigo.
                </div>
            )}
            <Table responsive>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Inteligencia</th>
                        <th>Distancia</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.user}</td>
                            <td>{item.intelligence}</td>
                            <td>{item.distance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}