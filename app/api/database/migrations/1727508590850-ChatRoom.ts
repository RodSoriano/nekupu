import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatRoom1727508590850 implements MigrationInterface {
    name = 'ChatRoom1727508590850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`chatRoomId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_room\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_f3cc0ca0c4b191410f1e0ab5d21\` FOREIGN KEY (\`chatRoomId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_f3cc0ca0c4b191410f1e0ab5d21\``);
        await queryRunner.query(`DROP TABLE \`chat_room\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
