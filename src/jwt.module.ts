import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'topsecret',
      signOptions: {
        expiresIn: 60 * 40,
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtExportModule {}
