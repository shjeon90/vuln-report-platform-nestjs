import { Inject, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const start = Date.now();
        const { method, url } = req;

        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`${method} ${url} ${res.statusCode} - ${duration}ms`);
        });
        next();
    }
}