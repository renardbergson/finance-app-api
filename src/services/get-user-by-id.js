import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js';

export class GetUserByIdService {
    async handler(userID) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();
        const user = await getUserByIdRepository.handler(userID);
        return user;
    }
}
