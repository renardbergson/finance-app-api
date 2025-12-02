import express from 'express';
import {
    CreateUserController,
    UpdateUserController,
    GetUserByIdController,
} from './src/controllers/index.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.handler(req);
    res.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController();
    const { statusCode, body } = await updateUserController.handler(req);
    res.status(statusCode).json(body);
});

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController();
    const { statusCode, body } = await getUserByIdController.handler(req);
    res.status(statusCode).json(body);
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
