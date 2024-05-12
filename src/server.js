import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middleware/json.js";
import { Database } from "./middleware/database.js";

/*
================
      HTTP
================
- Método HTTP
- Url

================================
  GET, POST, PUT, PATCH, DELETE
================================
- GET => Buscar um recurso no Back-end
- POST => Criar um recurso no Back-end
- PUT => Atualizar um recurso no Back-end
- PATCH => Atualizar uma informação especifica de um recurso no Back-end
- DELETE => Deletar um recurso no Back-end
*/

// JSON - JavaScript Object Notation

// Headers - (Request, Response) => Metadados

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    database.insert("users", user);

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

server.listen(3333);
