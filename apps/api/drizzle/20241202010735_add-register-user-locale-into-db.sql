CREATE TYPE "public"."locale" AS ENUM('en-US', 'pt-BR', 'es-ES');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "locale" "locale" DEFAULT 'en-US' NOT NULL;--> statement-breakpoint
ALTER TABLE "pre_registers" ADD COLUMN "locale" "locale" DEFAULT 'en-US' NOT NULL;