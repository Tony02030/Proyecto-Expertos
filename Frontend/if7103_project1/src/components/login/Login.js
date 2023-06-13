import "./Login.css"
import { useState } from "react"

export function Login({ setUser, setIdUser }){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userName === "" || password === "") {
            setMessageError("Todos los campos son requeridos")
            setError(true)
            return
        } else{
            setError(false)
            postUserByNamePassword(userName, password);
        }
    }

    const postUserByNamePassword = async (username, password1) => {
        try {
            const url = 'http://localhost:5000/api/users/login';
            const data = { user: username, password: password1 };
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                setMessageError("Los datos son incorrectos, ingrésalos nuevamente")
                setError(true)
            } else {
                const responseData = await response.json();
                setIdUser([responseData._id])
                setUser([responseData.user])
            }
        } catch (error) {
            console.error('Error al enviar los datos del usuario:', error);
        }
    };

    return(
        <div className="loginForm">
            <section>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">Iniciar Sesión</h5>
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
                            {error && <div className="alert alert-danger">
                                {messageError}
                                </div>
                            }
                            <div className="d-grid mb-4">
                                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>¿No tienes una cuenta? <a href="/signup">Registrarse</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}