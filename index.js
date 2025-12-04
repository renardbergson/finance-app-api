import express from 'express';

import {
    makeGetUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js';

const app = express();
app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.handler(req);
    res.status(statusCode).json(body);
});

app.post('/api/users', async (req, res) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.handler(req);
    res.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController();
    const { statusCode, body } = await updateUserController.handler(req);
    res.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.handler(req);
    res.status(statusCode).json(body);
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
