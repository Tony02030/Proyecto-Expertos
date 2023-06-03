from flask import Flask, jsonify, request
import DataAccess as dao

app = Flask(__name__)

# Ruta para obtener todos los documentos
"""
@app.route('/api/users', methods=['GET'])
def get_users():
    documentos = list(DataAccess.get_user)
    return jsonify(documentos), 200
"""


# Ruta para obtener un usuario por ID
@app.route('/api/users/<id>', methods=['GET'])
def get_user(id):
    document = dao.get_user(id)
    if document == 0:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    else:
        return jsonify(document), 200

# Ruta para crear un nuevo documento
@app.route('/api/users', methods=['POST'])
def save_user():
    new_user = request.get_json()
    user_id = dao.insert_user(new_user)
    return jsonify({'message': 'Usuario creado', 'id': str(user_id)}), 201

# Ruta para actualizar un documento existente
@app.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
    user_updated = request.get_json()
    result = dao.update_user(id,user_updated)
    if result == 1:
        return jsonify({'message': 'Usuario actualizado'}), 200
    else:
        return jsonify({'message': 'Usuario no encontrado'}), 404

# Ruta para eliminar un documento
"""
@app.route('/api/documentos/<id>', methods=['DELETE'])
def eliminar_documento(id):
    result = collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Documento eliminado'}), 200
    else:
        return jsonify({'message': 'Documento no encontrado'}), 404

"""
if __name__ == '__main__':
    app.run(debug=True)
