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

        const [results] = await connection.query ("SELECT frases.id, frases.texto AS frase, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion, capitulos.titulo AS capitulo FROM frases INNER JOIN personajes ON frases.fk_personaje = personajes.id INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id ORDER BY personajes.nombre ASC;");
    
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

        const [results] = await connection.query ("SELECT frases.texto AS frase, personajes.nombre, personajes.apellido FROM frases INNER JOIN personajes ON frases.fk_personaje = personajes.id WHERE frases.id = ?;", [id]);
    
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




