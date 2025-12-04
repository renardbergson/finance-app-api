import { EmailAlreadyInUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';

export class UpdateUserService {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }

    async handler(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithSameEmail =
                await this.getUserByEmailRepository.handler(
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

        const updatedUser = await this.updateUserRepository.handler(
            userId,
            user,
        );
        return updatedUser;
    }
}
