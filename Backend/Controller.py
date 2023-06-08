from flask import Flask, jsonify, request
import DataAccess as dao
from Euclides import Euclides
import json

app = Flask(__name__)

# Ruta para obtener los usuarios más parecidos al pasado por parámetro
@app.route('/api/users/similar/<id>', methods=['GET'])
def get_similar_users(id):
    documents = list(dao.get_similar_users(id))
    if documents:
        return jsonify(documents), 200
    else:
        return jsonify({'message':'error'}), 404

# Ruta para obtener un usuario por ID
@app.route('/api/users/id/<id>', methods=['GET'])
def get_user_by_id(id):
    document = dao.get_user(id)
    if document:
        return jsonify(document), 200
    else:
        return jsonify({'message': 'Usuario no encontrado'}), 404

# Ruta para crear un nuevo usuario
@app.route('/api/users', methods=['POST'])
def save_user():
    new_user = request.get_json()
    user_id = dao.insert_user(new_user)
    return jsonify({'message': 'Usuario creado', 'id': str(user_id)}), 201

# Ruta para obtener la inteligencia de un usuario
@app.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
    euclides = Euclides()
    json_user_updated = request.get_json()
    json_user_inteligence = json.loads(euclides.get_user_intelligence(json_user_updated["answers"]))
    result = dao.update_user(id,json_user_updated, json_user_inteligence)
    if result == 1:
        return json_user_inteligence, 200
    else:
        return jsonify({'message': 'Usuario no encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)
