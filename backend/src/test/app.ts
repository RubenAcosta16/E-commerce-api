import request from 'supertest';
import app from '../index';
import {TaskType} from '../types';

describe('GET /api', () => {
  it('responds with 200 code', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);

  });

  it('responds with json with an array', async () => {
    const response = await request(app).get('/api');
    // expect(response.body).toEqual({ data: 'Hello World' });

    expect(response.body).toBeInstanceOf(Object);
  
    // Verifica que 'data' sea un array
    expect(response.body.data).toBeInstanceOf(Array);
    
    // Verifica que el array no esté vacío
    expect(response.body.data.length).toBeGreaterThan(0);
    
    response.body.data.forEach((task: any) => {
      expect(typeof task.id).toBe('number');
      expect(typeof task.name).toBe('string');
      expect(typeof task.description).toBe('string');
    });
  });
});