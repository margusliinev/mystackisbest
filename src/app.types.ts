export interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
    };
    cookies: {
        token: string;
    };
}

export interface JwtPayload {
    sub: string;
}
