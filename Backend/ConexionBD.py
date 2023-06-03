from pymongo import MongoClient

def get_connection():
    # Crea una instancia del cliente de MongoDB
    client = MongoClient('localhost', 27017)
    
    # Retorna la conexión a la base de datos
    return client['mydatabase']