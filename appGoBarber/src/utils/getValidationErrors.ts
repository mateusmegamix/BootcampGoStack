import * as Yup from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: Yup.ValidationError): Errors {
    const validationErrors: Errors = {};

    err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}