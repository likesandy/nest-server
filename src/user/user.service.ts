import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  // 新增一个用户
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  // 删除一个用户
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  // 更新一个用户
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    console.log('🚀 ~ UserService ~ update ~ entity:', entity);
    const res = await this.UserRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  // 查询一个用户
  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  // 查询一个用户 通过手机号
  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        tel,
      },
    });
    return res;
  }

  // 更新一个用户的验证码
  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreateTimeAt: new Date(),
    });
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
