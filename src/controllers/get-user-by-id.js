import {
    checkIfIdIsValid,
    invalidUserId,
    ok,
    internalServerError,
    userNotFound,
} from './helpers/index.js';
export class GetUserByIdController {
    constructor(getUserByIdService) {
        this.getUserByIdService = getUserByIdService;
    }

    async handler(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(httpRequest.params.userId);
            if (!idIsValid) {
                return invalidUserId();
            }

            const user = await this.getUserByIdService.handler(
                httpRequest.params.userId,
            );
            if (!user) {
                return userNotFound();
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
