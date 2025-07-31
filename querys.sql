-- listar todas las frases (con info del personaje y titulo del capitulo)
SELECT frases.texto, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion, capitulos.titulo
FROM frases
INNER JOIN personajes ON frases.fk_personaje = personajes.id
INNER JOIN capitulos ON frases.fk_capitulo = capitulos.id;


