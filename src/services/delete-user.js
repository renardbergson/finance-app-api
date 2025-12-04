export class DeleteUserService {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository;
    }

    async handler(userID) {
        const deletedUser = await this.deleteUserRepository.handler(userID);
        return deletedUser;
    }
}
