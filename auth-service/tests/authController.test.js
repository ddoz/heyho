// service-auth/tests/authController.test.js

const request = require('supertest');
const app = require('../app');
const { registerUser, getUserByUsername } = require('../models/userModel');

function generateRandomUsername() {
    const adjectives = ['happy', 'sad', 'angry', 'brave', 'smart', 'silly', 'kind', 'funny'];
    const nouns = ['dog', 'cat', 'bird', 'lion', 'tiger', 'elephant', 'monkey', 'snake'];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
    const randomNumber = Math.floor(Math.random() * 1000);
  
    return `${randomAdjective}-${randomNoun}-${randomNumber}`;
}

// describe('Testing Endpoints', () => {
//     it('should respond with "Hello, World!"', async () => {
//       const res = await request(app).get('/');
//       expect(res.status).toBe(200);
//       expect(res.text).toBe('Hello, World!');
//     });
// });

describe('Auth Service', () => {
  afterAll(() => {
    // Clean up database or perform any necessary teardown
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
    var username =  generateRandomUsername();
      const response = await request(app)
        .post('/auth/register')
        .send({
          username: username,
          password: 'testpassword'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ message: 'User registered successfully' });

      // Verify that the user is actually registered in the database
      const user = await getUserByUsername(username);
      expect(user).toBeTruthy();
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user with valid credentials', async () => {
        var username =  generateRandomUsername();
      // Create a test user
      await registerUser(username, 'testpassword');

      const response = await request(app)
        .post('/auth/login')
        .send({
          username: username,
          password: 'testpassword'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.authToken).toBeTruthy();
    });

    it('should return an error for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'nonexistentuser',
          password: 'wrongpassword'
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ message: 'Invalid credentials' });
    });
  });

  describe('POST /auth/logout', () => {
    it('should log out a user', async () => {
        var username =  generateRandomUsername();
      // Create a test user
      await registerUser(username, 'testpassword');

      // Log in the test user to get the auth token
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          username: username,
          password: 'testpassword'
        });

      const authToken = loginResponse.body.authToken;

      const response = await request(app)
        .post('/auth/logout')
        .set('Authorization', authToken);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Logout successful' });
    });
  });

  describe('GET /auth/profile', () => {
    it('should return user profile for a valid user', async () => {
        var username =  generateRandomUsername();
      // Create a test user
      await registerUser(username, 'testpassword');

      // Log in the test user to get the auth token
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          username: username,
          password: 'testpassword'
        });

      const authToken = loginResponse.body.authToken;

      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', authToken);

      expect(response.statusCode).toBe(200);
      expect(response.body.username).toBe(username);
    });

    it('should return an error for an invalid user', async () => {
      const response = await request(app).get('/auth/profile');

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized' });
    });
  });
});
