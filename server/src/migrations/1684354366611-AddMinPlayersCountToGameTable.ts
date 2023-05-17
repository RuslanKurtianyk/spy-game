import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMinPlayersCountToGameTable1684354366611
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE games ADD COLUMN players_min_count INT DEFAULT 3;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE games DROP COLUMN players_min_count;`);
  }
}
