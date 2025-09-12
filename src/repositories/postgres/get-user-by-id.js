import { queryHelper } from '../../db/postgres/client.js';

export class PostgresGetUserByIdRepository {
  async handler(userID) {
    const user = await queryHelper.query('SELECT * FROM users WHERE id = $1', [
      userID,
    ]);

    return user[0];
  }
}
