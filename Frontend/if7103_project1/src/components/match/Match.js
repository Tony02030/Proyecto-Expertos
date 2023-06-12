import { useEffect, useState } from "react";
import "./Match.css"
import Table from 'react-bootstrap/Table';

export function Match ({ idUser }) {
    const [showMessage, setShowMessage] = useState(false)
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/similar/'+ idUser);
            
            if(!response.ok){
                setShowMessage(true)
            }else{
                const jsonData = await response.json();
                setData(jsonData);
            }
        } catch (error) {
            setShowMessage(true)
            console.error(error);
        }
    };

    return(
        <>
            <h1>Personas afines con tu inteligencia</h1>
            {showMessage && (
                <div className="alert alert-danger" id="myMessage">
                    Debes realizar la Prueba de inteligencia para ver a las personas afines contigo.
                </div>
            )}
            <Table responsive>
                <thead>
                    <tr>
                    <th>User</th>
                    <th>Intelligence</th>
                    <th>Distance</th>
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