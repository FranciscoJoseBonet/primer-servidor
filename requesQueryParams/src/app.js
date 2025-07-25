import express from "express";

const app = express();

const PORT = 8080;

// --- MIDDLEWARES ---
// Para interpretar JSON en body de las peticiones
app.use(express.json());

// Para interpretar datos enviados con formato URL encoded (formularios HTML)
app.use(express.urlencoded({ extended: true }));

// --- DATOS DE EJEMPLO ---
// Array de usuarios con id, nombre y sexo
const usuarios = [
	{ id: 1, nombre: "Lucía", sexo: "F" },
	{ id: 2, nombre: "Martín", sexo: "M" },
	{ id: 3, nombre: "Camila", sexo: "F" },
	{ id: 4, nombre: "Juan", sexo: "M" },
	{ id: 5, nombre: "Sofía", sexo: "F" },
	{ id: 6, nombre: "Lucas", sexo: "M" },
	{ id: 7, nombre: "Valentina", sexo: "F" },
	{ id: 8, nombre: "Tomás", sexo: "M" },
	{ id: 9, nombre: "Florencia", sexo: "F" },
	{ id: 10, nombre: "Agustín", sexo: "M" },
];

// --- RUTAS ---

// Ruta con QUERY PARAMS (parámetros en la URL tipo ?sexo=F o ?sexo=M)
// Para filtrar usuarios por sexo
// Descomentar para usar esta funcionalidad y comentar la ruta raíz si hay conflicto

app.get("/", (req, res) => {
	let sexoIngresado = req.query.sexo; // Obtener el valor del parámetro "sexo" en la URL

	// Validamos que sexoIngresado sea "M" o "F", si no, devolvemos todos los usuarios
	if (!sexoIngresado || (sexoIngresado !== "M" && sexoIngresado !== "F")) {
		return res.json({ usuarios });
	}

	// Filtramos el array de usuarios por sexo
	let usuariosFiltrados = usuarios.filter((user) => user.sexo === sexoIngresado);

	// Devolvemos solo los usuarios filtrados
	res.json({ usuarios: usuariosFiltrados });
});

// Ruta con PARAMS DINÁMICOS en la URL (tipo /5, /10, etc)
// Para buscar usuario por ID
app.get("/:idUsr", (req, res) => {
	let idIngresado = Number(req.params.idUsr); // Convertimos param a número

	let usr = usuarios.find((user) => user.id === idIngresado); // Buscamos usuario por id

	// Si no existe el usuario o el id es inválido (NaN), devolvemos todos los usuarios
	if (!usr || isNaN(idIngresado)) {
		return res.json({ usuarios });
	}

	// Si existe, devolvemos el usuario encontrado
	res.json({ usr });
});

// Ruta raíz sin filtros (para devolver todos los usuarios)
// Útil para cuando no se usa query params para filtrar
app.get("/", (req, res) => {
	res.json({ usuarios });
});

app.post("/usuarios", (req, res) => {
	const { nombre, sexo } = req.body;

	if (!nombre || !sexo || (sexo !== "M" && sexo !== "F")) {
		return res.status(400).send({
			status: "error",
			error: "nombre o sexo incompleto o inválido",
		});
	}

	// Generar nuevo id (suponiendo que siempre se suman secuencialmente)
	const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

	const nuevoUsuario = {
		id: nuevoId,
		nombre,
		sexo,
	};

	usuarios.push(nuevoUsuario);

	res.status(201).send({ status: "success", user: nuevoUsuario });
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
