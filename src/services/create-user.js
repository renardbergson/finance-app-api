import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/user.js';
export class CreateUserService {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
    }

    async handler(createUserParams) {
        const emailAlreadyInUse = await this.getUserByEmailRepository.handler(
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

        const createdUser = await this.createUserRepository.handler(user);
        return createdUser;
    }
}
