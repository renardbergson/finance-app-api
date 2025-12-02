import { UpdateUserService } from '../services/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
    invalidPassword,
    invalidEmail,
    invalidUserId,
    checkIfPasswordIsValid,
    checkIfIdIsValid,
    checkIfEmailIsValid,
    badRequest,
    internalServerError,
    ok,
} from './helpers/index.js';

export class UpdateUserController {
    async handler(httpRequest) {
        try {
            // verificar ID
            const userId = httpRequest.params.userId;
            const idIsValid = checkIfIdIsValid(userId);
            if (!idIsValid) {
                return invalidUserId();
            }

            // verificar campos permitidos
            const params = httpRequest.body;
            const allowedFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];
            for (const field in params) {
                if (!allowedFields.includes(field)) {
                    return badRequest({
                        message: `The field '${field}' is not allowed`,
                    });
                }
            }

            // verificar campos vazios
            for (const field in params) {
                const value = params[field];
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
            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password);
                if (!passwordIsValid) {
                    return invalidPassword();
                }
            }

            // verificar e-mail
            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email);
                if (!emailIsValid) {
                    return invalidEmail();
                }
            }

            // chamar service
            const updateUserService = new UpdateUserService();
            const updatedUser = await updateUserService.handler(userId, params);

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
