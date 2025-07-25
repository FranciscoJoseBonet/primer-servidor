import express from "express";

const app = express();

const PORT = 8080;

app.get("/saludo", (req, res) => {
	res.send("Servidor online");
});

// sumamente importante implementar el listen sino el servidor esta inerte
app.listen(PORT, () => {
	console.log(`Escuchando el puerto ${PORT}`);
});
