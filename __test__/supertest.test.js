const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/posts', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/posts')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('posts from "DB" json are in body of response', () => {
        return request(server)
          .get('/posts')
          .expect((res) => {
            expect(Array.isArray(res.body)).toEqual(true);
          });
      });
    });

    describe('POST', () => {
      const newPost = {
        user_id: 2,
        message: 'post test 1',
      };
      it('responds with 200 status and application/json content type', () => {
        return request(server).post('/posts').send(newPost).expect(200);
      });

      it('responds to invalid request with 404 status and error message in body', () => {
        return request(server)
          .post('/posts')
          .send([{ message: 6 }])
          .expect(404);
      });
    });
  });

  describe('/comments', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/comments')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('comments from "DB" json are in body of response', () => {
        return request(server)
          .get('/comments')
          .expect((res) => {
            expect(Array.isArray(res.body)).toEqual(true);
          });
      });
    });

    describe('POST', () => {
      const newComment = {
        post_id: 2,
        user_id: 2,
        message: 'comments from supertest',
      };
      it('responds with 200 status and application/json content type', () => {
        return request(server).post('/comments').send(newComment).expect(200);
      });

      it('responds to invalid request with 404 status and error message in body', () => {
        return request(server)
          .post('/comments')
          .send([{ message: 6 }])
          .expect(404);
      });
    });
  });
});
