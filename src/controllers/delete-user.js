import {
    internalServerError,
    checkIfIdIsValid,
    invalidUserId,
    userNotFound,
    ok,
} from './helpers/index.js';
import { DeleteUserService } from '../services/index.js';

export class DeleteUserController {
    async handler(httpRequest) {
        try {
            const id = httpRequest.params.userId;
            const idIsValid = checkIfIdIsValid(id);
            if (!idIsValid) {
                return invalidUserId();
            }

            const deleteUserService = new DeleteUserService();
            const deletedUser = await deleteUserService.handler(id);
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
