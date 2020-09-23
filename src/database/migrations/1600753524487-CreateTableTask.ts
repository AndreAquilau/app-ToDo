import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableTask1600753524487 implements MigrationInterface {
    name = 'CreateTableTask1600753524487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "macaddress" character varying(255) NOT NULL, "type" integer NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "when" TIMESTAMP NOT NULL, "done" boolean DEFAULT false, "created_At" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_At" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_task" ON "task" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pkey_task"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
