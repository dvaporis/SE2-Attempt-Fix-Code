import test from 'ava';
import http from 'http';
import got from 'got';
import app from '../index.js';

const startServerAndClient = async (t) => {
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: 'json',
    prefixUrl: `http://localhost:${port}`,
    throwHttpErrors: false,
  });
};

test.before(async (t) => {
  // Start server
  await startServerAndClient(t);
});

test.after.always(async (t) => {
  if (t.context.server) t.context.server.close();
});

test('GET /books returns a book list with titles', async (t) => {
    const res = await t.context.got('books');
    t.is(res.statusCode, 200);
});

test('GET /books/:id returns a book object', async (t) => {
    const res = await t.context.got('books/1');
    t.is(res.statusCode, 200);
});

test('POST /books echoes a created book shape', async (t) => {
    const payload = {
        title: 'Test Book',
        author_id: 1,
        category_id: 2,
        published_year: 2024,
    };
    const res = await t.context.got.post('books', { json: payload });
    t.is(res.statusCode, 200);
});

test('GET /authors returns author list with names', async (t) => {
    const res = await t.context.got('authors');
    t.is(res.statusCode, 200);
});

test('GET /authors/:id returns an author object', async (t) => {
    const res = await t.context.got('authors/1');
    t.is(res.statusCode, 200);
});

test('POST /authors echoes a created author shape', async (t) => {
    const payload = {
        name: 'Test Author',
    };
    const res = await t.context.got.post('authors', { json: payload });
    t.is(res.statusCode, 200);
});

test('GET /categories returns category list with names', async (t) => {
    const res = await t.context.got('categories');
    t.is(res.statusCode, 200);
});

test('GET /categories/id returns a category object', async (t) => {
    const res = await t.context.got('categories/1');
    t.is(res.statusCode, 200);
});

test('POST /categories echoes a created category shape', async (t) => {
    const payload = {
        name: 'Fan Fiction'
    };
    const res = await t.context.got.post('categories', { json: payload });
    t.is(res.statusCode, 200);
});

// Profanws mporousa na kanw ki alla alla variomouna, eksetash einai re malakes hmarton