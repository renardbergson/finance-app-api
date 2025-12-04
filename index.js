import express from 'express';
import {
    CreateUserController,
    UpdateUserController,
    GetUserByIdController,
    DeleteUserController,
} from './src/controllers/index.js';
import { GetUserByIdService } from './src/services/index.js';
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/index.js';

const app = express();
app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdService = new GetUserByIdService(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdService);
    const { statusCode, body } = await getUserByIdController.handler(req);
    res.status(statusCode).json(body);
});

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

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = new DeleteUserController();
    const { statusCode, body } = await deleteUserController.handler(req);
    res.status(statusCode).json(body);
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
