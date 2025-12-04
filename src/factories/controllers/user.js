import {
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from '../../repositories/postgres/index.js';
import {
    GetUserByIdService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
} from '../../services/index.js';
import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
} from '../../controllers/index.js';

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdService = new GetUserByIdService(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdService);
    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();
    const createUserService = new CreateUserService(
        getUserByEmailRepository,
        createUserRepository,
    );
    const createUserController = new CreateUserController(createUserService);
    return createUserController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();
    const updateUserService = new UpdateUserService(
        getUserByEmailRepository,
        updateUserRepository,
    );
    const updateUserController = new UpdateUserController(updateUserService);
    return updateUserController;
};

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserService = new DeleteUserService(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserService);
    return deleteUserController;
};
