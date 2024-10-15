-- AlterTable
CREATE SEQUENCE gamerole_id_seq;
ALTER TABLE "GameRole" ALTER COLUMN "id" SET DEFAULT nextval('gamerole_id_seq');
ALTER SEQUENCE gamerole_id_seq OWNED BY "GameRole"."id";
