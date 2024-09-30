import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedChatRoomJoinColumn1727509120947 implements MigrationInterface {
    name = 'AddedChatRoomJoinColumn1727509120947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD UNIQUE INDEX \`IDX_e5e156f315f06303c004402b8c\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e5e156f315f06303c004402b8c\` ON \`chat_room\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD CONSTRAINT \`FK_e5e156f315f06303c004402b8cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP FOREIGN KEY \`FK_e5e156f315f06303c004402b8cb\``);
        await queryRunner.query(`DROP INDEX \`REL_e5e156f315f06303c004402b8c\` ON \`chat_room\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP INDEX \`IDX_e5e156f315f06303c004402b8c\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP COLUMN \`userId\``);
    }

}
