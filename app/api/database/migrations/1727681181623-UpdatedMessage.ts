import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedMessage1727681181623 implements MigrationInterface {
    name = 'UpdatedMessage1727681181623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_f3cc0ca0c4b191410f1e0ab5d21\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP FOREIGN KEY \`FK_e5e156f315f06303c004402b8cb\``);
        await queryRunner.query(`DROP INDEX \`IDX_e5e156f315f06303c004402b8c\` ON \`chat_room\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_f3cc0ca0c4b191410f1e0ab5d21\` FOREIGN KEY (\`chatRoomId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD CONSTRAINT \`FK_e5e156f315f06303c004402b8cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP FOREIGN KEY \`FK_e5e156f315f06303c004402b8cb\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_f3cc0ca0c4b191410f1e0ab5d21\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e5e156f315f06303c004402b8c\` ON \`chat_room\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD CONSTRAINT \`FK_e5e156f315f06303c004402b8cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_f3cc0ca0c4b191410f1e0ab5d21\` FOREIGN KEY (\`chatRoomId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
