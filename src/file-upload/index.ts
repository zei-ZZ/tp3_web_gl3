import { UnprocessableEntityException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 } from 'uuid';

export const maxImageSize = 1000000;

export function editFileName(
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void {
  const uuid = v4();
  const extension = file.originalname.split('.').pop();

  const newFilename = `${uuid}.${extension}`;

  callback(null, newFilename);
}

export function imageFileFilter(
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new UnprocessableEntityException(
        'Only jpeg, jpg or png images are allowed!',
      ),
      false,
    );
  }

  callback(null, true);
}

export const fileUploadOptions: MulterOptions = {
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public', 'uploads'),
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: maxImageSize,
  },
};
