/*
  Warnings:

  - You are about to drop the `JobType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfessionalJobType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `jobTypeId` on the `Scheduling` table. All the data in the column will be lost.
  - Added the required column `jobType` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ProfessionalJobType_B_index";

-- DropIndex
DROP INDEX "_ProfessionalJobType_AB_unique";

-- AlterTable
ALTER TABLE "Professional" ADD COLUMN "jobType" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "JobType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProfessionalJobType";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scheduling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professionalId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "jobType" TEXT NOT NULL,
    "scheduleDate" DATETIME NOT NULL,
    "schedulingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Scheduling_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scheduling_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Scheduling" ("clientId", "id", "professionalId", "scheduleDate", "schedulingDate", "status") SELECT "clientId", "id", "professionalId", "scheduleDate", "schedulingDate", "status" FROM "Scheduling";
DROP TABLE "Scheduling";
ALTER TABLE "new_Scheduling" RENAME TO "Scheduling";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
