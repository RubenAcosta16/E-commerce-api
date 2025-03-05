// // import jest from 'jest'
// //no hace falta importar jest, tiene modulos globales

// // la documentacion de supertest recomienda importarlo con el nombre request, porque solo hace peticiones

// // "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --detectOpenHandles",
// // comando pal test, en package json

// import request from "supertest";

// import app from "../src/app";

// // todo  jest
// // seccion donde agrupar varios test
// // pones la ruta 
// describe("GET /tasks", () => {
//   test("should respond with a 200 status code", async () => {
//     const response = await request(app).get("/tasks").send();
//     // console.log(response);
//     // el toBe es para comparar
//     expect(response.statusCode).toBe(200);
//   });

//   test("should respond an array", async () => {
//     const response = await request(app).get("/tasks").send();
//     expect(response.body).toBeInstanceOf(Array);
//   });
// });

// describe("POST tasks", () => {
//   const newTask = {
//     title: "some title",
//     description: "some description",
//   };

//   describe("given a title and description", () => {
//     // validar que tenga un id la respuesta
//     test("should respond with an task ID", async () => {
//       const response = await request(app).post("/tasks").send(newTask);

//       expect(response.body.id).toBeDefined();
//     });
//   });

//   describe("when title and description is missing", () => {
//     const fields = [
//       { title: "" },
//       { description: "" },
//       { title: "some title", description: "" },
//       { title: "", description: "some description" },
//     ];

//     for (const body of fields) {
//       test("should respond with a 400 status code", async () => {
//         const response = await request(app).post("/tasks").send(body);

//         expect(response.statusCode).toBe(400);
//       });
//     }
//   });

//   // // lo desactive porque en la ruta pide que le manden algo y este no manda nada
//   // test("should respond with a 200 status code", async () => {
//   //   const response = await request(app).post("/tasks").send(newTask);
//   //   expect(response.statusCode).toBe(200);
//   // });
//   // // en resumen que devuelva un json
//   // test("should have a content-type: application/json in header", async () => {
//   //   const response = await request(app).post("/tasks").send(newTask);
//   //   expect(response.headers["content-type"]).toEqual(
//   //     expect.stringContaining("json")
//   //   );
//   // });
// });
