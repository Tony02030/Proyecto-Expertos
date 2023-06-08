import math, json

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
    
    def get_user_intelligence(self, answers_user):
        self.calculate_euclidian_distance(answers_user)
        predominant_index = self.get_distances().index(min(self.get_distances()))
        intelligence = self.get_types_intelligences()[predominant_index]
        return json.dumps({'user_intelligence':intelligence})
    
    def get_answers_intelligence(self):    
    # Definir la matriz de respuestas para cada inteligencia (12x36)
        return [
        [5, 5, 5, 1, 3, 3, 1, 2, 2, 1, 2, 3, 3, 1, 2, 2, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Espacial
    
        [1, 2, 3, 5, 5, 5, 1, 3, 3, 1, 2, 2, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Musical 
    
        [1, 2, 3, 1, 3, 3, 5, 5, 5, 1, 2, 2, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Lingüístico-verbal 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Lógico-matemático 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Corporal-cinestésico 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Intrapersonal 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Interpersonal 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Naturalista 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 3, 1, 3, 4, 3, 1, 3, 4],  # Inteligencia Existencial 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 3, 4, 3, 1, 3],  # Inteligencia Creativo 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 3, 1, 3],  # Inteligencia Emocional 
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5],  # Inteligencia Colaborativo 
        ]
    
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
        










