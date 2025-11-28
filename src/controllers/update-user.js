import validator from 'validator';
import { badRequest, internalServerError, ok } from './helpers.js';
import { UpdateUserService } from '../services/update-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class UpdateUserController {
    async handler(httpRequest) {
        try {
            // verificar ID
            const userId = httpRequest.params.userId;
            const isValidUUID = validator.isUUID(userId);
            if (!isValidUUID) {
                return badRequest({ message: 'The user ID is not valid' });
            }

            // verificar campos permitidos
            const updateUserParams = httpRequest.body;
            const allowedFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];
            for (const field in updateUserParams) {
                if (!allowedFields.includes(field)) {
                    return badRequest({
                        message: `The field '${field}' is not allowed`,
                    });
                }
            }

            // verificar campos vazios
            for (const field in updateUserParams) {
                const value = updateUserParams[field];
                if (
                    !value ||
                    (typeof value === 'string' && value.trim() === '')
                ) {
                    return badRequest({
                        message: `The field '${field}' is empty`,
                    });
                }
            }

            // verificar senha
            if (updateUserParams.password) {
                const passwordIsValid = updateUserParams.password.length >= 8;
                if (!passwordIsValid) {
                    return badRequest({
                        message: 'Password must be at least 8 characters long',
                    });
                }
            }

            // verificar e-mail
            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email);
                if (!emailIsValid) {
                    return badRequest({
                        message:
                            'Invalid email. Please provide a valid email address.',
                    });
                }
            }

            // chamar service
            const updateUserService = new UpdateUserService();
            const updatedUser = await updateUserService.handler(
                userId,
                updateUserParams,
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                });
            }

            console.error(error);
            return internalServerError();
        }
    }
}
