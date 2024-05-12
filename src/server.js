import http from "node:http";

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

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-type", "application/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

server.listen(3333);
