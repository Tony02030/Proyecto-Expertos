from ConexionBD import get_connection
from JsonManage import read_json

from pymongo import errors

db = get_connection()
collection = db.collection["Usuarios"]

def insert_user(file):
    # Obtiene el contador actual
    counter_doc = collection.find_one({}, sort=[("_id", -1)])
    counter = counter_doc['_id'] + 1 if counter_doc else 1
    
    user_info=read_json(file)
    
    user = {
        "_id":counter,
        "user":user_info["name"],
        "password":user_info["password"],
    }
    try:
        document_id = collection.insert_one(user).inserted_id
        return document_id   
    except errors:        
        return 0
    
def get_user(user_id):
    try:
        return collection.find_one({'_id': user_id})
    except errors:
        return 0

def update_user(user_id,user_updated):
    existing_user = collection.find_one({'_id':user_id})
    if user_updated:
        # Combina los datos del documento existente con los datos actualizados
        user_updated = {**existing_user, **user_updated}
        # Reemplaza el documento en la colección
        result = collection.replace_one({'_id':user_id}, user_updated)
        if result.matched_count > 0:
            return 1        
    else:
        return 0







    

