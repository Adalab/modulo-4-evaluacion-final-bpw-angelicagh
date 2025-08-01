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
| GET | `/frases/personaje/:id` | Frases por personaje |
| PUT | `/frases/:id` | Actualizar una frase |
| DELETE | `/frases/:id` | Eliminar una frase |
| GET | `/frases/personaje/:personaje_id` | Frases por personaje |
| GET | `/frases/capitulo/:capitulo_id` | Frases por capítulo |
| GET | `/personajes` | Listar todos los personajes |
| GET | `/capitulos` | Listar todos los capítulos |

---

## 📦 Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/frases` | Listar todas las frases |
| GET | `/frases/:id` | Obtener una frase específica |
| GET | `/frases/personaje/:id` | Frases por personaje |
| GET | `/frases/capitulo/:id` | Frases por capítulo |
| POST | `/frases` | Insertar nueva frase |
| PUT | `/frases/:id` | Actualizar una frase |
| DELETE | `/frases/:id` | Eliminar frase |
| GET | `/personajes` | Listar todos los personajes |
| GET | `/capitulos` | Listar todos los capítulos |
| POST | `register` | Crear nuevo usuario |
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

---

## 📎 Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Crear archivo .env con tus claves
DB_HOST=...
DB_USER=...
DB_PASS=...
JWT_SECRET=...

# Ejecutar servidor
npm run dev