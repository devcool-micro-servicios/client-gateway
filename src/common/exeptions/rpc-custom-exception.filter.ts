import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      response.status(rpcError.status).json({
        statusCode: rpcError.status,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
        message: rpcError.message,
      });
      return throwError(() => exception);
    }

    response.status(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
      rpcError,
    );

    return throwError(() => exception);
  }
}
