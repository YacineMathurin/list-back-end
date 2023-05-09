import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { customWinstomLogger } from 'src/utils/custom-winstom-logger';
import { Logger } from 'winston';

@Injectable()
export class MoviesMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}
  use(request: Request, response: Response, next: () => void) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      customWinstomLogger(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        this.logger,
      );
    });

    next();
  }
}
