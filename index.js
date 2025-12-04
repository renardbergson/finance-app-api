import express from 'express';
import {
    CreateUserController,
    UpdateUserController,
    GetUserByIdController,
    DeleteUserController,
} from './src/controllers/index.js';
import {
    GetUserByIdService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
} from './src/services/index.js';
import {
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from './src/repositories/postgres/index.js';

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
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();
    const createUserService = new CreateUserService(
        getUserByEmailRepository,
        createUserRepository,
    );
    const createUserController = new CreateUserController(createUserService);
    const { statusCode, body } = await createUserController.handler(req);
    res.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();
    const updateUserService = new UpdateUserService(
        getUserByEmailRepository,
        updateUserRepository,
    );
    const updateUserController = new UpdateUserController(updateUserService);
    const { statusCode, body } = await updateUserController.handler(req);
    res.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserService = new DeleteUserService(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserService);
    const { statusCode, body } = await deleteUserController.handler(req);
    res.status(statusCode).json(body);
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
