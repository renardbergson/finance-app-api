import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
export class CreateUserService {
    async handler(createUserParams) {
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
        const emailAlreadyInUse = await getUserByEmailRepository.handler(
            createUserParams.email,
        );
        if (emailAlreadyInUse) {
            throw new Error('The provided email is already in use.');
        }

        const userID = crypto.randomUUID();
        const pass_hash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            id: userID,
            pass_hash, // sobreescrevendo o password com o pass_hash
        };

        const createUserRepository = new PostgresCreateUserRepository();
        const createdUser = await createUserRepository.handler(user);
        return createdUser;
    }
}
