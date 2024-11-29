CREATE TYPE "public"."continent" AS ENUM('AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "continent" "continent" DEFAULT 'NA' NOT NULL;