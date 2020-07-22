import { Model } from 'mongoose';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signup(user: User): Promise<User> {
    const userExist = await this.userModel.findOne({ email: user.email });
    if (userExist) {
      throw new ConflictException('User Already Exists !!!');
    } else {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    }
  }

  async login(user: User): Promise<any> {
    const userExist = await this.userModel.findOne({ email: user.email });
    if (!userExist) {
      throw new NotFoundException('User Not Found !!!');
    } else {
      if (
        userExist.email === user.email &&
        userExist.password === user.password
      ) {
        return userExist;
      } else {
        throw new UnauthorizedException('Email Or Password Is Wrong !!!');
      }
    }
  }
}
