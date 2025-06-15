import { type } from "arktype";

export const NewUserArk = type({
    email: 'string.email',
    name: 'string.alpha',
});

export const VerifyUserArk = type({
    email: 'string.email',
    url: 'string.url',
    token: 'string',
});

export const ResetPasswordArk = type({
    email: 'string.email',
    token: 'string',
    url: 'string.url',
});
