import { Module } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssResolver } from './oss.resolver';

@Module({
  providers: [OssResolver, OssService],
})
export class OssModule {}
