export class GetUserByIdService {
    constructor(getUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async handler(userID) {
        const user = await this.getUserByIdRepository.handler(userID);
        return user;
    }
}
