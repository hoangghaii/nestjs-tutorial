import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { editFileName, imageFileFilter } from './upload.utils';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadMultipleFile(@UploadedFile() files: Array<Express.Multer.File>) {
    const response = [];
    // files.forEach((file) => {
    //   const fileResponse = {
    //     originalname: file.originalname,
    //     filename: file.filename,
    //   };
    //   response.push(fileResponse);
    // });
    console.log(files);
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: './files' });
  }
}
