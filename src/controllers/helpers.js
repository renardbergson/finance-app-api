export function badRequest(body) {
    return {
        statusCode: 400,
        body,
    };
}

export function created(body) {
    return {
        statusCode: 201,
        body,
    };
}

export function ok(body) {
    return {
        statusCode: 200,
        body,
    };
}

export function internalServerError() {
  return {
    statusCode: 500,
    message: 'Internal Server Error',
  };
}
