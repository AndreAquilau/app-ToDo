import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVWTask1601189191008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE VIEW VW_task
        as(
          select
	          id,
	          macaddress,
	          type,
	          title,
          	description,
          	done,
          	CAST("when" AS TEXT) AS "when",
          	"created_At",
          	"updated_At"
            from task
          )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP VIEW VW_task
    `);
  }
}
