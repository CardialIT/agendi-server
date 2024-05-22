/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professionals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Scheduling` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTypeId` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Type";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "professionals";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "legalId" TEXT NOT NULL,
    "role" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Professional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    CONSTRAINT "Professional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_JobTypeToProfessional" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JobTypeToProfessional_A_fkey" FOREIGN KEY ("A") REFERENCES "JobType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JobTypeToProfessional_B_fkey" FOREIGN KEY ("B") REFERENCES "Professional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("id") SELECT "id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");
CREATE TABLE "new_Scheduling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professionalId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "jobTypeId" INTEGER NOT NULL,
    "scheduleDate" DATETIME NOT NULL,
    "schedulingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Scheduling_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scheduling_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scheduling_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "JobType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Scheduling" ("clientId", "id", "professionalId", "scheduleDate", "schedulingDate") SELECT "clientId", "id", "professionalId", "scheduleDate", "schedulingDate" FROM "Scheduling";
DROP TABLE "Scheduling";
ALTER TABLE "new_Scheduling" RENAME TO "Scheduling";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Professional_userId_key" ON "Professional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_JobTypeToProfessional_AB_unique" ON "_JobTypeToProfessional"("A", "B");

-- CreateIndex
CREATE INDEX "_JobTypeToProfessional_B_index" ON "_JobTypeToProfessional"("B");
