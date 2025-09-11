import { queryHelper } from '../../db/postgres/client.js';

export class PostgresCreateUserRepository {
  async handler(createUserParams) {
    // PG sintax
    await queryHelper.query(
      'INSERT INTO users (id, firstName, lastName, email, pass_hash) VALUES ($1, $2, $3, $4, $5)',
      [
        createUserParams.id,
        createUserParams.firstName,
        createUserParams.lastName,
        createUserParams.email,
        createUserParams.pass_hash,
      ],
    );

    const createdUser = await queryHelper.query(
      'SELECT * FROM users WHERE id = $1',
      [createUserParams.id],
    );

    return createdUser[0];
  }
}
