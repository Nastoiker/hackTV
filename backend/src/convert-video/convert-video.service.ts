import { Injectable } from '@nestjs/common';
import { CreateConvertVideoDto } from './dto/create-convert-video.dto';
import { UpdateConvertVideoDto } from './dto/update-convert-video.dto';

@Injectable()
export class ConvertVideoService {
  create(createConvertVideoDto: CreateConvertVideoDto) {
    return 'This action adds a new convertVideo';
  }

  findAll() {
    return `This action returns all convertVideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} convertVideo`;
  }

  update(id: number, updateConvertVideoDto: UpdateConvertVideoDto) {
    return `This action updates a #${id} convertVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} convertVideo`;
  }
}
