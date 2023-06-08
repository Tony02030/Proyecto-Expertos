from pymongo import MongoClient

def get_connection():
    # Crea una instancia del cliente de MongoDBAtlas
    client = MongoClient('mongodb+srv://anthonyrodriguezsoto:1234@clusterproject.zizep2c.mongodb.net/?retryWrites=true&w=majority')
    
    # Retorna la conexión a la base de datos
    return client['Proyecto_Expertos']
