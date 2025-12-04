import { EmailAlreadyInUseError } from '../errors/user.js';
import {
    invalidPassword,
    invalidEmail,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    badRequest,
    created,
    internalServerError,
} from './helpers/index.js';

export class CreateUserController {
    constructor(createUserService) {
        this.createUserService = createUserService;
    }

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

            const passwordIsValid = checkIfPasswordIsValid(params.password);
            if (!passwordIsValid) {
                return invalidPassword();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);
            if (!emailIsValid) {
                return invalidEmail();
            }

            const createdUser = await this.createUserService.handler(params);

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
