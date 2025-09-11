import { CreateUserService } from '../services/create-user.js';
import validator from 'validator';

export class CreateUserController {
  async handler(httpRequest) {
    try {
      const params = httpRequest.body;

      // validate request (required fields, fields length, valid email)
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      for (const field of requiredFields) {
        if (!params[field] || params[field].trim() === '') {
          return {
            statusCode: 400,
            body: { message: `Missing required field: ${field}` },
          };
        }
      }

      const passwordIsValid = params.password.length >= 8;
      if (!passwordIsValid) {
        return {
          statusCode: 400,
          body: { message: 'Password must be at least 8 characters long' },
        };
      }

      const emailIsValid = validator.isEmail(params.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: {
            message:
              'Invalid email format. Please provide a valid email address.',
          },
        };
      }

      // call service
      const createUserService = new CreateUserService();
      const createdUser = await createUserService.handler(params);

      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      };
    }
  }
}
