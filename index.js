import express from 'express';

const app = express();
app.use(express.json());

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
