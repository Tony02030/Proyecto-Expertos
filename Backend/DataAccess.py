from ConexionBD import get_connection
import json
from Euclides import Euclides

from pymongo import errors

db = get_connection()
collection = db['Usuarios']

#Guarda un usuario 
def insert_user(user_info):

    result = collection.find_one({'user': str(user_info['user'])})

    #Verifica si el usuario ya existe en la BD
    if result is None:
        #Obtiene el contador actual del _id en la BD
        counter_doc = collection.find_one({}, sort=[('_id', -1)])
        counter = counter_doc['_id'] + 1 if counter_doc else 1
    
        #Crea la estructura del documento que almacena la información del usuario
        user = {
        '_id':counter,
        'user':user_info['user'],
        'password':user_info['password'],
        }

        try:
            #Retorna 1 indicando que el usuario fue creado
            collection.insert_one(user)
            return 1
        except errors:
            #Retorna 0 si hubo un error        
            return 0
    else:
        #Retorna 0 si ya existe en la BD
        return 0

    
#Obtiene un usuario por su id
def get_user_by_id(user_id):
    try:
        #Retorna el usuario a buscar
        return collection.find_one({'_id': int(user_id)})
    except errors:
        #Retorna 0 si hubo un error
        return 0

#Obtiene un usuario por su nombre y su contraseña
def get_user_by_name_password(user):
    try:
        #Retorna el usuario a buscar
        return collection.find_one({'user': user["user"], 'password': user["password"]})
    except errors:
        # Retorna 0 si hubo un error
        return 0


#Actualiza el usuario agregando sus respuestas y su inteligencia
def update_user(user_id ,user_intelligence, euclides:Euclides):
    #Convierte el user_id en int
    user_id=int(user_id)

    #Busca al usuario actual por su id
    existing_user = collection.find_one({'_id':user_id})
   
    # Combina las respuestas del usuario con la inteligencia asignada
    user_updated = {**euclides.get_user_intelligences_distance(), **user_intelligence}
        
    # Combina los datos del documento existente con los datos actualizados
    user_updated = {**existing_user, **user_updated}
        
    # Reemplaza el documento en la colección
    result = collection.replace_one({'_id':user_id}, user_updated)

    # Retorna 1 si el usuario fue actualizado
    if result.matched_count > 0:
        return 1        
    else:
    # Retorna 0 si hubo un error
        return 0


# Obtiene una lista de todos los usuarios utilizando como ordenamiento la similitud que tienen con el usuario buscado
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
                                    {'distances': {'$exists': True}},
                                    {'_id': {'$ne': user_id}}
                                    ]})

        #Genera un array de usuarios que contiene su nombre, su inteligencia y la distancia que tiene con el usuario a buscar
        json_users_array=[]
        for dist_users in distinct_users:
            result = euclides.get_min_distance(actual_user['distances'],actual_user['user_intelligence'],dist_users['distances'])
            json_users_array.append({'user':dist_users['user'],'intelligence':dist_users["user_intelligence"],'distance': result["distance"]})

        #Ordena la lista de manera ascendente utilizando la distancia
        json_users_array = sorted(json_users_array, key=lambda x: x['distance'], reverse=False)

        #Retorna la lista en formato json
        return json.loads(json.dumps(json_users_array))

    except Exception as e:
        # Retorna 0 si hubo un error
        return []