import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusColumnToGame1683237467547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE games
          ADD COLUMN status VARCHAR(40) DEFAULT 'New';`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE games DROP COLUMN status;`,
      );
  }
}
