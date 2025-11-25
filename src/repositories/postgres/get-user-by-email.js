import { queryHelper } from '../../db/postgres/client.js';

export class PostgresGetUserByEmailRepository {
    async handler(email) {
        const user = await queryHelper.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        );
        return user[0];
    }
}
