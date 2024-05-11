import http, { request } from "node:http";

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

const users = [];

const server = http.createServer((resquest, response) => {
  const { method, url } = resquest;

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-type", "application/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "Helton Muniz",
      email: "0xhelton@gmail.com",
    });

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

server.listen(3333);
