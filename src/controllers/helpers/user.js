import { badRequest } from './http.js';
import validator from 'validator';

export const checkIfIdIsValid = (id) => validator.isUUID(id);
export const checkIfPasswordIsValid = (password) => password.length >= 8;
export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const invalidUserId = () =>
    badRequest({
        message: 'Invalid user ID. Please provide a valid one.',
    });
export const invalidPassword = () =>
    badRequest({
        message: 'Password must be at least 8 characters long',
    });
export const invalidEmail = () =>
    badRequest({
        message: 'Invalid email. Please provide a valid email address.',
    });
