CREATE DATABASE IF NOT EXISTS simpsons_db;

USE simpsons_db;

CREATE TABLE frases (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
texto VARCHAR(200) NOT NULL,
marca_tiempo TIME NULL,
descripcion TEXT NULL,
fk_personaje INT,
fk_capitulo INT,
FOREIGN KEY (fk_personaje) REFERENCES personajes(id) -- relacion 1 personaje - muchas frases
);

ALTER TABLE frases
ADD COLUMN fk_capitulo INT,
ADD FOREIGN KEY (fk_capitulo) REFERENCES capitulos(id);

CREATE TABLE personajes (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(45) NOT NULL,
apellido VARCHAR(45) NULL,
ocupacion VARCHAR(100) NULL,
descripcion TEXT NULL
);

CREATE TABLE capitulos (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR (100) NOT NULL,
numero_episodio INT NULL,
temporada INT NULL,
fecha_emision DATE NULL,
sinopsis TEXT NULL
);

-- relacion muchos personajes - muchos capitulos
CREATE TABLE personajes_has_capitulos (
fk_personaje INT,
FOREIGN KEY (fk_personaje) REFERENCES personajes(id),
fk_capitulo INT,
FOREIGN KEY (fk_capitulo) REFERENCES capitulos(id),
PRIMARY KEY (fk_personaje, fk_capitulo)
);

INSERT INTO personajes (nombre, apellido, ocupacion, descripcion)
VALUES
('Homer', 'Simpson', 'Inspector de seguridad nuclear', 'Padre de familia torpe pero entrañable, adora las rosquillas'),
('Marge', 'Simpson', 'Ama de casa', 'Madre esponsable, con un llamativo pelo azul'),
('Bart', 'Simpson', 'Estudiante', 'Niño travieso, rebelde y amante del skate'),
('Lisa', 'Simpson', 'Estudiante', 'Niña prodigio amante del saxofón, vegetariana, activista y feminista'),
('Maggie', 'Simpson', 'Bebé', 'No se separa de su chupete'),
('Apu', 'Nahasapeemapetilon', 'Dueño del Kwik-E-Mart', 'Vendedor amable y trabajador con acento característico'),
('Ned', 'Flanders', 'Empresario', 'Vecino muy optimista y religioso'),
('Montgomery', 'Burns', 'Dueño de la planta nuclear', 'Multimillonario despiadado, jefe de Homer, obsesionado con el poder'),
('Moe', 'Szyslak', 'Empresario', 'Dueño del bar de Moe, malhumorado pero con buen corazón'),
('Milhouse', 'Van Houten', 'Estudiante', 'Mejor amigo de Bart, tímido y enamorado de Lisa'),
('Ralph', 'Wiggum', 'Estudiante', 'Niño excéntrico, famoso por su imaginación y frases absurdas'),
('Bob', 'Terwilliger', 'Actor secundario', 'Genio criminal, vengativo, exayudante de Krusty, enemigo de Bart');

UPDATE personajes
SET ocupacion = 'Dueño del Badulaque'
WHERE id = 6;

INSERT INTO frases (texto, marca_tiempo, descripcion, fk_personaje)
VALUES
("D'oh!", NULL, 'Queja típica cuando algo le sale mal', 1),
('¡Mmm... rosquillas!', '00:08:15', 'Expresión de deseo por su comida favorita', 1),
('Si no tienes nada bueno que decir, ven a sentarte aquí conmigo', NULL, NULL, 2),
('A veces una mujer tiene que defenderse por sí misma', NULL, NULL, 2),
('¡Ay, caramba!', NULL, NULL, 3),
('Muy bien. No me casaré nunca', NULL, 'Lisa indignada', 4),
('Es curioso cómo la música puede hacer que los recuerdos vuelvan', '00:12:20', 'Lisa nostálgica', 4),
('La música puede cambiar el mundo', '00:11:11', 'Amor por el saxofón y el activismo', 4),
('Chuik', '00:24:29', 'Sonido de su chupete', 5),
('¡Gracias, vuelva pronto!', '00:10:00', 'Frase que repite con cada cliente', 6),
('¡Hola holita, vecinito!', '00:23:30', 'Saludo característico', 7),
('¡Excelente!', NULL, 'Expresión de aprobación maquiavélica', 8),
('Smithers, elimine a esa persona', '00:18:25', 'Demostración de abuso de poder', 8),
('Este bar es lo único que me queda', '00:10:11', NULL, 9),
('Lisa me habló otra vez, ¡sí!', '11:20:00', 'Momento de esperanza romántica', 10),
('Bart, ¿de verdad somos amigos?', '11:30:00', 'Inseguridad y necesidad de afecto', 10),
('¡Soy un unicornio retrasado!', '00:04:15', 'Frase divertida', 11),
('Eres muy chu chu chuli', NULL, 'Frase que le dice a Lisa por San Valentín', 11),
('¡Te voy a matar!', '00:09:22', 'Amenaza mientras masajea los pies de Selma', 12),
('Die Bart, Die... No es una amenaza, ¡es alemán!', NULL, 'Juego de palabras que usa para engañar a la junta de libertad condicional', 12);

UPDATE frases SET fk_capitulo = 1 WHERE id IN (6, 15, 17, 18);
UPDATE frases SET fk_capitulo = 2 WHERE id IN (1, 2, 11, 14);
UPDATE frases SET fk_capitulo = 3 WHERE id IN (5, 16);
UPDATE frases SET fk_capitulo = 4 WHERE id IN (7, 8, 9);
UPDATE frases SET fk_capitulo = 5 WHERE id IN (3, 4);
UPDATE frases SET fk_capitulo = 6 WHERE id IN (19, 20);
UPDATE frases SET fk_capitulo = 7 WHERE id = 10;
UPDATE frases SET fk_capitulo = 8 WHERE id IN (12, 13);

INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision, sinopsis)
VALUES
('Amo a Lisa', 15, 4, '1993-02-11', 'Lisa le da una tarjeta de San Valentín a Ralph, lo que desencadena una inesperada historia de afecto y rechazo'),
('El enemigo de Homer', 23, 8, '1997-05-04', 'Homer conoce a Frank Grimes, quien no soporta su estilo de vida despreocupado'),
('Bart el genio', 2, 1, '1990-01-14', 'Bart engaña a todos haciéndose pasar por un niño superdotado'),
('Lisa la vegetariana', 5, 7, '1995-10-15', 'Lisa decide dejar de comer carne y enfrenta el rechazo de su familia'),
('Marge contra el monorriel', 12, 4, '1993-01-14', 'Springfield compra un monorriel y Marge sospecha que es una estafa'),
('El cabo del miedo', 2, 5, '1993-10-07', 'El Actor Secundario Bob sale de prisión y persigue a Bart, obligando a la familia a entrar en el programa de protección de testigos'),
('La boda de Apu', 13, 9, '1998-02-08', 'Apu intenta evitar un matrimonio arreglado, pero termina enamorándose de su prometida'),
('Dos docenas y un galgo', 20, 6, '1995-04-09', 'El Sr. Burns intenta fabricar un abrigo con los cachorritos de Ayudante de Santa, pero termina encariñándose con ellos tras la canción "mocasines saltarines"');

INSERT INTO personajes_has_capitulos (fk_personaje, fk_capitulo) 
VALUES
(1, 2), 
(1, 3), 
(1, 4), 
(1, 5), 
(1, 6), 
(1, 7), 
(1, 8),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(4, 1), 
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(5, 8),
(6, 7),
(8, 2),
(8, 8),
(11, 1),
(12, 6); 
























