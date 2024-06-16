import * as Dysmsap from '@alicloud/dysmsapi20170525';
import * as Util from '@alicloud/tea-util';
import { Injectable } from '@nestjs/common';
import { getRandomCode } from 'src/shared/utils';
import { authClient } from 'src/shared/utils/ali';

@Injectable()
export class AuthService {
  // 发送验证码
  sendSmsRequest(tel: string) {
    const code = getRandomCode();
    return new Dysmsap.SendSmsRequest({
      signName: '罐头',
      templateCode: 'SMS_468405402',
      phoneNumbers: tel,
      templateParam: `{\"code\":\"${code}\"}`,
    });
  }

  async sendCodeMsg(tel: string) {
    // 不知道是啥，反正配置让加
    const runtime = new Util.RuntimeOptions({});

    try {
      // 获取验证码
      const result = await authClient.sendSmsWithOptions(
        this.sendSmsRequest(tel),
        runtime,
      );
      if (result) {
        return {
          code: 200,
          message: '获取验证码成功',
        };
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
