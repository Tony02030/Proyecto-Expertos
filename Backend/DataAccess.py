from ConexionBD import get_connection
import json
from Euclides import Euclides

from pymongo import errors

db = get_connection()
collection = db['Usuarios']

#Guarda un usuario 
def insert_user(user_info):
    # Obtiene el contador actual
    counter_doc = collection.find_one({}, sort=[('_id', -1)])
    counter = counter_doc['_id'] + 1 if counter_doc else 1
    
    user = {
        '_id':counter,
        'user':user_info['user'],
        'password':user_info['password'],
    }
    try:
        document_id = collection.insert_one(user).inserted_id
        return document_id   
    except errors:        
        return 0
    
#Obtiene un usuario por su id
def get_user(user_id):
    try:
        return collection.find_one({'_id': int(user_id)})
    except errors:
        return 0

#Actualiza el usuario agregando sus respuestas y su inteligencia
def update_user(user_id,user_updated,user_intelligence):
    user_id=int(user_id)
    existing_user = collection.find_one({'_id':user_id})
    if user_updated:
        # Combina las respuestas del usuario con la inteligencia asignada
        user_updated = {**user_updated, **user_intelligence}
        # Combina los datos del documento existente con los datos actualizados
        user_updated = {**existing_user, **user_updated}
        # Reemplaza el documento en la colección
        result = collection.replace_one({'_id':user_id}, user_updated)
        if result.matched_count > 0:
            return 1        
    else:
        return 0


# Obtiene una lista de todos los usuarios utilizando como ordenamiento la similitud que tienen con el usuario pasado por parametro
def get_similar_users(user_id):
    #Convierte el user_id en int
    user_id=int(user_id)

    #Inicializa una instancia de la clase Euclides
    euclides=Euclides()
    
    try:
        #Busca al usuario actual por su id
        actual_user = collection.find_one({'_id':user_id})

        #Busca a los usuarios diferentes al actual que contengan el atributo "answers"
        distinct_users = collection.find({
                                    '$and': [
                                    {'answers': {'$exists': True}},
                                    {'_id': {'$ne': user_id}}
                                    ]
                                        })
       
       #Genera un array de usuarios que contiene su nombre, su inteligencia y la distancia que tiene con el usuario a buscar
        json_users_array=[]
        for dist_users in distinct_users:
            json_users_array.append({'user':dist_users['user'],'intelligence':dist_users['user_intelligence'],'distance':euclides.calculate_euclidian_distance_users(actual_user['answers'],dist_users['answers'])})

        #Ordena la lista de manera ascendente utilizando la distancia
        json_users_array = sorted(json_users_array, key=lambda x: x['distance'], reverse=False)

        #Retorna la lista en formato json
        return json.loads(json.dumps(json_users_array))

    except error:
        return 0







    

