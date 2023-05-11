import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocationColumnToGame1683821127578
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE games
              ADD COLUMN location VARCHAR(40);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE games DROP COLUMN location;`);
  }
}
