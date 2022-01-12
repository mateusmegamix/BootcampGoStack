import {startOfHour} from 'date-fns';
import {injectable, inject} from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment';

import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepositoy from '../repositories/IAppointmentsRepository';

// SOLID

// # Single Responsability Principle
// # Open Closed Principle
// # Liskov Substitution Principle
// # Interface Segregation Principle
// # Dependency Invertion Principle

interface IRequest {
  provider_id: string,
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositoy
  ) {}

  public async execute({date, provider_id}: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
