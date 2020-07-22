import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PostInterface } from './interfaces/post.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private postModel: Model<PostInterface>) {}

  async create(post: PostInterface): Promise<string> {
    const createdPost = new this.postModel(post);
    await createdPost.save();
    return createdPost;
  }

  async findAll(): Promise<PostInterface[]> {
    return await this.postModel
      .find()
      .sort({ created_at: 'desc' })
      .populate('userId')
      .exec();
  }

  async findOne(id: string): Promise<PostInterface> {
    return await this.postModel
      .findById(id)
      .populate('userId')
      .exec();
  }

  async update(id: string, post: PostInterface): Promise<string> {
    await this.postModel.findByIdAndUpdate(id, { ...post });
    return `Post Updated !!! ${id} : ${post.title}`;
  }

  async remove(id: string): Promise<string> {
    await this.postModel.findByIdAndRemove(id);
    return `Post Deleted !!! ${id}`;
  }
}
