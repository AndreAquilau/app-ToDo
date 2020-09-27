export default interface Task<whenType> {
  id?: string;

  macaddress: string;

  type: number;

  title: string;

  description: string;

  when: whenType;

  done: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
