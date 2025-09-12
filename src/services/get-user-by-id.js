import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js';

export class GetUserByIdService {
  async handler(userId) {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const user = await getUserByIdRepository.handler(userId);
    return user;
  }
}
