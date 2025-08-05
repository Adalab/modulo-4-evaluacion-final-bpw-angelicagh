# 🟨 API de Frases de Los Simpsons 🍩

Bienvenida/o al proyecto **Simpsons Quotes API**, una aplicación backend que permite consultar, insertar y gestionar frases icónicas de los personajes de Los Simpsons. Está construida con Node.js y Express, conectada a una base de datos relacional en MySQL, y desplegada en Render.

---

## 🛠 Tecnologías utilizadas

- **Entorno de ejecución:** Node.js
- **Framework backend:** Express
- **Conexión a base de datos:** mysql2 (cliente MySQL para Node.js)
- **Base de Datos:** MySQL (modelada en MySQL Workbench)
- **Seguridad:** bcrypt, JSON Web Tokens (JWT)
- **Servidor:** Render
- **Gestión de base de datos en la nube:** Aiven
- **Herramientas adicionales:** dotenv, cors, Postman

---

## 📚 Base de datos

Tablas creadas:
- `personajes`
- `capitulos`
- `frases`
- `users`

Relaciones establecidas entre frases, personajes y capítulos.

Dentro de VS Code, en la carpeta sql encontrarás:

- simpsons_db.sql: esquema de la base de datos

- CRUD.sql: consultas SQL para los distintos endpoints

- diagrama.png: diagrama entidad-relación (DER)

---

## 📁 Estructura del proyecto

- `/src/index.js` — Código del servidor Express
- `.env` — Variables de entorno para ocultar información sensible

---

## 📦 Endpoints 

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/frases` | Insertar nueva frase |
| GET | `/frases` | Listar todas las frases |
| GET | `/frases/:id` | Obtener una frase específica |
| PUT | `/frases/:id` | Actualizar una frase |
| DELETE | `/frases/:id` | Eliminar una frase |
| GET | `/frases/personaje/:personaje_id` | Frases por personaje |
| GET | `/frases/capitulo/:capitulo_id` | Frases por capítulo |
| GET | `/personajes` | Listar todos los personajes |
| GET | `/capitulos` | Listar todos los capítulos |
| POST | `/register` | Crear nuevo usuario |
| POST | `/login` | Iniciar sesión |

---

## 🔐 Autenticación y autorización

- Las contraseñas se encriptan con `bcrypt`.
- Se usan `JSON Web Tokens` para generar y verificar datos de acceso.

---

## 🧪 Pruebas

Todos los endpoints han sido testeados en **Postman** para garantizar su correcto funcionamiento.

---

## 🚀 Despliegue

- Backend alojado en **Render**
- Base de datos gestionada con **Aiven**

---

## 🖥️ Frontend: en proceso 🚧

Pequeña interfaz que permite:
- Visualizar frases
- Next step: visualizar personajes, capítulos, filtrar...

---

## 📎 Cómo ejecutar

🔧 Backend

```bash

# Abrir Visual Studio Code

# Clonar repo
git clone (https://github.com/Adalab/modulo-4-evaluacion-final-bpw-angelicagh)

# Instalar dependencias
npm install

# Crear archivo .env con tus claves
DB_HOST=...
DB_USER=...
DB_PASS=...
JWT_SECRET=...

# Ejecutar servidor
npm run dev

```
🧪 Probar endpoints (en local): tipo GET en navegador o Postman y resto (POST, PUT, DELETE) solo en Postman

```bash

`http://localhost:4000/frases`
`http://localhost:4000//frases/:id`
`http://localhost:4000/frases/personaje/:personaje_id`
`http://localhost:4000//frases/capitulo/:capitulo_id`
`http://localhost:4000/personajes`
`http://localhost:4000/capitulos`

```

🎨 Frontend

```bash

# Abrir una nueva terminal

# Ubícate en la carpeta de la aplicación frontend
   cd src/web
    
# Instalar dependencias
   npm install

# Ejecutar la aplicación 
   npm run dev

```

## 🌐 Visualizar API en Render

La API está desplegada en Render y puedes acceder a ella aquí y probar los distintos endpoints mencionados previamente: 
🔗 [API de Frases en Render](https://modulo-4-evaluacion-final-bpw-angelicagh.onrender.com/frases)

---

## 🤝 Cómo consumir la API

Esta API permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre frases de Los Simpsons. Aquí te explicamos cómo interactuar con ella correctamente:

1️⃣ Acceder a la API

Puedes consumirla desde:

- El navegador (solo para endpoints públicos tipo GET)

- Herramientas como Postman o Insomnia

- El frontend en desarrollo

🔗 Accede aquí a la API desplegada en Render


2️⃣ Peticiones tipo GET — Obtener datos

🛠️ Puedes usar el navegador o Postman para consultar frases, personajes, capítulos...

📌 Importante: si estás buscando por ID, asegúrate de usar un ID válido o existente. De lo contrario, recibirás un mensaje de error indicando que el recurso no existe.


3️⃣ Peticiones tipo POST — Insertar datos

🛠️ Se realizan exclusivamente desde Postman.

📌 Importante: incluye en el cuerpo (body) de la petición todos los campos requeridos. Si omites alguno, la API responderá con un mensaje de error explicativo.


4️⃣ Peticiones tipo PUT — Actualizar datos

🛠️ Se realizan exclusivamente desde Postman.

📌 Importante: Debes incluir todos los campos del objeto en el body, incluso si solo deseas modificar uno. Si falta alguno, la validación fallará y se mostrará el error correspondiente.


5️⃣ Peticiones tipo DELETE — Eliminar datos

🛠️ Se realizan exclusivamente desde Postman.

📌 Importante: Asegúrate de enviar un ID válido o existente. Si el recurso no existe, la API lo indicará con un mensaje de error.


🛡️ Validaciones y mensajes de error

La API cuenta con múltiples validaciones que garantizan:

- Claridad en errores: mensajes específicos sobre qué campo falló o qué recurso no existe.

- Mejora la experiencia de usuario: sabrás si la operación fue exitosa o por qué no se pudo completar.









