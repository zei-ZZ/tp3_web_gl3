import {
  rand,
  randEmail,
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
  randUuid,
} from '@ngneat/falso';
import { Role, UserEntity } from '../../../auth/entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { SkillEntity } from '../../../skills/entities/skill.entity';
import { CvEntity } from '../../../cvs/entities/cv.entity';

export class Generator {
  async genUser(): Promise<UserEntity> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);

    const user: UserEntity = {
      id: randUuid(),
      username: randUserName(),
      email: randEmail(),
      password: await hash(randPassword(), salt),
      salt,
      role: rand([Role.Admin, Role.Client]),
      cvs: null,
    };

    return user;
  }

  async genUsers(count = 1): Promise<UserEntity[]> {
    const users: UserEntity[] = [];

    for (let i = 0; i < count; i++) {
      users.push(await this.genUser());
    }

    return users;
  }

  genSkill(): SkillEntity {
    const skill: SkillEntity = {
      id: randUuid(),
      desigantion: randSkill(),
      cvs: null,
    };

    return skill;
  }

  genSkills(count = 1): SkillEntity[] {
    const skills: SkillEntity[] = [];

    for (let i = 0; i < count; i++) {
      skills.push(this.genSkill());
    }

    return skills;
  }

  async genCv(): Promise<CvEntity> {
    const ageMin = 18;
    const ageMax = 42;

    const skillsMax = 3;

    const cinPartialMax = 9999999;

    const cv: CvEntity = {
      id: randUuid(),
      firstname: randFirstName(),
      name: randLastName(),
      age: randNumber({ min: ageMin, max: ageMax }),
      cin: rand([0, 1]) + '' + randNumber({ max: cinPartialMax }),
      job: randJobTitle(),
      path: randFilePath(),
      skills: this.genSkills(randNumber({ max: skillsMax })),
      user: await this.genUser(),
    };

    return cv;
  }

  async genCvs(count = 1): Promise<CvEntity[]> {
    const cvs: CvEntity[] = [];

    for (let i = 0; i < count; i++) {
      cvs.push(await this.genCv());
    }

    return cvs;
  }
}
