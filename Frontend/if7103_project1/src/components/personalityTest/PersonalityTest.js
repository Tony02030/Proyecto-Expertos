import arrayQuestions from "./questions.json"

export function PersonalityTest({ setUser }){
    const handleSubmit = (e) => {
        e.preventDefault ()

        console.log(arrayQuestions)
    }

    return(
        <div className="testForm">
            <h2>Prueba de Inteligencia</h2>
            <h3>Instrucciones</h3>
            <form onSubmit={handleSubmit}>
                {arrayQuestions.questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <label>{"Pregunta " + (index + 1 ) + ": " + question}</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={"q"+index} value="5"/>
                                <label className="form-check-label">
                                    Siempre
                                </label>  
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={"q"+index} value="4"/>
                                <label className="form-check-label">
                                    Casi siempre
                                </label>  
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={"q"+index} value="3"/>
                                <label className="form-check-label">
                                    Ocasionalmente
                                </label>  
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={"q"+index} value="2"/>
                                <label className="form-check-label">
                                    Casi nunca
                                </label>  
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={"q"+index} value="1"/>
                                <label className="form-check-label">
                                    Nunca
                                </label>  
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