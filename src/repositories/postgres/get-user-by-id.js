import { queryHelper } from '../../db/postgres/client.js';

export class PostgresGetUserByIdRepository {
  async handler(userId) {
    const user = await queryHelper.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);

    return user[0];
  }
}
