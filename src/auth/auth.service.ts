import * as Dysmsap from '@alicloud/dysmsapi20170525';
import * as Util from '@alicloud/tea-util';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import {
  ACCOUNT_NOT_EXIST,
  CODE_NOT_EXIST,
  CODE_NOT_EXPIRE,
  CODE_SEND_ERROR,
  SUCCESS,
  UPDATE_ERROR,
} from 'common/constants/code';
import { getRandomCode } from 'shared/utils';
import { authClient } from 'shared/utils/ali';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  // 发送验证码
  async sendCodeMsg(tel: string) {
    // 不知道是啥，反正配置让加
    const runtime = new Util.RuntimeOptions({});

    const user = await this.userService.findByTel(tel);
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 60 * 1000) {
        return {
          code: CODE_NOT_EXPIRE,
          message: '验证码还没有过期',
        };
      }
    }

    const code = getRandomCode();
    const sendSmsRequest = new Dysmsap.SendSmsRequest({
      signName: '罐头',
      templateCode: 'SMS_468405402',
      phoneNumbers: tel,
      templateParam: `{\"code\":\"${code}\"}`,
    });

    try {
      // 获取验证码
      const sendRes = await authClient.sendSmsWithOptions(
        sendSmsRequest,
        runtime,
      );
      if (sendRes.body.code !== 'OK') {
        return {
          code: CODE_SEND_ERROR,
          message: sendRes.body.message,
        };
      }
      if (user) {
        const result = this.userService.update(user.id, {
          code,
          codeCreateTimeAt: new Date(),
        });
        if (result) {
          return {
            code: SUCCESS,
            message: '获取验证码成功',
          };
        }
        return {
          code: UPDATE_ERROR,
          message: '更新 code 失败',
        };
      }
      const result = await this.userService.create({
        tel,
        code,
        codeCreateTimeAt: new Date(),
      });
      if (result) {
        return {
          code: SUCCESS,
          message: '获取验证码成功',
        };
      }
      return {
        code: UPDATE_ERROR,
        message: '新建账号失败',
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  authUser(user: User, code: string) {
    if (!user) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    }
    if (!user.codeCreateTimeAt || !user.code) {
      return {
        code: CODE_NOT_EXIST,
        message: '验证码不存在',
      };
    }
    if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000) {
      return {
        code: CODE_NOT_EXPIRE,
        message: '验证码过期',
      };
    }
    if (user.code !== code) {
      return {
        code: 400,
        message: '验证码错误',
      };
    }
    if (user.code === code) {
      return {
        code: SUCCESS,
        message: '登录成功',
      };
    }
  }

  async login(tel: string, code: string) {
    const user = await this.userService.findByTel(tel);
    return this.authUser(user, code);
  }
}
