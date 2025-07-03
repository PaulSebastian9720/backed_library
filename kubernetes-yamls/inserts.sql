CREATE TABLE IF NOT EXISTS libro
(
    id serial CONSTRAINT "PK_47ec60a1186696b36e76f499516" PRIMARY KEY,
    nombre varchar NOT NULL,
    autor varchar NOT NULL,
    descripcion text NOT NULL,
    aniopublicacion integer NOT NULL,
    imagenurl varchar NOT NULL
);

ALTER TABLE libro OWNER TO applibros_user;


INSERT INTO libro (id, nombre, autor, descripcion, anioPublicacion, imagenUrl)
SELECT * FROM (
  VALUES
    (100, 'Cien años de soledad', 'Gabriel García Márquez', 'La historia épica de la familia Buendía en el pueblo ficticio de Macondo.', 1967, 'https://example.com/imagen_100.jpg'),
    (101, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'Las aventuras del caballero andante y su fiel escudero.', 1605, 'https://example.com/imagen_101.jpg'),
    (102, '1984', 'George Orwell', 'Una novela distópica sobre un régimen totalitario y vigilancia extrema.', 1949, 'https://example.com/imagen_102.jpg'),
    (103, 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 'Una historia de amor que dura más de cincuenta años.', 1985, 'https://example.com/imagen_103.jpg'),
    (104, 'La sombra del viento', 'Carlos Ruiz Zafón', 'Un joven descubre un libro misterioso y secretos en la Barcelona de posguerra.', 2001, 'https://example.com/imagen_104.jpg'),
    (105, 'Orgullo y prejuicio', 'Jane Austen', 'Las peripecias amorosas y sociales de Elizabeth Bennet.', 1813, 'https://example.com/imagen_105.jpg'),
    (106, 'Moby Dick', 'Herman Melville', 'La obsesiva persecución de una ballena blanca por el capitán Ahab.', 1851, 'https://example.com/imagen_106.jpg'),
    (107, 'Crimen y castigo', 'Fiódor Dostoyevski', 'Las consecuencias morales de un asesinato cometido por un joven estudiante.', 1866, 'https://example.com/imagen_107.jpg'),
    (108, 'El gran Gatsby', 'F. Scott Fitzgerald', 'La decadencia y el sueño americano en los años 20.', 1925, 'https://example.com/imagen_108.jpg'),
    (109, 'Hamlet', 'William Shakespeare', 'Una tragedia sobre la venganza del príncipe Hamlet.', 1603, 'https://example.com/imagen_109.jpg'),
    (110, 'El señor de los anillos', 'J.R.R. Tolkien', 'Una épica aventura para destruir un anillo poderoso.', 1954, 'https://example.com/imagen_110.jpg'),
    (111, 'El diario de Ana Frank', 'Ana Frank', 'Las memorias de una niña judía escondida durante la Segunda Guerra Mundial.', 1947, 'https://example.com/imagen_111.jpg'),
    (112, 'La metamorfosis', 'Franz Kafka', 'La extraña transformación de Gregor Samsa en un insecto gigante.', 1915, 'https://example.com/imagen_112.jpg'),
    (113, 'Cumbres borrascosas', 'Emily Brontë', 'Una tormentosa historia de amor y venganza en los páramos.', 1847, 'https://example.com/imagen_113.jpg'),
    (114, 'El código Da Vinci', 'Dan Brown', 'Un thriller sobre secretos ocultos en el arte y la religión.', 2003, 'https://example.com/imagen_114.jpg'),
    (115, 'El principito', 'Antoine de Saint-Exupéry', 'Una fábula poética sobre la inocencia y la amistad.', 1943, 'https://example.com/imagen_115.jpg'),
    (116, 'Rayuela', 'Julio Cortázar', 'Una novela experimental sobre la vida y el amor en Buenos Aires y París.', 1963, 'https://example.com/imagen_116.jpg'),
    (117, 'Fahrenheit 451', 'Ray Bradbury', 'Un futuro donde los libros están prohibidos y son quemados.', 1953, 'https://example.com/imagen_117.jpg'),
    (118, 'Don Juan Tenorio', 'José Zorrilla', 'Una obra de teatro sobre el famoso seductor español.', 1844, 'https://example.com/imagen_118.jpg'),
    (119, 'La Iliada', 'Homero', 'El épico poema griego sobre la guerra de Troya.', -750, 'https://example.com/imagen_119.jpg'),
    (120, 'El guardián entre el centeno', 'J.D. Salinger', 'Las peripecias del joven Holden Caulfield.', 1951, 'https://example.com/imagen_120.jpg'),
    (121, 'Lolita', 'Vladimir Nabokov', 'Una controvertida novela sobre la obsesión y la manipulación.', 1955, 'https://example.com/imagen_121.jpg'),
    (122, 'Ana Karenina', 'Lev Tolstói', 'Una trágica historia de amor y sociedad en la Rusia imperial.', 1877, 'https://example.com/imagen_122.jpg'),
    (123, 'Drácula', 'Bram Stoker', 'La novela clásica del vampiro más famoso.', 1897, 'https://example.com/imagen_123.jpg'),
    (124, 'El extranjero', 'Albert Camus', 'Una novela existencialista sobre el absurdo y la indiferencia.', 1942, 'https://example.com/imagen_124.jpg'),
    (125, 'Las mil y una noches', 'Anónimo', 'Una colección de cuentos del Medio Oriente.', 1300, 'https://example.com/imagen_125.jpg'),
    (126, 'El Hobbit', 'J.R.R. Tolkien', 'La aventura de Bilbo Bolsón para recuperar un tesoro.', 1937, 'https://example.com/imagen_126.jpg'),
    (127, 'Los miserables', 'Victor Hugo', 'La lucha de personajes contra la injusticia social en Francia.', 1862, 'https://example.com/imagen_127.jpg'),
    (128, 'El retrato de Dorian Gray', 'Oscar Wilde', 'La historia de un hombre cuya juventud y belleza permanecen intactas.', 1890, 'https://example.com/imagen_128.jpg'),
    (129, 'Matar a un ruiseñor', 'Harper Lee', 'Una novela sobre racismo e inocencia en el sur de Estados Unidos.', 1960, 'https://example.com/imagen_129.jpg')
) AS new_libros(id, nombre, autor, descripcion, anioPublicacion, imagenUrl)
WHERE NOT EXISTS (
  SELECT 1 FROM libro l WHERE l.id = new_libros.id
);
