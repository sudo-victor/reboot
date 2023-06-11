const http = require("node:http")

console.log("Olá")
console.log("Olá 2")

const app = http.createServer((req, res) => {
  res.end("Hello, world 3!")
})

app.listen(8080, "localhost", () => console.log("Server listening on 8080"))