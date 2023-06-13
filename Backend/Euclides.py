import math, json
import numpy as np

class Euclides:

    def __init__(self):
        self.distances=[]
    
    def set_distances(self,distances):
        self.distances=distances
    
    def get_distances(self):
        return self.distances
    
    def get_types_intelligences(self):
        return [
        "Espacial", "Musical", "Lingüístico-verbal", "Lógico-matemático",
        "Corporal-cinestésico", "Intrapersonal", "Interpersonal", "Naturalista",
        "Existencial", "Creativo", "Emocional", "Colaborativo"
        ]
    
    #Obtiene la inteligencia de un usuario apartir de sus respuestas
    def get_user_intelligence(self, answers_user):
        self.calculate_euclidian_distance(answers_user)
        predominant_index = self.get_distances().index(min(self.get_distances()))
        intelligence = self.get_types_intelligences()[predominant_index]
        return {'user_intelligence':intelligence}
    
    def get_user_intelligences_distance(self):
        return  {'distances':dict(zip(self.get_types_intelligences(), self.get_distances()))}
    
    def get_answers_intelligence(self):    
    # Definir la matriz de respuestas para cada inteligencia (12x36)
        return  [[1, 5, 3, 3, 3, 1, 5, 2, 3, 1, 2, 3, 1, 1, 3, 3, 1, 3, 3, 1, 3, 3, 3, 2, 2, 3, 4, 2, 4, 2, 1, 5, 1, 2, 1, 2],  # Inteligencia Espacial
                 [1, 2, 3, 3, 5, 1, 2, 3, 2, 5, 2, 3, 2, 2, 5, 3, 2, 3, 1, 1, 3, 3, 1, 2, 3, 3, 4, 1, 4, 3, 1, 3, 1, 3, 1, 3],  # Inteligencia Musical 
                 [5, 2, 3, 3, 3, 1, 1, 5, 2, 1, 2, 3, 2, 2, 3, 3, 2, 3, 1, 1, 3, 3, 1, 2, 3, 3, 4, 1, 4, 3, 1, 3, 1, 5, 1, 3],  # Inteligencia Lingüístico-verbal
                 [2, 2, 3, 3, 3, 5, 3, 3, 5, 1, 5, 3, 2, 2, 3, 3, 2, 3, 1, 1, 3, 3, 1, 2, 3, 3, 4, 1, 4, 3, 1, 3, 1, 3, 1, 3],  # Inteligencia Lógico-matemático
                 [1, 2, 3, 3, 3, 1, 1, 3, 3, 1, 3, 3, 5, 2, 3, 3, 2, 3, 5, 1, 3, 3, 1, 5, 3, 3, 4, 1, 4, 3, 1, 3, 1, 3, 1, 3],  # Corporal-cinestésico
                 [1, 2, 1, 4, 3, 1, 1, 3, 3, 1, 3, 1, 3, 3, 3, 3, 5, 1, 1, 3, 4, 4, 2, 3, 1, 1, 3, 5, 3, 5, 3, 3, 3, 3, 3, 3],  # Inteligencia Intrapersonal
                 [1, 2, 1, 4, 3, 1, 1, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 1, 1, 5, 4, 4, 2, 3, 5, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 5],  # Inteligencia Interpersonal
                 [1, 2, 5, 3, 3, 1, 1, 3, 3, 1, 3, 3, 3, 5, 3, 1, 3, 3, 1, 3, 3, 3, 5, 3, 1, 3, 1, 1, 1, 3, 4, 3, 4, 3, 4, 3],  # Inteligencia Naturalista
                 [3, 2, 1, 3, 3, 2, 1, 3, 3, 1, 3, 3, 3, 3, 3, 5, 3, 3, 1, 3, 2, 3, 3, 3, 1, 5, 1, 1, 1, 3, 4, 3, 5, 3, 4, 3],  # Inteligencia Existencial 
                 [1, 2, 1, 3, 3, 2, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 5, 1, 3, 3, 5, 3, 3, 1, 3, 4, 1, 5, 3, 1, 3, 3, 3, 1, 3],  # Inteligencia Creativo
                 [1, 2, 1, 5, 3, 1, 1, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 5, 1, 3, 3, 5, 3, 3, 3, 1, 3],  # Inteligencia Emocional 
                 [1, 2, 1, 3, 3, 1, 1, 3, 3, 1, 3, 5, 3, 3, 3, 1, 3, 3, 1, 3, 5, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 3, 5, 3]]  # Inteligencia Colaborativo
 
    
    # Calcula la distancia euclidiana entre las respuestas del usuario y cada perfil de inteligencia
    def calculate_euclidian_distance(self, answers_user):
        distances=[]
        for answers in self.get_answers_intelligence():
            distance = math.sqrt(sum([(r - p) ** 2 for r, p in zip(answers_user, answers)]))
            distances.append(distance)
        self.set_distances(distances)
        
    # Calcula la distancia euclidiana entre las respuestas de dos usuarios
    def calculate_euclidian_distance_users(self,answers_actual_user, answers_distinct):
            return math.sqrt(sum([(r - p) ** 2 for r, p in zip(answers_actual_user, answers_distinct)]))
    
    # Calcula la distancia euclidiana entre las respuestas de dos usuarios
    def calculate_euclidian_distance_users(self,answers_actual_user, answers_distinct):
            return math.sqrt(sum([(r - p) ** 2 for r, p in zip(answers_actual_user, answers_distinct)]))
    
    def get_min_distance(self, distances_user,user_intelligence, distances_distinct_user):
        user = list(distances_user.values())
        dist_user = list(distances_distinct_user.values())
        result = [abs((x - y)) for x, y in zip(user, dist_user)]
        for i, key in enumerate(distances_distinct_user):
            distances_distinct_user[key] = result[i]
        return {'distance': distances_distinct_user[user_intelligence]}


              










