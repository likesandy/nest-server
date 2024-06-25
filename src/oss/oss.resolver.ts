import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { OssType } from './dto/oss.type';
import { OssService } from './oss.service';
import { GQLAuthGuard } from '@/guards/auth.guard';

@Resolver(() => OssType)
@UseGuards(GQLAuthGuard)
export class OssResolver {
  constructor(private readonly ossService: OssService) {}

  @Query(() => OssType, { description: '获取OSS相关信息' })
  async getOssInfo(): Promise<OssType> {
    return await this.ossService.getOssInfo();
  }
}
