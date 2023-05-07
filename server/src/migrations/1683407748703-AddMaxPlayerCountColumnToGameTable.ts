import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMaxPlayerCountColumnToGameTable1683407748703
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE games ADD COLUMN players_max_count INT DEFAULT 10;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE games DROP COLUMN players_max_count;`);
  }
}
