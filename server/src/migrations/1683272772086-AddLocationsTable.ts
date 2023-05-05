import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocationsTable1683272772086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE locations (
            id VARCHAR(40) DEFAULT uuid(),
            name VARCHAR(80) NOT NULL
        );`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `DROP TABLE locations;`,
    )
  }
}
