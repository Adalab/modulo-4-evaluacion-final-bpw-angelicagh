//CONFIGURAR EL SERVIDOR

import express from 'express'; 
import cors from 'cors'; 
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';//encriptar contraseña
import jwt from 'jsonwebtoken';//verificar token

const port = process.env.PORT || 4000; 
const server = express(); 
server.use(express.json()); 
server.use(cors()); 
server.listen(port, () => {
    console.log(`Servidor escuchando por http://localhost:${port}`);
})

//CREAR LA CONEXION CON LA BD
const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    })
    return connection;
}

//FUNCIONES TOKEN 
//generar token (login)
const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "15m"}) //crea token con la clave secreta
    return token;
}

//verificar token (middleware)
const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];

    if(!tokenHeader) {
        res.status(400).json({error: "Token no proporcionado"})
    }

    const verificarToken = jwt.verify(tokenHeader, process.env.JWT_SECRET_KEY); // verifica token con la clave secreta
    if(!verificarToken){
        res.status(400).json({error: "Token no válido"})
    }
    next(); //si todo ha ido bien, entra en server.get/frases y devuelve el listado de frases
}

//ENDPOINTS

//insertar nueva frase
server.post("/frases", async (req, res) => {
    try {
        const connection = await getConnection();

        const {texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo} = req.body;

        let queryInsert = "INSERT INTO frases (texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo) VALUES (?, ?, ?, ?, ?);"

        const [results] = await connection.query (queryInsert, [texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo]);
    
        connection.end();

        if(!texto || !fk_capitulo || !fk_personaje){
            res.status(400).json({
            success: false, mensaje: "⚠️Faltan campos obligatorios",
            })
        }
        else{
            res.status(200).json({
            success: true,
            mensaje: "✅La frase se ha insertado correctamente",
            id: results.insertId
            })
        }
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})
    
//listar todas las frases (con info del personaje y titulo del capitulo)
server.get("/frases", async (req, res) => {

    try {
        const connection = await getConnection();

        const [results] = await connection.query ("SELECT frases.id AS id_frase, frases.texto AS frase, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion, capitulos.titulo AS capitulo FROM frases INNER JOIN personajes ON frases.fk_personaje = personajes.id INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id ORDER BY personajes.nombre ASC;");
    
        connection.end();

        res.status(200).json({"results": results})    
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//obtener una frase especifica
server.get("/frases/:id", async (req, res) => {
    try {
        const connection = await getConnection();

        const id = req.params.id;

        const [results] = await connection.query ("SELECT frases.id AS id_frase, frases.texto AS frase, personajes.nombre, personajes.apellido FROM frases INNER JOIN personajes ON frases.fk_personaje = personajes.id WHERE frases.id = ?;", [id]);
    
        connection.end();

        if(isNaN(id)){
            res.status(400).json({
            success: false, 
            mensaje: "⚠️El ID no es válido. Debe ser un número",
            })
        }
        else if(results.length === 0) {
        res.status(404).json({
            success: false, 
            mensaje: "⚠️El ID no coincide con ninguna frase"})
        }
        else{
            res.status(200).json({"results": results[0]})
        }
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//actualizar una frase existente
server.put("/frases/:id", async (req, res) => {
    try {
        const connection = await getConnection();

        const id = req.params.id;

        const {texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo} = req.body;

        let queryUpdate = "UPDATE frases SET texto = ?, marca_tiempo = ?, descripcion = ?, fk_personaje = ?, fk_capitulo = ? WHERE id = ?;"

        const [results] = await connection.query (queryUpdate, [texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo, id]);
    
        connection.end();

        if(!texto || !fk_capitulo || !fk_personaje){
            res.status(400).json({
            success: false, mensaje: "⚠️Faltan campos obligatorios",
            })
        }
        else if(results.changedRows > 0){
            res.status(200).json({
            success: true,
            mensaje: "✅La frase se ha actualizado correctamente",
            cambios: results.changedRows
            })
        }
        else{
            res.status(200).json({
            success: true,
            mensaje: "💡La frase ya contenía los mismos valores. No se realizaron cambios.",
            cambios: 0
            })
        }
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//eliminar una frase
server.delete("/frases/:id", async (req, res) => {
    try {
        const connection = await getConnection();

        const id = req.params.id;

        let queryDelete = "DELETE FROM frases WHERE id = ?";

        const [results] = await connection.query (queryDelete, [id]);
    
        connection.end();

        if(results.affectedRows === 0) {
            res.status(404).json({
            success: false, 
            mensaje: "⚠️No se puede eliminar porque el ID no existe"})
        }
        else{
            res.status(200).json({
            success: true,
            mensaje: "✅La frase se ha eliminado correctamente",
            }) 
        }
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//obtener todas las frases de un personaje especifico
server.get("/frases/personaje/:personaje_id", async (req, res) => {
    try {
        const connection = await getConnection();

        const id = req.params.personaje_id;

        const [results] = await connection.query ("SELECT personajes.id AS id_personaje, personajes.nombre, personajes.apellido, frases.texto AS frase FROM frases INNER JOIN personajes ON frases.fk_personaje = personajes.id WHERE personajes.id = ?;", [id]);
    
        connection.end();

        //para que el nombre del personaje salga una sola vez y debajo todas sus frases una debajo de otra
        const { id_personaje, nombre, apellido } = results[0];//evita que salga 2 veces la info de Lisa, coge los datos solo 1 vez
        const frases = results.map(item => item.frase);//de los resultados se queda solo con las frases

        if(isNaN(id)){
            res.status(400).json({
            success: false, 
            mensaje: "⚠️El ID no es válido. Debe ser un número",
            })
        }
        else if(results.length === 0) {
        res.status(404).json({
            success: false, 
            mensaje: "⚠️El ID no coincide con ningún personaje"})
        }
        else{
            res.status(200).json({"results": 
                {
                    id_personaje,
                    nombre,
                    apellido,
                    frases
            }
        })
        }
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//obtener todas las frases de un capitulo especifico
server.get("/frases/capitulo/:capitulo_id", async (req, res) => {
    try {
        const connection = await getConnection();

        const id = req.params.capitulo_id;

        const [results] = await connection.query ("SELECT capitulos.id AS id_capitulo, capitulos.titulo AS titulo_capitulo, frases.texto AS frase FROM frases INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id WHERE capitulos.id = ?;", [id]);
    
        connection.end();

        //para que el nombre del personaje salga una sola vez y debajo todas sus frases una debajo de otra
        const { id_capitulo, titulo_capitulo } = results[0];//evita que salga 2 veces la info de Lisa, coge los datos solo 1 vez
        const frases = results.map(item => item.frase);//de los resultados se queda solo con las frases

        if(isNaN(id)){
            res.status(400).json({
            success: false, 
            mensaje: "⚠️El ID no es válido. Debe ser un número",
            })
        }
        else if(results.length === 0) {
        res.status(404).json({
            success: false, 
            mensaje: "⚠️El ID no coincide con ningún capítulo"})
        }
        else{
            res.status(200).json({"results": 
                {
                    id_capitulo,
                    titulo_capitulo,
                    frases
            }
        })
        }
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//listar todos los personajes
server.get("/personajes", async (req, res) => {

    try {
        const connection = await getConnection();

        const [results] = await connection.query ("SELECT personajes.id AS id_personaje, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion FROM personajes ORDER BY personajes.nombre ASC;");
    
        connection.end();

        res.status(200).json({"results": results})    
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//listar todos los capitulos
server.get("/capitulos", async (req, res) => {

    try {
        const connection = await getConnection();

        const [results] = await connection.query ("SELECT capitulos.id AS id_capitulo, capitulos.titulo AS titulo_capitulo, capitulos.sinopsis AS sinopsis, capitulos.temporada, capitulos.numero_episodio,  capitulos.fecha_emision FROM capitulos ORDER BY capitulos.temporada ASC, capitulos.numero_episodio ASC;");
    
        connection.end();

        //modificar fecha de formato json a iso
        const capitulosFechaModificada = results.map(capitulo => {
            const nuevaFecha = new Date(capitulo.fecha_emision).toISOString().split('T')[0];
            return {...capitulo, fecha_emision: nuevaFecha};
        })
        
        res.status(200).json({"results": capitulosFechaModificada})    
    }
    catch(error) {
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//AUTENTICACION
//register
server.post("/register", async (req, res) => {

    try {
        const connection = await getConnection();

        const {nombre, email, password} = req.body;

        if(!email || !nombre || !password){
            return res.status(400).json({
            success: false, mensaje: "⚠️Faltan campos obligatorios",
            })
        }

        const passwordHash = await bcrypt.hash(password, 10);//encriptar contraseña

        let queryRegister = "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?);"

        const [results] = await connection.query(queryRegister, [nombre, email, passwordHash]);

        connection.end();

        res.status(200).json({
            success: true,
            mensaje: "✅El usuario se ha registrado correctamente",
            id: results.insertId
        })
    }       
    catch(error) {
        console.error("🛑 Error en el servidor:", error);
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//login 
server.post("/login", async (req, res) => {

    try {
        const connection = await getConnection();

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
            success: false, mensaje: "⚠️Faltan campos obligatorios",
            })
        }

        let queryLogin = "SELECT * FROM users WHERE email = ?;"//verificar que usuario existe

        const [results] = await connection.query(queryLogin, [email]);//devuelve toda la info del usuario al que pertenece ese email

        connection.end();

        //verificar si la contraseña coincide con el email en la BD
        const emailBD = results[0];

        if(!emailBD){
            return res.status(404).json({error: "⚠️El email no existe"});
        }

        const passwordCorrect = await bcrypt.compare(password, emailBD.password);//compara la contraseña que ha introducido el usuario al hacer login con la contraseña que existe en la BD

        if(!passwordCorrect) {
            return res.status(401).json({error: "⚠️Password incorrecto"})
        }

        //crear token
        const userToken = { //estos son los datos que le voy a pasra a la funcion para generar el token
            username: emailBD.email, //accedo a la propiedad email de la BD
            id: emailBD.id //accedo a la propiedad id de la BD
        }

        const token = generateToken(userToken);     

        res.status(200).json({token, email: emailBD.email})
    }       
    catch(error) { 
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})

//AUTORIZACION
//una vez loggeado (middleware)
server.get("/login", authenticateToken, async (req, res) => {

    try {
        const connection = await getConnection();

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
            success: false, mensaje: "⚠️Faltan campos obligatorios",
            })
        }

        let queryLogin = "SELECT * FROM users WHERE email = ?;"//verificar que usuario existe

        const [results] = await connection.query(queryLogin, [email]);

        connection.end();

        //verificar si la contraseña coincide con el email en la BD
        const emailBD = results[0];

        const passwordCorrect = emailBD === null ? false : await

        bcrypt.compare(password, emailBD.password);

        if(!passwordCorrect) {
            return res.status(401).json({error: "⚠️Email y/o password incorrectos"})
        }

        //crear token
        const userToken = {
            username: emailBD.email,
            id: emailBD.id
        }

        const token = generateToken(userToken);     

        res.status(200).json({token, email: emailBD.email})
    }       
    catch(error) { 
        res.status(500).json({error: "❌ Error interno del servidor"})
    }
})




//SERVIDOR DE ESTATICOS
const staticServerPath = "./src/web"; //ruta donde esta mi proyecto
server.use(express.static(staticServerPath));



