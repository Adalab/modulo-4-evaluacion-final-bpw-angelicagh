-- CODIGO PARA PROBAR EN MYSQL WORKBENCH LOS ENDPOINTS
-- comprobado en navegador (get) y en postman (resto)

-- listar todas las frases (con info del personaje y titulo del capitulo)
SELECT frases.id, frases.texto AS frase, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion, capitulos.titulo AS capitulo
FROM frases
INNER JOIN personajes ON frases.fk_personaje = personajes.id
INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id
ORDER BY personajes.nombre ASC;

-- insertar una nueva frase
INSERT INTO frases (texto, marca_tiempo, descripcion, fk_personaje, fk_capitulo)
VALUES ('¡Multiplícate por cero!', NULL, 'Bart se lo dice a Skinner en tono rebelde', 3, 3);

-- obtener una frase especifica
SELECT frases.texto AS frase, personajes.nombre, personajes.apellido
FROM frases
INNER JOIN personajes ON frases.fk_personaje = personajes.id
WHERE frases.id = 8;

-- actualizar una frase existente
UPDATE frases
SET texto = "Gracias por su visita, vuelva pronto"
WHERE id = 10;

-- eliminar una frase
DELETE FROM frases
WHERE id = 22;