/*
  Warnings:

  - You are about to drop the `Scheduling_adm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `client` on the `Scheduling` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Scheduling` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Scheduling` table. All the data in the column will be lost.
  - You are about to drop the column `profissional` on the `Scheduling` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Scheduling` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleDate` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedulingDate` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Scheduling_adm_name_key";

-- DropIndex
DROP INDEX "User_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Scheduling_adm";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scheduling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professionalId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "scheduleDate" DATETIME NOT NULL,
    "schedulingDate" DATETIME NOT NULL,
    CONSTRAINT "Scheduling_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scheduling_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scheduling_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Scheduling" ("id") SELECT "id" FROM "Scheduling";
DROP TABLE "Scheduling";
ALTER TABLE "new_Scheduling" RENAME TO "Scheduling";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
