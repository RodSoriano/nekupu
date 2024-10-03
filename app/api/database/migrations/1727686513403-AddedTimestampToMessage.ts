import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTimestampToMessage1727686513403 implements MigrationInterface {
    name = 'AddedTimestampToMessage1727686513403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP FOREIGN KEY \`FK_e5e156f315f06303c004402b8cb\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`timestamp\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD CONSTRAINT \`FK_e5e156f315f06303c004402b8cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP FOREIGN KEY \`FK_e5e156f315f06303c004402b8cb\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`timestamp\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD CONSTRAINT \`FK_e5e156f315f06303c004402b8cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
