import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserService {
    async handler(userId, updateUserParams) {
        if (updateUserParams.email) {
            const getUserByEmailRepository =
                new PostgresGetUserByEmailRepository();
            const userWithSameEmail = await getUserByEmailRepository.handler(
                updateUserParams.email,
            );
            if (userWithSameEmail && userWithSameEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams,
        };
        if (updateUserParams.password) {
            const pass_hash = await bcrypt.hash(updateUserParams.password, 10);
            user.pass_hash = pass_hash;
            delete user.password;
        }

        const updateUserRepository = new PostgresUpdateUserRepository();
        const updatedUser = await updateUserRepository.handler(userId, user);
        return updatedUser;
    }
}
