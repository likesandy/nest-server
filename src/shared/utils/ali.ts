import * as OpenApi from '@alicloud/openapi-client';
import * as Dysmsap from '@alicloud/dysmsapi20170525';
import * as OSS from 'ali-oss';
import * as dotenv from 'dotenv';

dotenv.config();
const config = new OpenApi.Config({
  accessKeyId: process.env.ACCESS_KEY,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  endpoint: `dysmsapi.aliyuncs.com`,
});
export const authClient = new Dysmsap.default(config);

export const ossConfig = {
  region: 'oss-cn-chengdu',
  accessKeyId: process.env.ACCESS_KEY,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  bucket: 'nest-server',
};

export const ossClient = new OSS(ossConfig);
