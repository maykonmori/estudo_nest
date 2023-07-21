import { Injectable } from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const sal0tRounds = 10;
    const hashedPassword = await hash(createUserDto.password, sal0tRounds);

    return this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
