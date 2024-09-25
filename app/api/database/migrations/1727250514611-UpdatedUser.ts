import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUser1727250514611 implements MigrationInterface {
    name = 'UpdatedUser1727250514611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`picture\` \`picture\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`active\` \`active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`active\` \`active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`picture\` \`picture\` varchar(255) NOT NULL`);
    }

}
