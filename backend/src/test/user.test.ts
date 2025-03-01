import request from "supertest";
import app from "../index";
import connectDB from "../database/database";

// import {TaskType} from '../types';

describe("POST User register", () => {
  //   it('responds with 200 code', async () => {
  //     const response = await request(app).get('/api');
  //     expect(response.status).toBe(200);

  //   });

  it("responds with json with an array", async () => {
    await connectDB();

    const newUser = {
      username: "testuser6",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/user/register")
      .send(newUser);
    // expect(response.body).toEqual({ data: 'Hello World' });

    expect(response.body).toBeInstanceOf(Object);

    // Verifica que 'data' sea un array
    expect(response.body.data).toBeInstanceOf(Object);

    expect(response.body.data.username).toBeDefined();
    expect(response.body.data._id).toBeDefined();

    // Verifica que el array no esté vacío
    // expect(response.body.data.length).toBeGreaterThan(0);

    // response.body.data.forEach((task: any) => {
    //   expect(typeof task.id).toBe('number');
    //   expect(typeof task.name).toBe('string');
    //   expect(typeof task.description).toBe('string');
    // });
  });

  it("responds with json with an array", async () => {
    await connectDB();

    const newUser = {
      username: "testuser",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/user/login")
      .send(newUser);
    // expect(response.body).toEqual({ data: 'Hello World' });

    expect(response.body).toBeInstanceOf(Object);

    // Verifica que 'data' sea un array
    expect(response.body.data).toBeInstanceOf(Object);

    expect(response.body.data.user.username).toBeDefined();
    expect(response.body.data.user._id).toBeDefined();
    expect(response.body.data.token).toBeDefined();

    // Verifica que el array no esté vacío
    // expect(response.body.data.length).toBeGreaterThan(0);

    // response.body.data.forEach((task: any) => {
    //   expect(typeof task.id).toBe('number');
    //   expect(typeof task.name).toBe('string');
    //   expect(typeof task.description).toBe('string');
    // });
  });

  it("responds with json with an array", async () => {
    await connectDB();

    // const newUser = {
    //   username: "testuser",
    //   password: "password123",
    // };

    const response = await request(app).post("/api/v1/user/logout");
    // .send(newUser);
    // expect(response.body).toEqual({ data: 'Hello World' });

    expect(response.body).toBeInstanceOf(Object);

    // Verifica que 'data' sea un array
    expect(response.body.message).toBeDefined();

    // Verifica que el array no esté vacío
    // expect(response.body.data.length).toBeGreaterThan(0);

    // response.body.data.forEach((task: any) => {
    //   expect(typeof task.id).toBe('number');
    //   expect(typeof task.name).toBe('string');
    //   expect(typeof task.description).toBe('string');
    // });
  });
});
