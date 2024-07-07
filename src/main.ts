import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoreConfigService } from './core/config/core.config.service';
import { Logger, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import { BadRequestMTIException } from './core/errorhandling/exceptions/bad-request.mti-exception';
import { MTIErrorCodes } from './core/errorhandling/exceptions/mti.error-codes.enum';

const DEFAULT_VERSION = '1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<CoreConfigService>(CoreConfigService);

    // app.useLogger(await app.resolve(CoreLogger));
    app.setGlobalPrefix(config.globalPrefix);
    app.enableVersioning({
        defaultVersion: DEFAULT_VERSION,
        type: VersioningType.URI,
    });

    // Global Validation (inbound)
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                Logger.error(JSON.stringify(validationErrors));
                return new BadRequestMTIException(
                    MTIErrorCodes.GENERIC_VALIDATION_ERROR,
                    validationErrors,
                );
            },
            forbidNonWhitelisted: true,
            whitelist: true,
            skipMissingProperties: false,
            transformOptions: {
                enableImplicitConversion: true,
                exposeDefaultValues: true,
            },
            transform: true,
            enableDebugMessages: config.processEnv === 'development',
        }),
    );

    // shutdown hooks to trigger actions on application shutdown
    app.enableShutdownHooks();

    Logger.log(`Starting application in ${config.processEnv} mode`);
    await app.listen(config.httpsPort);
    Logger.log(
        `🚀 Application is running on: http://localhost:${config.httpsPort}/${config.globalPrefix}`,
    );
}
bootstrap();
