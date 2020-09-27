import { isPast } from 'date-fns';
import validator from 'validator';
import ValidateInterface from './interface/Validate';

class Validate implements ValidateInterface {
  isPastDate(date: Date | number): boolean {
    return isPast(date);
  }

  isUUID(uuid: string): boolean {
    return validator.isUUID(uuid);
  }

  isMACAddress(macaddress: string): boolean {
    return validator.isMACAddress(macaddress);
  }
}

export default new Validate();
