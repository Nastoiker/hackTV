import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus, UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('updateAvatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@UploadedFile(
      new ParseFilePipeBuilder()
          .addFileTypeValidator({
            fileType: 'webp, jpg',
          })
          .addMaxSizeValidator({ maxSize: 5242880 })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
          }),
  ) mp4: Express.Multer.File) {
    return this.userService.updateAvatar();
  }
  @Get()
  findAll() {
    return this.userService.users({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.user({id});
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ where: {id}, data: updateUserDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({id});
  }
}
