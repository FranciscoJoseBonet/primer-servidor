import http from "http";

const port = 3000;

const server = http.createServer((req, res) => {
	res.end("Server online");
});

server.listen(port, () => {
	console.log(`Escuchando puerto: http://localhost:${port}`);
});
