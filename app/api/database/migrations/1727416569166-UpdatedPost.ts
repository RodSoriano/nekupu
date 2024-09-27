import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedPost1727416569166 implements MigrationInterface {
    name = 'UpdatedPost1727416569166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`active\` \`active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`image\` \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`active\` \`active\` tinyint NOT NULL`);
    }

}
