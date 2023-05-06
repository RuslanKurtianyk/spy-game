import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminColumnToGameTable1683359357316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE games ADD COLUMN admin VARCHAR(40);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE games DROP COLUMN admin;`);
  }
}
