import { MigrationInterface, QueryRunner } from "typeorm";

export class imageTable1658418140505 implements MigrationInterface {
  name = "imageTable1658418140505";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "originalUrl" character varying NOT NULL, "compressedUrl" character varying NOT NULL, "size" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
