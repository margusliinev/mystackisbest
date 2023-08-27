export interface JwtPayload {
    sub: string;
}

export interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
    };
    cookies: {
        token: string;
    };
}
