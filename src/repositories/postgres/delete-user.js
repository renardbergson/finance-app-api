import { queryHelper } from '../../db/postgres/client.js';

export class PostgresDeleteUserRepository {
    async handler(userId) {
        const deletedUser = await queryHelper.query(
            `
                DELETE FROM users 
                WHERE id = $1 
                RETURNING *
            `,
            [userId],
        );
        return deletedUser[0];
    }
}
