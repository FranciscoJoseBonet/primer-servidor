import express from "express";

const app = express();

const PORT = 8080;

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Es para interpretar datos complejos que se envien en la url

app.get("/consultasVarias", (req, res) => {
	let consultas = req.query;
	res.send(consultas);
});

app.listen(PORT, () => console.log("listo para recibir peticiones"));
