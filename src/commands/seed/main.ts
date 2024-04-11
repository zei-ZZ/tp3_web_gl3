import { CvEntity } from '../../cvs/entities/cv.entity';
import { DataSource } from 'typeorm';
import { Generator } from './services/generator.servcie';
import { UserEntity } from '../../auth/entities/user.entity';
import { SkillEntity } from '../../skills/entities/skill.entity';

async function bootstrap() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity, SkillEntity, CvEntity],
    synchronize: true,
  });

  await dataSource.initialize();

  const cvRepository = dataSource.getRepository(CvEntity);

  const generator = new Generator();
  const cvsCount = 6;

  const cvs = await generator.genCvs(cvsCount);

  cvRepository.save(cvs);

  await dataSource.destroy();
}
bootstrap();
