import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreation1727248549093 implements MigrationInterface {
    name = 'InitialCreation1727248549093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`active\` tinyint NOT NULL, \`image\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`read\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`commentableId\` int NOT NULL, \`commentableType\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_posts\` (\`category\` int NOT NULL, \`post\` int NOT NULL, INDEX \`IDX_cb9726eb8a3f6e49204b6b8100\` (\`category\`), INDEX \`IDX_57a4615dd5324921dd3edad717\` (\`post\`), PRIMARY KEY (\`category\`, \`post\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_e7e34fa8e409e9146f4729fd0cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_posts\` ADD CONSTRAINT \`FK_cb9726eb8a3f6e49204b6b81004\` FOREIGN KEY (\`category\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_posts\` ADD CONSTRAINT \`FK_57a4615dd5324921dd3edad717f\` FOREIGN KEY (\`post\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_posts\` DROP FOREIGN KEY \`FK_57a4615dd5324921dd3edad717f\``);
        await queryRunner.query(`ALTER TABLE \`category_posts\` DROP FOREIGN KEY \`FK_cb9726eb8a3f6e49204b6b81004\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_e7e34fa8e409e9146f4729fd0cb\``);
        await queryRunner.query(`DROP INDEX \`IDX_57a4615dd5324921dd3edad717\` ON \`category_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb9726eb8a3f6e49204b6b8100\` ON \`category_posts\``);
        await queryRunner.query(`DROP TABLE \`category_posts\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
    }

}
