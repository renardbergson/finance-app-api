import { GetUserByIdService } from '../services/index.js';
import {
    checkIfIdIsValid,
    invalidUserId,
    ok,
    internalServerError,
    notFound,
} from './helpers/index.js';

export class GetUserByIdController {
    async handler(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(httpRequest.params.userId);
            if (!idIsValid) {
                return invalidUserId();
            }

            const getUserByIdService = new GetUserByIdService();
            const user = await getUserByIdService.handler(
                httpRequest.params.userId,
            );
            if (!user) {
                return notFound({
                    message: 'User not found',
                });
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
