import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ossClient } from 'src/shared/utils/ali';
import { OssType } from './dto/oss.type';

@Injectable()
export class OssService {
  private formData: OSS.PostObjectParams;

  async getFormData() {
    const policy = {
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
      ],
    };
    this.formData = ossClient.calculatePostSignature(policy);
  }
  getOssInfo(): OssType {
    this.getFormData();
    return {
      policy: this.formData.policy,
      signature: this.formData.Signature,
      accessId: this.formData.OSSAccessKeyId,
    };
  }
}
