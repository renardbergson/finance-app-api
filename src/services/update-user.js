import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserService {
    async handler(userId, updateUserParams) {
        // 1. se o e-mail estiver sendo atualizado, verificar se ele já está em uso
        if (updateUserParams.email) {
            const getUserByEmailRepository =
                new PostgresGetUserByEmailRepository();
            const emailAlreadyInUse = await getUserByEmailRepository.handler(
                updateUserParams.email,
            );
            if (emailAlreadyInUse) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams,
        };

        // 2. se a senha estiver sendo atualizada, hashar a senha
        if (updateUserParams.password) {
            const pass_hash = await bcrypt.hash(updateUserParams.password, 10);
            user.pass_hash = pass_hash;
            delete user.password;
        }

        // 3. chamar o repository para atualizar o usuário
        const updateUserRepository = new PostgresUpdateUserRepository();
        const updatedUser = await updateUserRepository.handler(userId, user);
        return updatedUser;
    }
}
