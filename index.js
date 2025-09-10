import express from 'express';
import { scriptHelper } from './src/db/postgres/client.js';

const app = express();

app.get('/', async (req, res) => {
  const results = await scriptHelper.query('SELECT * FROM users;');
  res.status(200).send(results);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
