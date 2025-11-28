import validator from 'validator';

import { CreateUserService } from '../services/create-user.js';
import { badRequest, created, internalServerError } from './helpers.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class CreateUserController {
    async handler(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];
            for (const field of requiredFields) {
                if (
                    !params[field] ||
                    (typeof params[field] === 'string' &&
                        params[field].trim() === '')
                ) {
                    return badRequest({
                        message: `Missing required field: ${field}`,
                    });
                }
            }

            const passwordIsValid = params.password.length >= 8;
            if (!passwordIsValid) {
                return badRequest({
                    message: 'Password must be at least 8 characters long',
                });
            }

            const emailIsValid = validator.isEmail(params.email);
            if (!emailIsValid) {
                return badRequest({
                    message:
                        'Invalid email. Please provide a valid email address.',
                });
            }

            const createUserService = new CreateUserService();
            const createdUser = await createUserService.handler(params);

            return created({
                message: 'User created successfully',
                user: createdUser,
            });
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                });
            }

            // TODO: Adicionar mais tipos de erros para tratamento específico

            console.error(error);
            return internalServerError();
        }
    }
}
