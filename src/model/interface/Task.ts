export default interface Task {
  id?: string;

  macaddress: string;

  type: number;

  title: string;

  description: string;

  when: Date;

  done: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
