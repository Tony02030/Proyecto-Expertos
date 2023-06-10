import "./Login.css"
import { useState } from "react"

export function Login({ setUser }){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(userName === "" || password === ""){
            setError(true)
            return
        }
        setError(false)
        setUser([userName])
    }

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
                                <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            {error && <div className="alert alert-danger">
                                Todos los campos son requeridos
                                </div>
                            }
                            <div className="d-grid mb-4">
                                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>¿No tienes una cuenta? <a href="registro.html">Registrarse</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}