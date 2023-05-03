import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGameEntity1683061299237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE games (
                id VARCHAR(40) DEFAULT uuid(),
                name VARCHAR(80) NOT NULL,
                players JSON
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE games;`,
        )
    }

}
