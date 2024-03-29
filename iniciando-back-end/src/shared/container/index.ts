import {container} from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
