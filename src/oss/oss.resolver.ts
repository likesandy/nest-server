import { Query, Resolver } from '@nestjs/graphql';
import { OssService } from './oss.service';
import { OssType } from './dto/oss.type';

@Resolver(() => OssType)
export class OssResolver {
  constructor(private readonly ossService: OssService) {}

  @Query(() => OssType, { description: '获取OSS相关信息' })
  async getOssInfo(): Promise<OssType> {
    return await this.ossService.getOssInfo();
  }
}
