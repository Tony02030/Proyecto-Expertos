/*DATOS PARA MANTENER LA SESIÓN DEL USUARIO*/
// Cuando el usuario inicia sesión y obtienes el ID del usuario
const userId = "";
// Almacenar el ID del usuario en el almacenamiento local
localStorage.setItem('userId', userId);

// Para acceder al ID del usuario almacenado en cualquier parte del código
const userIdAlmacenado = localStorage.getItem('userId');

/*MÉTODO PARA OBTENER UN USUARIO ESPECÍFICO DEL SISTEMA*/
// Haciendo una solicitud GET al endpoint /api/users/<id>
function getUser(id) {
    fetch(`/api/users/${id}`, {
        method: 'GET',
    })
        .then(response => {
            if (response.status === 404) {
                throw new Error('Usuario no encontrado');
            }
            return response.json();
        })
        .then(document => {
            console.log(document); // Realiza las acciones necesarias con el documento obtenido
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*MÉTODO PARA OBTENER LOS USUARIOS DEL SISTEMA*/
function getUsers() {
    fetch('/api/users', {
        method: 'GET'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error al obtener los usuarios');
            }
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*FUNCIÓN PARA INICIO DE SESIÓN DEL USUARIO*/
function login() {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    getUsers()
        .then(users => {
            const user = users.find(user => user.username === username);

            if (user) {
                if (user.password === password) {
                    // Inicio de sesión exitoso
                    userId = user.id;
                    // Realiza las acciones necesarias para redireccionar al usuario a la página de usuario
                    window.location.href = 'userPage.html';
                } else {
                    // Contraseña incorrecta
                    alert('Contraseña incorrecta');
                }
            } else {
                // Usuario no encontrado
                alert('Usuario no encontrado');
            }
        })
        .catch(error => {
            // Error al obtener la lista de usuarios
            console.error(error.message);
        });
}

/*MÉTODO PARA AGREGAR UN NUEVO USUARIO AL SISTEMA*/
// Haciendo una solicitud POST al endpoint /api/users
function saveUser(user) {
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Error al crear el usuario');
            }
        })
        .then(data => {
            console.log(data); // Realiza las acciones necesarias con la respuesta
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*REGISTRAR NUEVO USUARIO*/
function register() {
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const newUser = {
        username: username,
        password: password
    };

    saveUser(newUser);
}

/*MÉTODO PARA ACTUALIZAR UN USUARIO DEL SISTEMA*/
// Haciendo una solicitud PUT al endpoint /api/users/<id>
function updateUser(userIdAlmacenado, updatedUser) {
    fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error('Usuario no encontrado');
            } else {
                throw new Error('Error al actualizar el usuario');
            }
        })
        .then(userIntelligence => {
            console.log(userIntelligence); // Realiza las acciones necesarias con la inteligencia del usuario
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*MÉTODO PARA ELIMINAR UN USUARIO DEL SISTEMA*/
// Haciendo una solicitud DELETE al endpoint /api/documentos/<id>
function deleteDocumento(id) {
    fetch(`/api/documentos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error('Documento no encontrado');
            } else {
                throw new Error('Error al eliminar el documento');
            }
        })
        .then(data => {
            console.log(data); // Realiza las acciones necesarias con la respuesta
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*FUNCIÓN PARA GUARDAR LAS RESPUESTAS*/
function answers() {
    // Obtener el formulario por su ID
    const form = document.getElementById('questionnaireForm');

    // Agregar un evento de escucha al evento "submit" del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const answersA = [];

        // Obtener todas las preguntas del formulario
        const questions = document.querySelectorAll('.question');

        // Recorrer todas las preguntas y obtener la respuesta seleccionada
        questions.forEach(function (question) {
            const selectedOption = question.querySelector('input[name]:checked');
            const answer = selectedOption ? selectedOption.value : null;
            answersA.push(answer);
        });

        const updatedUserData = {
            answers: answersA
        };

        updateUser(userIdAlmacenado, updatedUserData);
    });

}

/*OBTENER EL ID DEL USUARIO DE ACUERDO AL USERNAME*/
// Función para obtener el ID del usuario
function getUserIdByUsername(username) {
    getUsers()
        .then(users => {
            const user = users.find(user => user.username === username);
            if (user) {
                const userId = user.id;
                console.log('ID del usuario:', userId);
                // Aquí puedes realizar las acciones necesarias con el ID del usuario
            } else {
                console.log('Usuario no encontrado');
            }
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*FUNCIÓN PARA OBTENER LOS USUARIOS SIMILARES*/
function getSimilarUsers(id) {
    fetch(`/api/users/similar/${id}`, {
        method: 'GET'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error('Usuarios similares no encontrados');
            } else {
                throw new Error('Error al obtener usuarios similares');
            }
        })
        .then(users => {
            console.log(users); // Realiza las acciones necesarias con la lista de usuarios similares
        })
        .catch(error => {
            console.error(error); // Maneja el error apropiadamente
        });
}

/*CERRAR SESIÓN*/
function logout() {
    // Para eliminar el ID del usuario del almacenamiento local cuando el usuario cierra sesión
    localStorage.removeItem('userId');
}