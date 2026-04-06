import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // While a middleware is not aware of the context of the request, that is it does not know which controller or route is being called, 
        // an interceptor is aware of the context of the request, that is it knows which controller or route is being called. Therefore, an interceptor can be used to modify the response of a specific controller or route.
        return next.handle().pipe(
            map(data => ({
                data,
                timestamp: new Date().toISOString(),
            }))
        );
    }
}