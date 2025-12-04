import {
    internalServerError,
    checkIfIdIsValid,
    invalidUserId,
    userNotFound,
    ok,
} from './helpers/index.js';
export class DeleteUserController {
    constructor(deleteUserService) {
        this.deleteUserService = deleteUserService;
    }

    async handler(httpRequest) {
        try {
            const id = httpRequest.params.userId;
            const idIsValid = checkIfIdIsValid(id);
            if (!idIsValid) {
                return invalidUserId();
            }

            const deletedUser = await this.deleteUserService.handler(id);
            if (!deletedUser) {
                return userNotFound();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
