import "./SignUp.css"
import { useState } from "react"

export function SignUp({ setUser, setIdUser }){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("Todos los campos son requeridos")
    const [messageClass, setMessageClass] = useState("alert alert-danger");

    const handleSubmit = (e) => {
        e.preventDefault()
        if(userName === "" || password === "" || password1 === ""){
            setMessage("Todos los campos son requeridos")
            setMessageClass("alert alert-danger");
            setShowMessage(true)
            return
        } else if(password !== password1){
            setMessage("Las contraseñas deben ser iguales")
            setMessageClass("alert alert-danger");
            setShowMessage(true)
            return
        } else {
            setShowMessage(false)
            postSaveUser(userName , password)
        }
    }

    const postSaveUser = async (username, password) => {
        try {
            const url = 'http://localhost:5000/api/users/';
            const data = { user: username, password: password };
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                setMessageClass("alert alert-danger");
                setMessage("Ha ocurrido un error, por favor inténtelo nuevamente");
                setShowMessage(true);
            } else {
                const responseData = await response.json();
                setMessageClass("alert alert-success");
                setMessage(responseData.message);
                setShowMessage(true);
            }
        } catch (error) {
            console.error('Error al enviar los datos del usuario:', error);
        }
    };
    
    return(
        <div className="signup-form">
            <section>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">Formulario de registro</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <input type="text" className="form-control" id="userName" placeholder="Ingresa tu nombre usuario" 
                                value={userName}
                                onChange={event => setUserName(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" autoComplete="on"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <input type="password" className="form-control" id="password1" placeholder="Ingresa nuevamente tu contraseña" autoComplete="on"
                                value={password1}
                                onChange={event => setPassword1(event.target.value)}
                                />
                            </div>
                            {showMessage && (
                            <div className={messageClass} id="myMessage">
                                {message}
                            </div>
                            )}
                            <div className="d-grid mb-4">
                                <button type="submit" className="btn btn-primary">Registrarse</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>¿Ya tienes una cuenta? <a href="/">Iniciar sesión</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}