import { querytHelper } from '../../db/postgres/client';

export class PostgresCreateUserRepository {
  async handler(createUserParams) {
    // PG sintax
    const results = await querytHelper.query(
      'INSERT INTO users (id, firstName, lastName, email, pass_salt, pass_hash) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        createUserParams.id,
        createUserParams.firstName,
        createUserParams.lastName,
        createUserParams.email,
        createUserParams.pass_salt,
        createUserParams.pass_hash,
      ],
    );
    return results[0];
  }
}
