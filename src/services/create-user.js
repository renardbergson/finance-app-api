import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { PostgresCreateUserRepository } from '../repositories/postgres/index.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
export class CreateUserService {
    async handler(createUserParams) {
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
        const emailAlreadyInUse = await getUserByEmailRepository.handler(
            createUserParams.email,
        );
        if (emailAlreadyInUse) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userID = crypto.randomUUID();

        const pass_hash = await bcrypt.hash(createUserParams.password, 10);
        const user = {
            ...createUserParams,
            id: userID,
            pass_hash,
        };

        const createUserRepository = new PostgresCreateUserRepository();
        const createdUser = await createUserRepository.handler(user);
        return createdUser;
    }
}
