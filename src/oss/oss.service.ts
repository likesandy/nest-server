import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ossClient, ossConfig } from 'src/shared/utils/ali';
import { OssType } from './dto/oss.type';
import * as dayjs from 'dayjs';

@Injectable()
export class OssService {
  private formData: OSS.PostObjectParams;

  async getFormData() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
      ],
      expiration: date.toISOString(), // 请求有效期
    };
    this.formData = ossClient.calculatePostSignature(policy);
  }
  async getOssInfo(): Promise<OssType> {
    this.getFormData();
    const host = `http://${ossConfig.bucket}.${
      (await ossClient.getBucketLocation(ossConfig.bucket)).location
    }.aliyuncs.com`.toString();

    return {
      expire: dayjs().add(1, 'days').unix().toString(),
      policy: this.formData.policy,
      signature: this.formData.Signature,
      accessId: this.formData.OSSAccessKeyId,
      host,
      dir: 'images/',
    };
  }
}
