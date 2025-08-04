-- CODIGO PARA PROBAR EN MYSQL WORKBENCH LOS ENDPOINTS
-- comprobado en navegador (get) y en postman (resto)

-- insertar una nueva frase
INSERT INTO frases (texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo)
VALUES ('¡Multiplícate por cero!', NULL, 'Bart se lo dice a Skinner en tono rebelde', 3, 3);

-- listar todas las frases (con info del personaje y titulo del capitulo)
SELECT frases.id AS id_frase, frases.texto AS frase, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion, capitulos.titulo AS capitulo
FROM frases
INNER JOIN personajes ON frases.fk_personaje = personajes.id
INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id
ORDER BY personajes.nombre ASC;

-- obtener una frase especifica
SELECT frases.texto AS frase, personajes.nombre, personajes.apellido, capitulos.titulo AS capitulo, capitulos.temporada, capitulos.numero_episodio, frases.marca_tiempo, frases.descripcion AS descripcion_frase
FROM frases
INNER JOIN personajes ON frases.fk_personaje = personajes.id
INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id
WHERE frases.id = 8;

-- actualizar una frase existente
UPDATE frases
SET texto = "Gracias por su visita, vuelva pronto"
WHERE id = 10;

-- eliminar una frase
DELETE FROM frases
WHERE id = 22;

-- obtener todas las frases de un personaje especifico
SELECT personajes.id AS id_personaje, personajes.nombre, personajes.apellido, frases.texto AS frase
FROM frases
INNER JOIN personajes ON frases.fk_personaje = personajes.id
WHERE personajes.id = 4;

-- obtener todas las frases de un capitulo especifico
SELECT capitulos.id AS id_capitulo, capitulos.titulo AS titulo_capitulo, CONCAT(frases.texto, ' (', personajes.nombre, ' ', personajes.apellido, ')') AS frase
FROM frases
INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id
INNER JOIN personajes ON frases.fk_personaje = personajes.id
WHERE capitulos.id = 5;

-- listar todos los capitulos
SELECT capitulos.id AS id_capitulo, capitulos.titulo AS titulo_capitulo, capitulos.sinopsis AS sinopsis, capitulos.temporada, capitulos.numero_episodio, capitulos.fecha_emision 
FROM capitulos
ORDER BY capitulos.temporada ASC, capitulos.fecha_emision ASC;

-- listar todos los personajes
SELECT personajes.id AS id_personaje, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion
FROM personajes
ORDER BY personajes.nombre ASC;