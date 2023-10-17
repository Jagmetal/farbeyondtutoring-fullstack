const request = require('supertest');
const app = require('../server'); 

describe('Server Routes and Middleware', () => {
    it('should return a welcome message on GET /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Welcome to myMongoDB application.' });
    });
  
    // Add more test cases to cover other routes and middleware as needed
  });
  
