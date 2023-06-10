import "./Match.css"
import Table from 'react-bootstrap/Table';

export function Match () {
    const data = [
        { user: 'Alberto', intelligence: 'Intrapersonal', distance: 11.874342087037917 },
        { user: 'Karla', intelligence: 'Lógico-matemático', distance: 12.206555615733702 },
    ];

    return(
        <>
            <h1>Personas afines con tu inteligencia</h1>
            
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