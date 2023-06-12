from flask import Flask, jsonify, request
from flask_cors import CORS
import DataAccess as dao
from Euclides import Euclides
import json

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Ruta para obtener los usuarios más parecidos al pasado por parámetro
@app.route('/api/users/similar/<id>', methods=['GET'])
def get_similar_users(id):
    #Obtiene una lista de todos los usuarios utilizando como ordenamiento la similitud que tienen con el usuario buscado
    documents = list(dao.get_similar_users(id))

    #Verifica el resultado 
    if documents:
        #Retorna la lista de usuarios
        return jsonify(documents), 200
    else:
        #Retorna un mensaje de error
        return jsonify({'message':'error'}), 404

# Ruta para obtener un usuario por ID
@app.route('/api/users/id/<id>', methods=['GET'])
def get_user_by_id(id):
    #Obtiene el usuario a buscar
    document = dao.get_user_by_id(id)

    #Verifica que retorna al usuario
    if document:
        #Retorna la información completa del usuario buscado 
        return jsonify(document), 200
    else:
        #Retorna un mensaje de error 
        return jsonify({'message': 'Usuario no encontrado'}), 404
    
# Ruta para obtener un usuario por nombre y contraseña
@app.route('/api/users/login', methods=['POST'])
def get_user_by_name_password():
    #Obtiene el body de la petición GET
    json_user = request.get_json()
    #Obtiene el usuario a buscar
    document = dao.get_user_by_name_password(json_user)

    #Verifica que retorna al usuario
    if document:
        #Retorna la información completa del usuario buscado 
        return jsonify(document), 200
    else:
        #Retorna un mensaje de error 
        return jsonify({'message': 'Usuario no encontrado'}), 404

# Ruta para crear un nuevo usuario
@app.route('/api/users/', methods=['POST'])
def save_user():
    #Obtiene la información de usuario apartir del body de la petición POST
    new_user = request.get_json()

    #Inserta el usuario 
    result = dao.insert_user(new_user)

    if result == 1:
        return jsonify({'message': 'Usuario creado'}), 200
    else:
        return jsonify({'message': 'El usuario ya existe'}), 409

# Ruta para obtener la inteligencia de un usuario
@app.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
    #Inicializa una instancia de la clase Euclides
    euclides = Euclides()

    #Obtiene el body de la petición PUT
    json_user_updated = request.get_json()

    #Obtiene la inteligencia del usuario apartir de sus respuestas
    json_user_inteligence = json.loads(euclides.get_user_intelligence(json_user_updated["answers"]))

    #Actualiza la información del usuario en la BD
    result = dao.update_user(id,json_user_updated, json_user_inteligence)

    #Verifica el resultado de la actualización
    if result == 1:
        #Retorna la inteligencia del usuario
        return json_user_inteligence, 200
    else:
        #Retorna un mensaje de error
        return jsonify({'message': 'Error'}), 404

if __name__ == '__main__':
    app.run(debug=True)
