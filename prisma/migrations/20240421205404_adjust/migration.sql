/*
  Warnings:

  - You are about to drop the `_ProfessionalToScheduling` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profissional` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ProfessionalToScheduling_B_index";

-- DropIndex
DROP INDEX "_ProfessionalToScheduling_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProfessionalToScheduling";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scheduling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profissional" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL
);
INSERT INTO "new_Scheduling" ("client", "date", "hour", "id", "type") SELECT "client", "date", "hour", "id", "type" FROM "Scheduling";
DROP TABLE "Scheduling";
ALTER TABLE "new_Scheduling" RENAME TO "Scheduling";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
