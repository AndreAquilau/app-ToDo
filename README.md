## Documentação das Libs Utilizadas no Projeto

### Express
  * helmet
  * morgan
  * body-parser
  * cors
### Typeorm
  * uuidv4
  * reflect-metadata
  * pg
----------------------------------------------------------------------------------
##### @Entity
~~~ts
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Task from './interface/Task';

@Index('pkey_task', ['id'], { unique: true })
@Entity('task')
export default class TaskModel<whenType> implements Task<whenType> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'macaddress', type: 'varchar', length: 255, nullable: false })
  macaddress: string;

  @Column({ name: 'type', type: 'integer', nullable: false })
  type: number;

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @Column({
    name: 'when',
    type: 'timestamp',
    nullable: false,
  })
  when: whenType;

  @Column({
    name: 'done',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  done: boolean;

  @CreateDateColumn({
    name: 'created_At',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_At',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  updatedAt: Date;
}
~~~
-------------------------------------------------------------------------------------------------
##### @ViewEntity
~~~ts
import TaskModel from '@model/TaskModel';
import { Column, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'vw_task' })
export default class VWTask extends TaskModel<string> {
  @Column({
    name: 'when',
    type: 'text',
    nullable: false,
  })
  when: string;
}
~~~
-------------------------------------------------------------------------------------------------
##### @EntityRepository
~~~ts
import TaskModel from '@model/TaskModel';
import { EntityRepository, Like, Repository } from 'typeorm';
import InterfaceTaskRepository from './interface/TaskRepository';
import DateConversion from '../class/DateConversion';

@EntityRepository(TaskModel)
export default class TaskRepository
  extends Repository<TaskModel<Date>>
  implements InterfaceTaskRepository {
  async taskById(id: string): Promise<any> {
    return await this.find({
      where: { id },
      order: {
        when: 'ASC',
      },
    });
  }

  async taskByMacaddress(macaddress: string): Promise<any> {
    return await this.find({
      where: { macaddress },
      order: {
        when: 'ASC',
      },
    });
  }

  async taskUpdateStatus(id: string, done: boolean): Promise<any> {
    return await this.update({ id }, { done });
  }

  async lateTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const dateConversion = new DateConversion();

      console.log(dateConversion.timeStamp(current));

      return await this.query(
        `SELECT * FROM task WHERE "when" < '${dateConversion.timeStamp(
          current,
        )}' and macaddress = '${macaddress}' ORDER BY "when" ASC`,
      );
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  async todayTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const date = new DateConversion().timeStamp(current);
      const [today, times] = date.split('T');
      return await this.find({
        where: { when: Like(`'%${today}%'`), macaddress },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
~~~

### Validator
~~~ts
import validator from 'validator';
~~~
|Método                            |          Retorno          |          Observação             |
|----------------------------------|---------------------------|---------------------------------|
|validator.isUUID(uuid)            |         Boolean           |Valida se é um UUID valido.      |
|validator.isMACAddress(macaddress)|         Boolean           |Valida se é um MACaddress valido.|
### Date-fns
-----------------------------------------------------------------------------------------------
~~~ts
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  endOfYear,
  startOfYear,
  isPast
} from 'date-fns';
~~~
#### Se passa a data atual ira retorna todos os metodos referente ao mês, semana e ano.
|Método          |   Retorno   |              Format                  |   Parametro   |                 Observação                   |
|----------------|-------------|--------------------------------------|---------------|----------------------------------------------|
|startOfWeek     |    Date     |   YYYY-MM-DDTHs:Ms:Ss.Mls            |Date or Number | Retorna o inicio data da semana.             |
|endOfWeek       |    Date     |   YYYY-MM-DDTHs:Ms:Ss.Mls            |Date or Number | Retorna a data do final da semana.           |
|startOfMonth    |    Date     |   YYYY-MM-DDTHs:Ms:Ss.Mls            |Date or Number | Retorna o inicio data da do mês.             |
|endOfMonth      |    Date     |   YYYY-MM-DDTHs:Ms:Ss.Mls            |Date or Number | Retorna o final da data do mês.              |
|endOfYear       |    Date     |   YYYY-MM-DDTHs:Ms:Ss.Mls            |Date or Number | Retorna o inicio da data do ano.             |
|startOfYear     |    Date     |   YYYY-MM-DDTHs:Ms:Ss.Mls            |Date or Number | Retorna o final da data do ano.              |
|isPasss         |   Boolean   |          true - false                |Date or Number | Retorna true caso a data esteja no passado.  |

