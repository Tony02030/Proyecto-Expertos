import "./IntelligenceTest.css"
import arrayQuestions from "./questions.json"
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function IntelligenceTest({ idUser }){
    const [userAnswers, setUserAnswers] = useState({});
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("Debe completar todas las repuestas")

    const handleSubmit = (e) => {
        e.preventDefault ()

        let answers = [];
        Object.keys(userAnswers).forEach(index => {
            answers.push(userAnswers[index]);
        });
        postAnswers(answers)
    }

    const handleCloseModal = () => setShowMessage(false);

    const handleOptionChange = (e) => {
        const question = e.target.name;
        const userAnswer = parseInt(e.target.value);
        setUserAnswers({ ...userAnswers, [question]: userAnswer });
    };

    const postAnswers = async (answers) => {
        try {
            const url = 'http://localhost:5000/api/users/' + idUser;
            const data = { answers: answers};
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                setMessage("Ha ocurrido un error, por favor inténtelo nuevamente");
                setShowMessage(true);
            } else {
                const responseData = await response.json();
                setMessage("Tipo de inteligencia: " + responseData.user_intelligence);
                setShowMessage(true);
            }
        } catch (error) {
            console.error('Error al enviar los datos del usuario:', error);
        }
    };

    return(
        <div className="testForm">
            <h1>Prueba de Inteligencia</h1>
            <h5>Instrucciones: Selecciona una opción para cada una de las siguientes preguntas para poder determinar cuál es tu tipo de inteligencia.</h5>
            <Modal show={showMessage} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tus respuestas han sido guardadas</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <form onSubmit={handleSubmit}>
                {arrayQuestions.questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <div className="card my-card text-dark bg-light mb-3">
                                <div className="card-header">
                                    <strong>{"Pregunta " + (index + 1 ) + ": "}</strong>{question}
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"q"+index} value="5"
                                            onChange={handleOptionChange}
                                            required
                                            />
                                            <label className="form-check-label">
                                                Siempre
                                            </label>  
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"q"+index} value="4"
                                            onChange={handleOptionChange}
                                            required
                                            />
                                            <label className="form-check-label">
                                                Casi siempre
                                            </label>  
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"q"+index} value="3"
                                            onChange={handleOptionChange}
                                            required
                                            />
                                            <label className="form-check-label">
                                                Ocasionalmente
                                            </label>  
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"q"+index} value="2"
                                            onChange={handleOptionChange}
                                            required
                                            />
                                            <label className="form-check-label">
                                                Casi nunca
                                            </label>  
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"q"+index} value="1"
                                            onChange={handleOptionChange}
                                            required
                                            />
                                            <label className="form-check-label">
                                                Nunca
                                            </label>  
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="">
                    <button type="submit" className="btn btn-secondary">Enviar respuestas</button>
                </div>
            </form>
        </div>
    )
}