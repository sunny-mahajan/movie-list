const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/test', (req, res) => {
    res.json({ message: 'Hello !!' });
  });

  // Fallback to Next.js default handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT}`);
  });
});
