import math

class Euclides:

    def __init__(self):
        self.distances=[]
    
    def set_distances(self,distances):
        self.distances=distances
    
    def get_distances(self):
        self.distances
    
    def get_types_intelligences(self):
        self.tipos_inteligencia = [
        "Espacial", "Musical", "Lingüístico-verbal", "Lógico-matemático",
        "Corporal-cinestésico", "Intrapersonal", "Interpersonal", "Naturalista",
        "Existencial", "Creativo", "Emocional", "Colaborativo"
        ]
    
    def get_user_intelligence(self):
        predominant_index = self.get_distances().index(min(self.get_distances()))
        intelligence = self.get_types_intelligences()[predominant_index]
        return intelligence
    
    def get_answers_intelligence(self):    
    # Definir la matriz de respuestas para cada inteligencia (12x36)
        self.answers_intelligence = [
        [5, 5, 5, 1, 3, 3, 1, 2, 2, 1, 2, 3, 3, 1, 2, 2, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Spatial Intelligence
    
        [1, 2, 3, 5, 5, 5, 1, 3, 3, 1, 2, 2, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Musical Intelligence
    
        [1, 2, 3, 1, 3, 3, 5, 5, 5, 1, 2, 2, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Linguistic-Verbal Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 2, 2, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Logical-Mathematical Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 2, 3, 3, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Bodily-Kinesthetic Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 3, 3, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Intrapersonal Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 2, 3, 3, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Interpersonal Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 3, 4, 3, 1, 3, 4, 3, 1, 3, 4],  # Naturalistic Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 3, 1, 3, 4, 3, 1, 3, 4],  # Existential Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 1, 3, 4, 3, 1, 3],  # Creative Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5, 3, 1, 3],  # Emotional Intelligence
    
        [1, 2, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 5, 5, 5],  # Collaborative Intelligence
        ]
 
    def calculate_euclidian_distance(self, answers_user):
        # Calcular la distancia euclidiana entre las respuestas del usuario y cada perfil de inteligencia
        distances=[]
        for answers in self.get_answers_intelligence():
            distance = math.sqrt(sum([(r - p) ** 2 for r, p in zip(answers_user, answers)]))
            distances.append(distance)
        self.set_distances(distances)
        










