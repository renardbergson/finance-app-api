import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js';

export class GetUserByIdRepository {
  async handler(userID) {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const user = await getUserByIdRepository.handler(userID);
    return user;
  }
}
