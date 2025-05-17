export function sendJson(res, response) {
    const { status, ...rest } = response;
    return res.status(status).json(rest);
}
