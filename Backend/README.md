# Valores que esperan cada endpoint de la API


## get_similar_users(id)

- Espera el **id** del usuario
- URL: /api/users/similar/"id"
- Petición: GET
- Devuelve el siguiente json:

```
[
    {
        "distance": 11.874342087037917,
        "intelligence": "Intrapersonal",
        "user": "Alberto"
    },
    {
        "distance": 12.206555615733702,
        "intelligence": "Lógico-matemático",
        "user": "Karla"
    },
    ...
]
```

## get_user_by_id(id)

- Espera el **id** del usuario
- URL: /api/users/id/"id"
- Petición: GET
- Devuelve el siguiente json:

```
{
    "_id": 1,
    "answers": [...],
    "password": "1234test",
    "user": "Anthony",
    "user_intelligence": "Naturalista"
}
```

## get_user_by_name_password()

- URL: /api/users/
- Petición: GET
- Espera el siguiente json:

```
{
    "user":<nombre_usuario>,
    "password":<contraseña>
}
```

- Devuelve el siguiente json:

```
{
    "_id": 1,
    "answers": [...],
    "password": "1234test",
    "user": "Anthony",
    "user_intelligence": "Naturalista"
}
```


## save_user():
- URL: /api/users/
- Petición: POST
- Espera el siguiente json:

```
{
    "user": <nombre_usuario>,
    "password": <contraseña>
}
```

Devuelve el siguiente json:

```
{
    "message": 'Usuario creado',
    "id": 6 
}
```


## update_user(id):

- Espera el **id** del usuario
- URL: /api/users/"id"
- Petición: PUT
- Espera el siguiente json:

```
{
    "answers": [1,2,4,5,2,...]
}
```

- Devuelve el siguiente json:

```
{
    "user_intelligence": Espacial
}
```

- **IMPORTANTE** : El array debe tener 36 dimensiones, ni más ni menos.
