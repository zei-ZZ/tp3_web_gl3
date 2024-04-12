import { NestFactory } from '@nestjs/core';
import { CvEntity } from '../../cvs/entities/cv.entity';
import { Generator } from './services/generator.servcie';
import { AppModule } from '../../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const generator = new Generator();

  const maxCvsPerUser = 3;
  const maxUsers = 6;
  const maxSkills = 6;
  const maxSkillsPerCv = 3;

  const generatedCvs = await generator.genCvsWithReuse(
    maxCvsPerUser,
    maxUsers,
    maxSkills,
    maxSkillsPerCv,
  );

  const cvsRepository = app.get(getRepositoryToken(CvEntity));

  const cvs = await cvsRepository.save(generatedCvs);
  console.log(cvs);

  await app.close();
}
bootstrap();
