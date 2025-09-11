import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';

export class CreateUserService {
  async handler(createUserParams) {
    // TODO: verificar se o e-mail já foi cadastrado
    // ...
    // gerar ID do usuário
    const userID = crypto.randomUUID();
    // gerar pass_hash
    const pass_hash = await bcrypt.hash(createUserParams.password, 10);
    // enviar dados para o repositório inserir no banco
    const user = {
      ...createUserParams,
      id: userID,
      pass_hash,
    };

    const createUserRepository = new PostgresCreateUserRepository();
    const createdUser = await createUserRepository.handler(user);
    return createdUser;
  }
}
