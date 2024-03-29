import { hash } from 'bcryptjs';
import {injectable, inject} from 'tsyringe'

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if(checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
