import validator from 'validator';

import { GetUserByIdService } from '../services/get-user-by-id.js';
import { badRequest, ok, internalServerError, notFound } from './helpers.js';

export class GetUserByIdController {
    async handler(httpRequest) {
        try {
            const isValidUUID = validator.isUUID(httpRequest.params.userId);
            if (!isValidUUID) {
                return badRequest({
                    message: 'The user ID format is not valid',
                });
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
