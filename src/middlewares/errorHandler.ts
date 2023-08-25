/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status: number;
    type: string;
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Page Not Found - ${req.originalUrl}`);
    res.status(404).json({ success: false, message: error.message, type: 'Server' });
};

export const globalErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);

    const message = err.message || '500 Internal Server Error';
    const status = err.status || 500;
    const type = err.type || 'Server';

    res.status(status).json({ success: false, message, type });
};
