import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js';

export class DeleteUserService {
    async handler(userID) {
        const deleteUserRepository = new PostgresDeleteUserRepository();
        const deletedUser = await deleteUserRepository.handler(userID);
        return deletedUser;
    }
}
