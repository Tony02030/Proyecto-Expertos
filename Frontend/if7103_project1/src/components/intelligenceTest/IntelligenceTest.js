import "./IntelligenceTest.css"
import arrayQuestions from "./questions.json"
import { useState } from "react"

export function IntelligenceTest({ setUser }){
    const [userAnwsers, setUserAnwsers] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault ()
        let anwsers = [];
        
        Object.keys(userAnwsers).forEach(index => {
            anwsers.push(userAnwsers[index]);
        });

        console.log(anwsers);
    }

    const handleOptionChange = (e) => {
        const pregunta = e.target.name;
        const respuesta = parseInt(e.target.value);
        setUserAnwsers({ ...userAnwsers, [pregunta]: respuesta });
    };

    return(
        <div className="testForm">
            <h1>Prueba de Inteligencia</h1>
            <h5>Instrucciones: Selecciona una opción para cada una de las siguientes preguntas para poder determinar cuál es tu tipo de inteligencia.</h5>
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
                    <button type="submit" className="btn btn-primary">Enviar respuestas</button>
                </div>
            </form>
        </div>
    )
}