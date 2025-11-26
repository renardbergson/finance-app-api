import { queryHelper } from '../../db/postgres/client.js';

export class PostgresUpdateUserRepository {
    async handler(userId, updateUserParams) {
        const fieldsToUpdate = [];
        const valuesToUpdate = [];

        Object.keys(updateUserParams).forEach((key) => {
            fieldsToUpdate.push(`${key} = $${valuesToUpdate.length + 1}`);
            valuesToUpdate.push(updateUserParams[key]);
        });

        valuesToUpdate.push(userId);

        const query = `
            UPDATE users
            SET ${fieldsToUpdate.join(', ')}
            WHERE id = $${valuesToUpdate.length}
            RETURNING *
        `;

        const updatedUser = await queryHelper.query(query, valuesToUpdate);
        return updatedUser[0];
    }
}
